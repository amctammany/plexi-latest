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
      if (!ref) return;
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

          ////console.log(data)
          ////console.log(tail);
          //while (c) {
            //let v = get(c.state, tail);
            ////console.log(tail)
            //console.log(v);
            //if (!!v) {
              //if (isRef(v)) {
                ////console.log(c.getRef(v, data));
                //return c.getRef(v, data);
              //} else if (c.hasOwnProperty(v)) {
                ////console.log(c.getRef(v, data));
                //return c[v];
              //} else {
                ////console.log(tail);
                ////console.log(v);
                //return v;
              //}
            //} else {
              //if (c.hasOwnProperty(v)) {
                //return c[v];
              //}
            //}
            //c = c.parent;
          //}
        } else if (head === '$') {
          var l = this.game.getRef(tail);
          //console.log(l);
          return l;
          //return get(this.game.state, tail);
          //
        } else {
          //console.log(this);
          //console.log(ref)
          let c = this;
          while (c) {
            let res = get(c, ref);
            //console.log(res);
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
         //console.log('get ref object');
      } else {
        //console.log('Reference fail');
        //console.log(ref);
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
          //let s = get(c, tail);
          //if (s !== undefined) {
            //console.log(s);
            //return this.setRef(s, value);
          //}
          while (c) {
          //console.log(c.state);
            let v = get(c.state, tail);
            if (v !== undefined) {
              if (isRef(v)) {
                //console.log(v);
                return this.setRef(v, value);
              } else {
                return set(c.state, tail, value)

                //set(this.state, tail, value);
                //console.log('set?')
              }
              //if (this.game) c.update(this.game);
              //console.log('setting value: ' + value);
              return value;
            }
            c = c.parent;
          }
          set(this.state, tail, value);
        } else if (head === '$') {
          this.game.setRef(tail, value);
          //set(Plexi.Game.state, tail, value);
          //this.game.refresh();
          //Plexi.Game.refresh();
          return;
        } else {
          set(this.state, ref, value);
          return;
        }

      } else {
        throw new Error('Invalid reference');
      }
      //console.log('fail at ref: ' + ref)
      //return ref;
    },

  }
}

module.exports = Referential;
