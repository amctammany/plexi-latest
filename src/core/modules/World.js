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
  },
};

class World extends Module {
  constructor(config) {
    super(WorldStamp, config);
  }
}

module.exports = World;
