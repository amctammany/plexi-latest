var BodyType = require('../../src/core/modules/BodyType');
var ShapeConfig = require('../../src/bodytypes/Shape');
var Shape = BodyType.create('Shape', ShapeConfig);
var shape, s;
describe('Shape', () => {
  beforeEach(function() {
    shape = Shape.create({x: 10, y: 15});
  });
  it('should be true', () => {
    expect(!!Shape).toBe(true);
  });
  it('should instantiate', () => {
    expect(shape.x).toBe(10);
    expect(shape.y).toBe(15);
  });
  it('should throw when move is undefined', () => {
    try {
      shape.move(15, 25);
    } catch (e) {
       expect(e).toBe('move(dx, dy) not implemented');
    }
    //expect(shape.x).toBe(25);
    //expect(shape.y).toBe(40);
  });
});
