import {isObject, isNumber, isString} from 'lodash';
import BodyType from '../core/modules/BodyType';

var StateFunctions = {
  add: function (...args) {
    return args.map(parseFloat).reduce((acc, a) => {
      return acc + a;
    });
  },
  subtract: function (...args) {
    return args.map(parseFloat).reduce((acc, a) => {
      return acc - a;
    });
  },
  multiply: function (...args) {
    return args.map(parseFloat).reduce((acc, a) => {
      return acc * a;
    });
  },
  append: function (src, ...args) {
    console.log(src);
    src = src.concat(...args);
    return src;
  },
  //addVariable: function (...args) {
    //let nums = args.map(a => {
      //return (isNumber(a)) ? a : this.getRef(a);
    //})
    //return StateFunctions.add(...nums); //console.log(nums);
  //},
  //subtractVariable: function (...args) {
    //let nums = args.map(a => {
      //return (isNumber(a)) ? a : this.getRef(a);
    //})
    //return StateFunctions.subtract(...nums); //console.log(nums);
  //}
};

var SOURCE_METHOD = {
  props: {
    payload: {
      fn: null,
      args: [],
    },
  },
  methods: {
    exec: function exec(src, payload, data) {
      let source = src;
      let args = src.getRef(payload.args, data);
      console.log(source);
      while (source) {
        let fn = source[payload.fn];
        if (fn) {
          return fn.apply(source, args);
        }
        source = source.parent;
      }
      let res = src.getRef(payload.fn);
      console.log(src);
    },
  },
};
var CHANGE_BODY = {
  props: {
    payload: {
      id: null,
      changes: {

      },
    },
  },
  refs: {

  },
  methods: {
    exec: function exec(src, payload, data) {
      let id = src.getRef(payload.id);
      let changes = src.getRef(payload.changes);
      let body = this.Game.World.findBody(id);
      Object.assign(body, changes);
      console.log(arguments);
    },
  },
};
var LOAD_LEVEL = {
  props: {
    id: null,
  },
  refs: {

  },
  methods: {
    exec: function exec(src, payload) {
      let levelId = src.getRef(payload.id);
      console.log(levelId);
      let level = Plexi.Level.find(levelId);
      let l = level.create();
      this.Game.World.reset();
      this.Game.World.load(l.bodies);

    },
  },
};
var CREATE_BODY = {
  props: {

  },
  refs: {

  },
  methods: {
    exec: function exec(src, payload, data) {
      let load = src.getRef(payload, data);
      //console.log(load);
      //let bt = BodyType.find(load.bodytype);
      //let body = bt.create(load.config);
      //console.log(body);
      Plexi.Game.World.addBody(load.bodytype, load.config);

      //console.log(payload);

    },
  },
};
var CHANGE_STATE = {
  props: {

  },
  refs: {
  },
  methods: {
    exec: function exec(src, payload, data) {
      //console.log(src)
      var ref = payload.ref;
      //let ref = src.getRef(payload.ref);
      let value = src.getRef(payload.value, data);
      if (payload.fn) {
        //console.log(src);
        let fn = src.getRef(payload.fn);
        let v = StateFunctions[fn].call(src, src.getRef(ref), value);
        src.setRef(ref, v);
      } else {
        //console.log(ref);
        //console.log(value);
        src.setRef(ref, value);
      }
      //if (src.update) src.update(Plexi.Game);
      if (Plexi.Game) Plexi.Game.refresh();

    },
  },
};

var LOG_OBJECT = {
  refs: {

  },
  props: {

  },
  methods: {
    exec: function exec(src, payload, data = {}) {
      console.log(src);
      //console.log(payload);
      console.log(data);
      let r = src.getRef(payload.value, data);
      console.log(r);

    },
  },
};

var Base = {
  CHANGE_BODY,
  LOAD_LEVEL,
  CHANGE_STATE,
  SOURCE_METHOD,
  LOG_OBJECT,
  CREATE_BODY,

};

module.exports = Base;
