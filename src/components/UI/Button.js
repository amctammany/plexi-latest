var Button = {
  behaviors: [],
  refs: {
    _tag: 'button',
  },
  props: {
    style: {
      background: 'white',
    }
  },
  init: function () {
    //console.log('button init');
    //console.log(this);
  },
  methods: {
    onclick: function onclick(){
      let action = this.getRef('action');
      //console.log(this.action);
      Plexi.Game.dispatch(this, action);
      //console.log(this);
    },

  },
};

module.exports = Button;
