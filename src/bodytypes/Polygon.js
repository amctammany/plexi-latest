import Shape from './Shape';
import Vector from '../physics/Vector';

var Polygon = {
  behaviors: [Shape],

  refs: {

  },
  props: {
    points: [],

  },
  init: function init() {
    this.move(this.position);
  },
  methods: {
    move: function move(v) {
      this.points = this.points.map(p => {
        return {
          x: p.x + v.x,
          y: p.y + v.y,
        };
      });
    },
    addPoint: function addPoint(x, y) {
      this.points.push({x, y});
    },

    centroid: function centroid() {
      let pt = this.points.reduce((acc, pt, i) => {
        return {
          x: acc.x + pt.x,
          y: acc.y + pt.y,
        };
      });
      return {
        x: pt.x / this.points.length,
        y: pt.y / this.points.length,
      };
    },
    getAxes: function getAxes() {
      var v1, v2, surfaceVector, axes = [], pushAxis = true;
      for (var i = 0; i < this.points.length - 1; ++i) {
        v1 = new Vector(this.points[i].x, this.points[i].y);
        v2 = new Vector(this.points[i + 1].x, this.points[i + 1].y);

        surfaceVector = v2.subtract(v1);
        axes.push(surfaceVector.perpendicular().normalize());
      }
        v2 = new Vector(this.points[0].x, this.points[0].y);
        v1 = new Vector(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);

        surfaceVector = v2.subtract(v1);
        axes.push(surfaceVector.perpendicular().normalize());
      return axes;
    },
    project: function project(axis) {
      var scalars = [];

      this.points.forEach(p => {
        scalars.push((new Vector(p.x, p.y)).dot(axis));
      });
      return new Projection(Math.min.apply(Math, scalars), Math.max.apply(Math, scalars));
    },
    createPath: function createPath(ctx) {
      if (this.points.length === 0) return;

      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
      for (var i = 0; i < this.points.length; ++i) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }
    },

  },
};

module.exports = Polygon;
