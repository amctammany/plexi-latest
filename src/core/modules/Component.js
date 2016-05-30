import Referential from '../../behaviors/Common/Referential';
import Module from '../Module';

var ComponentStamp = {
  behaviors: [Referential],
  refs: {

  },
  props: {

  },
  methods: {
    render: function render(parent, element) {

    },

  },
};

class Component extends Module {
  constructor(config) {
    super(ComponentStamp, config);
  }
}

module.exports = Component;
