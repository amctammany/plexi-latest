import Module from '../Module';
import Referential from '../../behaviors/Common/Referential';

var ActionStamp = {
  behaviors: [Referential],
  props: {
    actions: [],
  },
  methods: {
    execute: function (src, payload, data) {
      if (this.exec) {
        //console.log(payload)
        return this.exec(src, payload, data);
      } else if (this.actions) {
        return this.actions.map(a => {
          console.log(data);
          return Plexi.Game.dispatch(src, a, data);
          //let action = Action.find(a.type);
          //console.log(action);
        })
      } else {
        console.warn('Nothing to execute');
      }

    },

  },
};

class Action extends Module {
  constructor(config) {
    super(ActionStamp, config);
  }

  static createAll(actions) {
    //console.log(actions);
    let as = Object.keys(actions).map(k => {
      return this.create(k, actions[k]);
    });
    //console.log(as);
    //return ...as;
  }
}

module.exports = Action;
