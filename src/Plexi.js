import Module from './core/Module';
import Game from './core/Game';
//import Behavior from './core/modules/Behavior';
import Component from './core/modules/Component';
import Stage from './core/modules/Stage';

var Plexi = {
  Module,
  Game,
  //Behavior,
  Component,
  Stage,

  doSomething: function () {
    //console.log('something');
    return 'something';
  },
  load: function (config) {
    Object.keys(config).forEach(m => {
      Object.keys(config[m]).forEach(k => {
        //console.log(m);
        this[m].create(k, config[m][k]);
      });
    });
  },

  createGame: function (div, config) {
    let game = new Game(div, config);
    //console.log(game);
    this.Game = game;
    game.refresh();
    return game;
  },

};

module.exports = Plexi;
