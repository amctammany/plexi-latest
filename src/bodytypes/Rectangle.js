import Shape from './Shape';
import Polygon from './Polygon';

var Rectangle = {
  behaviors: [Polygon, Shape],
  refs: {
  },
  props: {
    width: null,
    height: null,
  },
  init: function init() {
    var hw = this.width / 2;
    var hh = this.height / 2;
    var w = this.width,
        h = this.height,
        x = this.position.x,
        y = this.position.y;
    this.addPoint(x, y);
    this.addPoint(x + w, y);
    this.addPoint(x + w, y + h);
    this.addPoint(x, y + h);
  },

  methods: {
    //createPath: function createPath(ctx) {
      //ctx.beginPath();
      //ctx.rect(this.x, this.y, this.width, this.height);
      //ctx.closePath();
    //},
  },
};

module.exports = Rectangle;
