var Stamp = require('../../../src/core/Stamp');
var Component = require('../../../src/core/modules/Component');
var CanvasConfig = require('../../../src/components/Display/Canvas');
var Canvas = Component.create('Display.Canvas', CanvasConfig);
var canvas;
describe('Display.Canvas', () => {
  beforeEach(function () {
    //console.log(Div);
    canvas = Canvas.create({});
  });
  it('should be true', () => {
    expect(!!Canvas).toBe(true);
    expect(!!canvas).toBe(true);
  });
  it('should have default tag', () => {
    expect(canvas._tag).toBe('canvas');
  });
});
