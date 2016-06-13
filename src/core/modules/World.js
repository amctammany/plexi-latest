import Module from '../Module';
import BodyType from './BodyType';
let _uid = 0;

var WorldStamp = {
  behaviors: [],
  props: {
    bodies: [],

  },
  init: function init() {
    this.width = Plexi.Game.getRef('width');
    this.height = Plexi.Game.getRef('height');
  },
  methods: {
    addBody: function addBody(type, config) {
      let bt = BodyType.find(type);
      //console.log(bt);
      if (!bt) {
        console.log('No BodyType found: ' + type)
        let body = Object.assign({}, config, {
          _id: _uid++,
        });
        this.bodies.push(body);
        return body;
      } else {
        let body = bt.create(config);
        body._id = _uid++;
        this.bodies.push(body);
        return body;
      }
    },
    findBody: function findBody(position) {
      let x = position.x, y = position.y;
      let res = this.bodies.filter(b => {
        //console.log(b);
        return b.isPointInPath(this._ctx, x, y);
      })
      console.log(res);
      return res;
    },
    removeBody: function removeBody(body) {
      var index = this.bodies.indexOf(body);
      console.log(index)
      this.bodies.splice(index, 1);
    },
    render: function render(canvas) {
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, this.width, this.height);
      this._ctx = ctx;
      //console.log(this.bodies);
      this.bodies.forEach(b => {
        b.render(ctx);
        //ctx.beginPath();
        //ctx.rect(b.x, b.y, b.width, b.height);
        //ctx.closePath();
        //ctx.fill();
      });
      //let c = canvas.getContext('2d');
      //c.clearRect(0, 0, canvas.width, canvas.height);
      //c.drawImage(this.$canvas, 0, 0, canvas.width, canvas.height)

    },
  },
};

class World extends Module {
  constructor(config) {
    super(WorldStamp, config);
  }
}

module.exports = World;
