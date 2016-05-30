import Module from '../Module';
import Component from './Component';
import CommonTiled from '../../behaviors/Common/Tiled';

var StageStamp = {
  behaviors: [CommonTiled],
  props: {
    component: null,
  },
  init: function init({instance: {game}}) {
    //console.log(game);
    if (!Component.find(this.component)) return;
    this._component = Component.find(this.component).create({
      game,
      width: this.width || game.width || 100,
      height: this.height || game.height || 100,
    });
  },

  methods: {
    update: function update(game) {
      if (this._component) {
        //console.log(this._component)
        this._component.update(game);
      }
    },

    render: function render(game, element) {
      if (this.$el) {
        return this.update(game);
      }
      let el = document.createElement('div');
      this.width = game.width;
      this.height = game.height;
      //console.log(this.width)
      el.className = 'Stage';
      if (this._component) {
        this._component.render(this, el);
      }

      if (this.$el) {
        element.replaceChild(el, this.$el);
      } else {
        element.appendChild(el);
      }
      this.$el = el;
      this.update(game);
      return this;
    },
  },

};

class Stage extends Module {
  constructor(config) {
    super(StageStamp, config);
  }
}

module.exports = Stage;
