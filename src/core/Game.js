import Stage from './modules/Stage';
import {isObject} from 'lodash';

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

class Game {
  constructor(el, config) {
    this.$el = document.getElementById(el) || document.createElement('div');
    this.width = config.width || 500;
    this.height = config.height || 500;

    this.$el.style.width = this.width;
    this.$el.style.height = this.height;

    this.Stage = null;
    this.state = config.state || {};
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
  refresh() {
    //console.log(this.Stage)
    if (!this.Stage) return;
    this.refreshStyleSheet();

    this.Stage.update(this, this.$el);
  }

  dispatch(src, event, data) {
    //console.log(src);
    //console.log(event);
    if (!event) return;
    //console.log(...data);
    let action = Action.find(event.type);
    if (!!action) {

    //console.log(event.payload);
      let a = action.create({});
    //console.log(a);
    //console.log(a);
    //console.log(event.payload);
      a.execute(src, event.payload, data);
      //this.refresh();
    } else {
      console.warn('invalid event: ' + event);
    }
    //console.log(action);
    //console.log(event);
    //console.log(src);
    //let s = src.getRef(event.payload);
    //console.log(s);
  }
}

module.exports = Game;
