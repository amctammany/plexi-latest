import Referential from '../../behaviors/Common/Referential';
import Tiled from '../../behaviors/Common/Tiled';
import Module from '../Module';
import {merge} from 'lodash';

var ComponentStamp = {
  behaviors: [Referential, Tiled],
  refs: {

  },
  props: {
    components: [],
    border: {
      size: 0,
      color: null,
    },
    state: {

    },
    style: {},
    classes: [],
  },
  init: function init() {
    //console.log(game);
    //this.game = game;
    //
    if (this.onclick) {
      this._onclick = this.onclick.bind(this);
    }
    if (this.onblur) {
      this._onblur = this.onblur.bind(this);
    }
    if (this.components.length === 0) {
      this._components = [];
    } else {
      this._components = this.components.map((c) => {
        //c.props.game = game;
        let res = Component.find(c.type).create(c.props);
        res.parent = this;
        return res;
      });
    }
    this.postUpdate = this.postUpdate || function (game, state) {
      if (this.text !== undefined) {
        let text = this.getRef(this.text);
        this.$el.innerHTML = (text !== undefined) ? text : 'foo';
      }
    }


  },
  methods: {
    applyStyle: function applyStyle(element) {
      let style = {
        left: this.x + 'px',
        top: this.y + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
      };

      merge(element.style, style);

    },
    getAction: function getAction() {
      return this.action;
    },
    addClass: function addClass(className) {
      if (this._classNames.indexOf(className) >= 0) {
        return;
      } else {
        this._classNames.push(className);
      }
    },
    removeClass: function removeClass(className) {
      let index = this._classNames.indexOf(className);
      if (index >= 0) {
        return this._classNames.splice(index, 1);
      } else {
        return;
      }
    },

    render: function render(parent, element) {
      //this.game = parent.game;
      this.parent = parent;
      let el = document.createElement(this._tag);
      //console.log(Plexi.Game);
      let type = this._type.replace('.', '-');
      if (this.style && Plexi.Game) {
        Plexi.Game.addCSSClass(type, null, this.style);
      }
      if (this.classes) {
        Object.keys(this.classes).forEach(c => {
          let klass = this.classes[c];
          Plexi.Game.addCSSClass(type, c, klass);
          //console.log(this)
        })
      }

      //console.log(this._classNames);
      //if (this._classNames) return;

      this._classNames = this._classNames || ['Component', type];
      if (this.className) {
        this._classNames.push(this.className);
      }
      //console.log(this._classNames)


      var pos;
      if (parent && parent.getPosition) {
        pos = parent.getPosition(this);
        merge(this, pos);
      } else {
         throw 'Component cannot determine position';
      }

      this.applyStyle(el);
      if (this.onclick) {
        el.onclick = this._onclick;
      }
      if (this.onblur) {
        el.onblur = this._onblur;
      }

      if (this._components) {
        this._components.forEach((comp, i) => {
          comp.i = i;
          comp.render(this, el);
        })
      }

      if (element) {
        element.appendChild(el);
      }
      this.$el = el;

      //if (this.$el) {
        //return this.update(game)
      //}
      //let el = document.createElement('div');
      //this.width = game.width;
      //this.height = game.height;
      //el.className = 'Stage';
      //if (this._component) {
        //this._component.render(this, el);
      //}

      //if (this.$el) {
        //element.replaceChild(el, this.$el);
      //} else {
        //element.appendChild(el);
      //}
      //this.$el = el;
      //this.update(game);
    },
    update: function update() {
      if (!this.$el) return;
      this.$el.classList = [];
      this._classNames.forEach(c => {
        //console.log(c);
        this.$el.classList.add(this.getRef(c));
      });

      if (this.preUpdate) {
        this.preUpdate();
      }
      if (this._components) {
        this._components.forEach(c => {
           c.update();
        })
      }
      if (this.postUpdate) {
        this.postUpdate();
      }
    },
  },
};

class Component extends Module {
  constructor(config) {
    var type = {};
    if (config._componentType) {
      type = Component.find(config._componentType);
    }
    super(ComponentStamp, config, type);
  }
}

module.exports = Component;
