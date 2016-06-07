import Action from './modules/Action';
import Stage from './modules/Stage';
import World from './modules/World';
import {isFunction, isObject, isString, get, set} from 'lodash';

function parseStyle(style, prefix = '') {
  let s = Object.keys(style).map(parent => {
    if (isObject(style[parent])) {
      return Object.keys(style[parent]).map(child => {
        if (child === 'style') {
          //console.log(parent);
          //console.log(child);
          //console.log(style[parent][child])
          return `.${parent} { ${parseStyle(style[parent][child])} }`;
        } else {
          return `.${parent}.${child} { ${parseStyle(style[parent][child])} }`;
        }
      }).join('\n');
    } else {
      return `${parent}: ${style[parent]};`;
    }

  }).join('\n');
  //console.log(s);
  return s;
}
var _style = {}, _styleDirty = true;

var _animFrame, _animFn;
class Game {
  constructor(el, config) {
    this.$el = document.getElementById(el) || document.createElement('div');
    this.width = config.width || 500;
    this.height = config.height || 500;

    this.$el.style.width = this.width;
    this.$el.style.height = this.height;

    this.Stage = null;
    this._canvas = {};
    this.state = config.state || {};
    _animFn = this.animate.bind(this);
    //this.changeStage(config.Stage);
  }
  addCSSClass(parentClass, childClass, rules) {
    //console.log(parentClass);
    _style[parentClass] = _style[parentClass] || {};
    if (childClass) {
      _style[parentClass][childClass] = rules;
    } else {
       _style[parentClass].style = rules;
    }
    _styleDirty = true;

  }
  reset() {

  }

  loadStage(stageName) {
    if (!stageName) return;
    let stage = Stage.find(stageName);
    //console.log(stage);
    var s;
    if (stage) {
      s = stage.create();
      //console.log(s);
      s.render(this, this.$el);
    }
    return s;
  }
  changeStage(stageName) {
    if (!stageName) return;
    this.paused = true;
    //if (this.Stage && this.Stage.onExit) this.Stage.onExit();
    if (this.Stage && this.Stage.$el) this.Stage.$el.hidden = true;
    this._stageName = stageName;
    this.Stage = this.loadStage(stageName);

    //this.Stage.$el.hidden = false;
    //if (this.Stage && this.Stage.onLoad) this.Stage.onLoad();
    this.paused = false;
    return this.Stage;
  }
  loadWorld(worldName) {
    let world = World.find(worldName);
    var w;
    if (world) {
       w = world.create()
    }
    return w;
  }
  changeWorld(worldName) {
    if (!worldName) return;
    this.paused = true;
    this._worldName = worldName;
    this.World = this.loadWorld(worldName);
    this.paused = false;
    return this.World;
  }
  refreshStyleSheet() {
    //if (!_styleDirty) return;
    let oldStyle = this.$el.getElementsByTagName('style')[0];
    //console.log(oldStyle);
    let stylesheet = document.createElement('style');
    stylesheet.type = "text/css";
    stylesheet.innerHTML = parseStyle(_style);
    if (oldStyle) {
      //console.log(this.$el)
      this.$el.replaceChild(stylesheet, oldStyle);
    } else {
      //console.log(this.$el)
      this.$el.appendChild(stylesheet);
    }
    _styleDirty = false;
  }
  init(config) {
    if (config.Stage) {
      this.changeStage(config.Stage);
    }
    if (config.World) {
      this.changeWorld(config.World);
    }
    this.refresh();
  }
  refresh() {
    console.log(this.Stage)
    if (!this.Stage) return;
    this.refreshStyleSheet();

    this.Stage.update(this, this.$el);
  }

  getRef(ref, src) {
    var result, module;
    if (isString(ref)) {
      if (ref.charAt(0) === '$') {
        let tail = ref.slice(1);
        let mod = tail.split('.')[0];
        module = Plexi[mod];
        result = get(Plexi, tail);
        //return get(Plexi, tail);
      } else if (ref.charAt(0) === '@') {

      } else {
        result = get(this.state, ref);
        if (result !== undefined) {
          return result;
        } else {
          result = get(this, ref);
        }
      }
    }
    if (isFunction(result)) {
       //console.log('is fn');
       //console.log(src);
       //console.log(result)
       //console.log(result());
       let r = result.bind(module);
       //console.log(r());
       //console.log(Plexi.BodyType.children())
       return r();
    }
    return result;
  }
  setRef(ref, value) {
    set(this.state, ref, value);
    //this.refresh();
  }
  reset() {
    console.log(this._canvas)
    if (!this._canvas) return;
    if (!!_animFrame) window.cancelAnimationFrame(_animFrame);
    _animFn();
  }

  animate(delta) {
    if (!window.requestAnimationFrame) return;
    if (this.state.paused) return window.setTimeout(_animFn, 100);
    this.advance(delta);
    _animFrame = window.requestAnimationFrame(_animFn);
  }
  advance(delta) {
    if (!this.World) return;
    //console.log(this.World);
    //this.World.integrate(delta);
    this.World.render(this.getCanvas('MainCanvas'));
    return;
  }
  registerCanvas(id, canvas) {
    this._canvas[id] = canvas;
  }
  getCanvas(id) {
    return this._canvas.hasOwnProperty(id) ? this._canvas[id].$el : null;
  }

  dispatch(src, event, data) {
    if (!event) return;
    let action = Action.find(event.type);
    if (!!action) {

      let a = action.create({});
      a.execute(src, event.payload, data);
    } else {
      console.warn('invalid event: ' + event);
    }
  }
}

module.exports = Game;
