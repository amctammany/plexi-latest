jest.unmock('../../../src/core/modules/Component');
jest.unmock('../../../src/components/UI/Div');

var Stamp = require('../../../src/core/Stamp');
var Component = require('../../../src/core/modules/Component');
var DivConfig = require('../../../src/components/UI/Div');
var Div = Component.create('UI.Div', DivConfig);
var div;
describe('UI.Div', () => {
  beforeEach(function () {
    //console.log(Div);
    div = Div.create({});
  });
  it('should be true', () => {
    expect(!!Div).toBe(true);
    expect(!!div).toBe(true);
  });
  it('should have default tag', () => {
    expect(div._tag).toBe('div');
  });
  it('should have default background', () => {
     expect(div.style.background).toBe('blue');
  });
});
