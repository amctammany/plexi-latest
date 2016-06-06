require('./index.html');

var App = require('./App');

Plexi.load(App);

Plexi.createGame('main-div', {
  width: 800,
  height: 600,
}).init({
  Stage: 'Main',
});
