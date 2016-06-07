import Module from '../Module';
//import Referential from '../../behaviors/Common/Referential';

import {isObject} from 'lodash';

var BodyTypeStamp = {
  //behaviors: [Referential],
  props: {
    //id: null,
    position: {
      x: null,
      y: null,
    },
  },
  init: function init() {

  },
  methods: {
    render: function render(ctx) {
      //console.log(this);
      //console.log(ctx);
      this.fill(ctx);
      this.stroke(ctx);
    },

  },
};

class BodyType extends Module {
  constructor(config) {
    super(BodyTypeStamp, config);
  }
}

module.exports = BodyType;
