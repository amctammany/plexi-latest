import Shape from './Shape';

var Circle = {
  behaviors: [Shape],
  refs: {
  },
  props: {
    radius: 10,
  },

  methods: {
    createPath: function createPath(ctx) {
      //console.log(this.position);
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, 6.28, 0);
      ctx.closePath();
      //ctx.fill();
      //ctx.fillRect(this.position.x, this.position.y, 20, 20);
    },
    move: function move(dx, dy) {
      this.position.x += dx;
      this.position.y += dy;
    }
  },
};

module.exports = Circle;
