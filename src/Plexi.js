import Module from './core/Module';
import Game from './core/Game';
import Action from './core/modules/Action';
import Component from './core/modules/Component';
import Stage from './core/modules/Stage';
import BodyType from './core/modules/BodyType';
import Behavior from './core/modules/Behavior';
import World from './core/modules/World';

import Actions from './actions/';
import BodyTypes from './bodytypes/';
import Components from './components/';

var _componentsLoaded = false,
    _actionsLoaded = false,
    _behaviorsLoaded = false,
    _bodytypesLoaded = false;
var Plexi = {
  Module,
  Action,
  Behavior,
  BodyType,
  //Game: null,
  //Behavior,
  Component,
  World,

  Stage,

  doSomething: function () {
    //console.log('something');
    return 'something';
  },

  loadActions: function loadActions(actions = []) {
    if (actions.length < 1) return;
    if (!_actionsLoaded) {
      actions.forEach(a => {
        let [group, key] = a.split('.');
        if (key) {
          return Action.create(a, Actions[group][key]);
        } else {
          //console.log(group)
          return Action.createAll(Actions[group]);
        }
      })
    }
  },

  loadBodyTypes: function loadBodyTypes(bodytypes = []) {
    if (!_bodytypesLoaded) {
      bodytypes.map(b => {
        return BodyType.create(b, BodyTypes[b])
      });
    }
    _bodytypesLoaded = true;
  },
  loadBehaviors: function loadBehaviors(behaviors = []) {
    if (!_behaviorsLoaded) {
      behaviors.forEach(b => {
        let [group, key] = b.split('.');
        Behavior.create(b, Behaviors[group][key]);
      });
      _behaviorsLoaded = true;
    }
  },
  loadComponents: function loadComponents(components = []) {
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
        //console.log(config[m]);
        this.loadComponents(config[m].components);
        this.loadBehaviors(config[m].behaviors);
        this.loadBodyTypes(config[m].bodytypes)
        this.loadActions(config[m].actions);

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
    this.Game.reset();
    return this.Game;
  },

};

module.exports = Plexi;
