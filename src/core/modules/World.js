import Module from '../Module';
import BodyType from './BodyType';
let _uid = 0;

var WorldStamp = {
  behaviors: [],
  props: {
    bodies: [],

  },
  init: function init() {

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
    render: function render(canvas) {
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, this.width, this.height);
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
