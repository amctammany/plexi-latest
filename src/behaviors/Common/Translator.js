import {isObject, get} from 'lodash';
import {mergeUnique} from 'supermixer';

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
      let r = mergeUnique(result, o);
      //console.log(r)
      return r;
    },
  },
};

module.exports = Translator;
