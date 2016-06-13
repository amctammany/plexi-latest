import {isObject, isString} from 'lodash';
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
    var b, bt;
    try {
      b = Plexi.Behavior.find(bhvr);
    } catch (e) {
      console.log(e);
    }
    try {
      bt = Plexi.BodyType.find(bhvr);
    } catch (e) {
      console.log(e);
    }

    //let b = Plexi.Behavior.find(bhvr);
    //let bt = Plexi.BodyType.find(bhvr);
    //console.log(bhvr);
    if (b) {
      //console.log(b);
      return b;
    } else if (bt) {
      //console.log(bhvr);
      //console.log(bt);
      return bt;
    } else {
      throw 'come back later';
    }
  } else {
    throw 'fail?'

  }

}

class Module {
  constructor(stamp, ...templates) {
    //if (templates.length)
      //console.log(templates);
    if (stamp.hasOwnProperty('behaviors')) {
      console.log(stamp.behaviors)
      templates.push(...stamp.behaviors);
    }
    //console.log(templates);
    let temps = templates.map(t => {
      if (isObject(t)) {
        if (t.fixed) return t;
        let behaviors = (t.behaviors || []).map(findBehavior);
        //console.log(t);
        return new Stamp(t).compose(...behaviors);
      } else {
        console.log('foo?')
        return;
      }
    }).filter(t => {
      return true;
      //return !!t;
    });
    let s = (new Stamp(stamp)).compose(...temps);
    return s;
  }


  static create(id, config, ...stamps) {
    if (stamps.length) console.log(stamps);
    this._children = this._children || {};
    let m = new this(config, ...stamps);
    m.fixed.refs._type = id;
    this._children[id] = m;
    return m;
  }
  static find(id) {
    if (!this._children) return;
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
    //console.log(this._children)
    return this._children ? Object.keys(this._children).length : 0;
  }
  static children() {
    //console.log(this);
    return Object.keys(this._children).map(c => this._children[c]);
  }

}

module.exports = Module;
