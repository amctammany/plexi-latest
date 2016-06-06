import {isString, isObject, isNumber, isArray, get, set} from 'lodash';

function isRef(ref) {
  return isString(ref) && (ref.charAt(0) === '@' || ref.charAt(0) === '$');
}

var Referential = {
  props: {

  },
  //init: function init({instance: {game}}) {
    //if (game) this.game = game;
  //},
  methods: {
    getRef: function getRef(ref, data) {
      //if (!ref) return;
      //console.log(ref);
      //console.log(this.game);
      //console.log(data)
      if (isNumber(ref)) return ref;
      if (isString(ref)) {
        let head = ref.charAt(0);
        let tail = ref.slice(1);
        if (head === '#') {
          if (get(data, tail)) {
            //console.log(get(data, tail))
            return get(data, tail);
          } else {
            return data;
          }

        } else if (head === '@') {
          if (tail.length === 0) {
            return Object.keys(data).length ? data : this;
          }

          let c = this;
          while (c) {
            let v = get(c.state, tail);
            if (v !== undefined) {
              if (isRef(v)) {
                return this.getRef(v);
              } else {
                return v;
              }
            } else if (c.hasOwnProperty(tail)) {
              return c[tail];
            }
            c = c.parent;
          }
        } else if (head === '$') {
          var l = Plexi.Game.getRef(tail);
          return l;
        } else {
          let c = this;
          while (c) {
            let res = get(c, ref);
            if (res) {
              return res;
            }
            c = c.parent;
          }
          return ref;
        }
      } else if (isArray(ref)) {
        return ref.map(r => {
          return this.getRef(r, data);
        });
      } else if (isObject(ref)) {
        let res = {};
        Object.keys(ref).forEach(k => {
          res[k] = this.getRef(ref[k], data);
        });
        return res;
      } else {
        throw new Error('Invalid reference: ' + ref);
      }
      return ref;
    },
    setRef: function setRef(ref, value) {
      //if (!ref) return;
      if (isString(ref)) {
        let head = ref.charAt(0);
        let tail = ref.slice(1);
        if (head === '@') {
          let c = this;
          while (c) {
            let v = get(c.state, tail);
            if (v !== undefined) {
              if (isRef(v)) {
                return this.setRef(v, value);
              } else {
                return set(c.state, tail, value)
              }
              return value;
            }
            c = c.parent;
          }
          set(this.state, tail, value);
        } else if (head === '$') {
          Plexi.Game.setRef(tail, value);
          return;
        } else {
          set(this.state, ref, value);
          return;
        }

      } else {
        throw new Error('Invalid reference');
      }
    },

  }
}

module.exports = Referential;
