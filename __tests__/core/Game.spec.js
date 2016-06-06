jest.unmock('../../src/core/Module');
jest.unmock('../../src/core/Stamp');
jest.unmock('../../src/core/modules/Component')
jest.unmock('../../src/core/modules/Stage')
jest.unmock('../../src/core/modules/Action')

var Module = require('../../src/core/Module');
var Game = require('../../src/core/Game');

describe('Game', () => {
  beforeEach(function () {

  });
  it('should be true', () => {
    expect(!!Game).toBe(true);
  });
});
