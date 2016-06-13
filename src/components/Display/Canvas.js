var Canvas = {
  behaviors: [],
  refs: {
    _tag: 'canvas',
  },
  props: {
    style: {
      background: 'white',
    },
    actions: {},
  },
  init: function init() {
    Plexi.Game.registerCanvas(this._type, this);
    this.postUpdate = function (game) {
      this.$el.width = this.width;
      this.$el.height = this.height;
      this.ctx = this.ctx || this.$el.getContext('2d');
      this.ctx.fillStyle = 'black';

      //let x = game.getRef('mouse.x');
      //let y = game.getRef('mouse.y');
      //this.ctx.beginPath();
      //this.ctx.fillRect(x, y, 100, 100);
    }
    //console.log(this.$el.getContext('2d'));

  },

  //init: function init() {
    //console.log(this);
    //this.$el.width = this.width;
    //this.$el.height = this.height;
    //Plexi.Game.registerCanvas(this._type, this);
  //},
  methods: {
    onclick: function onclick(e) {
      //console.log(game);
      let action = this.getAction();
      //console.log(action);
      let game = Plexi.Game;
      let data = {
        position: {
          x: e.offsetX,//* (game.width / this.width),
          y: e.offsetY, // * (game.height / this.height),
        },
      };
      let x = e.offsetX;
      let y = e.offsetY;
      game.dispatch(this, action, data);

    }

  },
};

module.exports = Canvas;
