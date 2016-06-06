require('./index.html');

var App = require('./App');

Plexi.load(App);

Plexi.createGame('main-div', {
  width: 800,
  height: 600,
  state: {
    counter: 0,
  },
}).init({
  Stage: 'Main',
});
