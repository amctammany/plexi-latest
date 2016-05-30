import Module from './core/Module';
//import Behavior from './core/modules/Behavior';
import Component from './core/modules/Component';

var Plexi = {
  Module,
  //Behavior,
  Component,

  doSomething: function () {
    //console.log('something');
    return 'something';
  },
  load: function (config) {
    Object.keys(config).forEach(m => {
      Object.keys(config[m]).forEach(k => {
        console.log(m);
        this[m].create(k, config[m][k]);
      });
    });

  },

};

module.exports = Plexi;
