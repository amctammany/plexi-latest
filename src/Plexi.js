import Module from './core/Module';
import Game from './core/Game';
//import Behavior from './core/modules/Behavior';
import Component from './core/modules/Component';
import Stage from './core/modules/Stage';

import Components from './components/';

var _componentsLoaded = false;
var Plexi = {
  Module,
  //Game: null,
  //Behavior,
  Component,
  Stage,

  doSomething: function () {
    //console.log('something');
    return 'something';
  },

  //loadBodyTypes: function loadBodyTypes(bodytypes) {
    //if (!_bodytypesLoaded) {
      //bodytypes.map(b => {
        //return BodyType.create(b, BodyTypes[b])
      //});
    //}
    //_bodytypesLoaded = true;
  //},
  //loadBehaviors: function loadBehaviors(behaviors) {
    //if (!_behaviorsLoaded) {
      //behaviors.forEach(b => {
        //let [group, key] = b.split('.');
        //Behavior.create(b, Behaviors[group][key]);
      //});
      //_behaviorsLoaded = true;
    //}
  //},
  loadComponents: function loadComponents(components) {
    if (!_componentsLoaded) {
      components.map(c => {
        let [group, key] = c.split('.');
        return Component.create(c, Components[group][key]);
      });
      _componentsLoaded = true;
    }

  },

  load: function (config) {
    Object.keys(config).forEach(m => {
      if (m === 'requires') {
        console.log(config[m]);
        this.loadComponents(config[m].components);

      } else if (this.hasOwnProperty(m)){
        Object.keys(config[m]).forEach(k => {
          //console.log(m);
          this[m].create(k, config[m][k]);
        });
      } else {
        throw 'Invalid Module Type';
      }
    });
  },

  createGame: function (div, config) {
    this.Game = new Game(div, config);
    //console.log(game);
    //this.Game = game;
    this.Game.refresh();
    return this.Game;
  },

};

module.exports = Plexi;
