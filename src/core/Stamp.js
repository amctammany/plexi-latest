import supermixer from 'supermixer';
import {mixin, mixinFunctions, merge, mergeUnique} from 'supermixer';
import {forEach, isFunction, isObject} from 'lodash';

function extractFunctions(...args) {
  const result = [];
  if (isFunction(args[0])) {
    forEach(args, fn => { // assuming all the arguments are functions
      if (isFunction(fn)) {
        result.push(fn);
      }
    });
  } else if (isObject(args[0])) {
    forEach(args, obj => {
      forEach(obj, fn => {
        if (isFunction(fn)) {
          result.push(fn);
        } else {
          console.log(fn)
        }
      });
    });
  }
  return result;
}
function cloneAndExtend(fixed, extFn, ...args) {
  const stamp = new Stamp(fixed);
  extFn(stamp.fixed, ...args);
  return stamp;
}
function addProps(fixed, ...props) {
  return merge(fixed.props, ...props);
}
function addMethods(fixed, methods) {
  return mixinFunctions(fixed.methods, methods);
  //console.log(fixed.methods);
  //console.log(methods);
  //if (!isObject(methods)) return;
  //Object.keys(methods).forEach(k => {
    //fixed.methods[k] = fixed.methods[k] ? fixed.methods[k] : methods[k];
  //});
}
function addInit(fixed, ...inits) {
  const extractedInits = extractFunctions(...inits);
  extractedInits.forEach(i => {
    if (fixed.init.indexOf(i) < 0) {
      fixed.init.push(i);
    }
  });
  return fixed.init;
}
function addRefs(fixed, ...refs) {
  fixed.refs = mixin(fixed.refs, ...refs);
  return fixed.refs;
}
function compose(...factories) {
  //console.log(factories)
  const result = new Stamp();
  forEach(factories.reverse(), source => {
    if (source && source.fixed) {
      //console.log(source);
      addMethods(result.fixed, source.fixed.methods);
      addInit(result.fixed, source.fixed.init);
      addProps(result.fixed, source.fixed.props);
      addRefs(result.fixed, source.fixed.refs);
    } else {
      throw new Error('Uncomposable Factory');
    }
  })
  //console.log(result)
  return result;
}
function isStamp(obj) {
  console.log(obj);
  return (
    //isFunction(obj) &&
    isFunction(obj.methods) &&
    // isStamp can be called for old stampit factory object.
    // We should check old names (state and enclose) too.
    isFunction(obj.refs) &&
    isFunction(obj.init) &&
    isFunction(obj.props) &&
    isObject(obj.fixed)
  );
}

class Stamp {
  constructor(config) {
    const fixed = {props: {}, methods: {}, refs: {}, init: []};
    if (config) {
      addMethods(fixed, config.methods);
      addInit(fixed, config.init);
      addProps(fixed, config.props);
      addRefs(fixed, config.refs);

    }

    const factory = function Factory(refs, ...args) {
      let instance = mixin(Object.create(fixed.methods), fixed.refs, refs);
      mergeUnique(instance, fixed.props);
      if (fixed.init.length > 0) {
        forEach(fixed.init, (fn) => {
          fn.call(instance, {args, instance, stamp: Factory});
        });
      }
      return instance;
    }

    return mixin(this, factory, {
      create: factory,
      fixed,
      methods: cloneAndExtend.bind(null, fixed, addMethods),
      props: cloneAndExtend.bind(null, fixed, addProps),
      refs: cloneAndExtend.bind(null, fixed, addRefs),
      init: cloneAndExtend.bind(null, fixed, addInit),

      compose: (...factories) => compose(this, ...factories)

    });

  }
}

module.exports = Stamp;

module.exports.isStamp = isStamp;


