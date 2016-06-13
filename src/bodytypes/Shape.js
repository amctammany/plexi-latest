var Shape = {
  props: {
    position: {
      x: null,
      y: null,
    },
    fillStyle: 'black',
    strokeStyle: 'blue',
  },
  methods: {
    getAxes: function getAxes() {
      throw 'getAxes() not implemented';
    },
    move: function move(dx, dy) {
      throw 'move(dx, dy) not implemented';
    },
    createPath: function createPath(ctx) {
      throw 'createPath(ctx) not implemented';
    },
    project: function project(axis) {
      throw 'project(axis) not implemented';
    },

    move: function move(dx, dy) {
      throw 'move(dx, dy) not implemented';
      //this.x += dx;
      //this.y += dy;
    },

    isPointInPath: function isPointInPath(ctx, x, y) {
      this.createPath(ctx);
      return ctx.isPointInPath(x, y);
    },
    fill: function fill(ctx) {
      ctx.save();
      ctx.fillStyle = this.fillStyle;
      this.createPath(ctx);
      ctx.fill();
      ctx.restore();
    },
    stroke: function stroke(ctx) {
      ctx.save();
      ctx.strokeStyle = this.strokeStyle;
      this.createPath(ctx);
      ctx.stroke();
      ctx.restore();
    },

  },
};

module.exports = Shape;
