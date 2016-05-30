import {isObject} from 'lodash';
import Stamp from './Stamp';
function findBehavior(bhvr) {
  //console.log('plexi: ' + Plexi);
  //console.log(bhvr);
  //Behavior = require('./modules/Behavior.js');
  if (isObject(bhvr)) {
    if (bhvr.fixed) {
      return bhvr;
    } else {
      return new Stamp(bhvr);
    }
    return bhvr;
  } else if (typeof(bhvr) === 'string') {
    let b = Plexi.Behavior.find(bhvr);
    let bt = Plexi.BodyType.find(bhvr);
    console.log(bhvr);
    if (b) {
      console.log(b);
      return b;
    //} else if (bt) {
      //console.log(bhvr);
      //console.log(bt);
      //return bt;
    } else {
      throw 'come back later';
    }
  } else {
    throw 'fail?'

  }

}

class Module {
  constructor(stamp, ...templates) {
    //console.log(templates);
    if (stamp.hasOwnProperty('behaviors')) {
      console.log(stamp.behaviors)
      templates.push(...stamp.behaviors);
    }
    //console.log(templates);
    let temps = templates.map(t => {
      console.log(t)
      if (t.fixed) {
        return t;
      } else if (isObject(t)) {
        let behaviors = (t.behaviors || []).map(findBehavior);
        return new Stamp(t).compose(...behaviors);
      } else {
        //console.log(t);
        return t;
      }

    });
    let s = (new Stamp(stamp)).compose(...temps);
    return s;
  }


  static create(id, config) {
    this._children = this._children || {};
    let m = new this(config);
    m.fixed.refs._type = id;
    this._children[id] = m;
    return m;
  }
  static find(id) {
    //if (!this._children) return;
    //if (!this._children.hasOwnProperty(id)) return;
    //let result = this._children[id];
    if (this._children.hasOwnProperty(id)) {
      return this._children[id];
    } else {
      //console.log(id);
      throw new Error('Invalid find: ' + id);
      //return;
    }
  }
  static reset() {
    this._children = {};
  }
  static size() {
    return this._children ? Object.keys(this._children).length : 0;
  }
  static children() {
    //console.log(this);
    return Object.keys(this._children).map(c => this._children[c]);
  }

}

module.exports = Module;
