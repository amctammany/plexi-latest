var TypedActions = {
  refs: {

  },
  props: {
    actions: {},
    _actionType: null,

  },
  init: function init() {
    this.getAction = function getAction() {
      let actionType = this.getRef(this._actionType);
      return this.actions.hasOwnProperty(actionType) ? this.actions[actionType] : this.action;
    }
  },
  methods: {
    //getAction: function getAction() {
      //console.log(this)
      //let actionType = this.getRef(this._actionType);
      //console.log(actionType);
    //},
  },

};

module.exports = TypedActions;
