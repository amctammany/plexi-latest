require('./index.html');

var App = require('./App');

Plexi.load(App);
Plexi.Component.create('UIDiv', {
  refs: {
    _tag: 'div',
    style: {
      background: 'blue',
    },
  },
});
Plexi.createGame('main-div', {
  Stage: 'Main',
  width: 800,
  height: 600,
});
