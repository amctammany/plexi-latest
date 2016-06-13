import {isStamp} from '../../core/Stamp';
import {isObject, get} from 'lodash';
import supermixer from 'supermixer';

var mergeData = supermixer({
  filter: function (src) {
    //console.log(src);
    //console.log(isStamp(src));
    return typeof src !== 'function' && isStamp(src) === false; },


});

var Translator = {
  behaviors: [],
  refs: {

  },
  props: {
    dictionary: null,
  },
  init: function init() {

  },
  methods: {
    translate: function translate(o, dict) {
      //console.log(this);
      dict = dict || this.dictionary;
      //console.log(dict);
      //console.log(o);
      if (!dict) return o;
      let result = {};
      //console.log(o);
      Object.keys(dict).forEach(k => {
        if (isObject(dict[k])) {
          result[k] = this.translate.call(this, o, dict[k]);
        } else {
          let r = this.getRef.call(o, dict[k]);
          result[k] = r;
        }
      });
      //console.log(o);
      //return result;
      let r = mergeData(result, o);
      //console.log(r)
      return r;
    },
  },
};

module.exports = Translator;
