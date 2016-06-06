jest.disableAutomock();
jest.unmock('./src/Plexi');
jest.unmock('./src/core/Game');
jest.unmock('./src/core/Module');
jest.unmock('./src/core/Stamp');
jest.unmock('./src/core/modules/Action');
//jest.unmock('./src/actions/Base');

Plexi = require('./src/Plexi');
//Plexi.loadActions(['Base']);
Plexi.createGame(null, {
  width: 500,
  height: 500,
});
