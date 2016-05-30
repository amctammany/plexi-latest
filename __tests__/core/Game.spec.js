jest.unmock('../../src/core/Module');
jest.unmock('../../src/core/Stamp');
jest.unmock('../../src/core/modules/Component')
jest.unmock('../../src/core/modules/Stage')

var Module = require('../../src/core/Module');
var Stage = require('../../src/core/modules/Stage');

describe('Stage', () => {
  beforeEach(function () {

  });
  it('should be true', () => {
    expect(!!Stage).toBe(true);
  });
});
