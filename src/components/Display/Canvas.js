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
  methods: {
    onclick: function onclick(e) {
      //console.log(game);
      let game = Plexi.Game;
      let data = {
        position: {
          x: e.offsetX * (game.width / this.width),
          y: e.offsetY * (game.height / this.height),
        },
      };
      let x = e.offsetX;
      let y = e.offsetY;
      console.log(this.action)
      game.dispatch(this, this.action, data);

    }

  },
};

module.exports = Canvas;
