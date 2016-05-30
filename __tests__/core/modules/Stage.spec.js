jest.unmock('../../../src/core/modules/Component')
jest.unmock('../../../src/core/modules/Stage')

var Component = require('../../../src/core/modules/Component');
var Stage = require('../../../src/core/modules/Stage');


var stage, s;

describe('Stage', () => {
  beforeEach(function () {

  });
  it('should be true', () => {
    expect(!!Stage).toBe(true);
  });
});
