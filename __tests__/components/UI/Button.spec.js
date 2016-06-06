jest.unmock('../../../src/core/modules/Component');
jest.unmock('../../../src/components/UI/Button');

var Component = require('../../../src/core/modules/Component');
var ButtonConfig = require('../../../src/components/UI/Button');
var Button = Component.create('UI.Button', ButtonConfig);
var button;
describe('UI.Button', () => {
  beforeEach(function () {
    //console.log(Div);
    button = Button.create({});
  });
  it('should be true', () => {
    expect(!!Button).toBe(true);
    expect(!!button).toBe(true);
  });
  it('should have default tag', () => {
    expect(button._tag).toBe('button');
  });
  it('should have default background', () => {
     expect(button.style.background).toBe('white');
  });
});
