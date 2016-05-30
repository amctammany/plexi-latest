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
  init: function init({instance: {game}}) {
    if (this.onclick) {
      this._onclick = this.onclick.bind(this, game);
    }
    if (this.onblur) {
      this._onblur = this.onblur.bind(this, game);
    }
    if (this.components.length === 0) {
      this._components = [];
    } else {
      this._components = this.components.map((c) => {
        c.props.game = game;
        let res = Component.find(c.type).create(c.props);
        res.parent = this;
        return res;
      });
    }
    this.postUpdate = this.postUpdate || function (game, state) {
      if (this.text !== undefined) {
        //console.log(this.text);
        this.$el.innerHTML = this.getRef(this.text) || 'foo';
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
    render: function render(parent, element) {
      this.parent = parent;
      let el = document.createElement(this._tag);
      let type = this._type.replace('.', '-');
      this._classNames = ['Component', type];
      if (this.className) {
        this._classNames.push(this.className);
      }

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
    update: function update(game) {
      if (this._component) {
        this._component.update(game);
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
