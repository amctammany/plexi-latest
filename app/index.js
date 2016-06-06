require('./index.html');

var App = require('./App');

Plexi.Component.create('UI.Div', {
  refs: {
    _tag: 'div',
    style: {
      background: 'blue',
    },
  },
});
Plexi.load(App);
Plexi.createGame('main-div', {
  width: 800,
  height: 600,
}).init({
  Stage: 'Main',
});
