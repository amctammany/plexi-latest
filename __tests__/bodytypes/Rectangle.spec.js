var BodyType = require('../../src/core/modules/BodyType');
var RectangleConfig = require('../../src/bodytypes/Rectangle');
var Rectangle = BodyType.create('Rectangle', RectangleConfig);
var rectangle, s;
describe('Rectangle', () => {
  beforeEach(function() {
    rectangle = Rectangle.create({position: {x: 10, y: 15}, width: 20, height: 40});
  });
  it('should be true', () => {
    expect(!!Rectangle).toBe(true);
  });
  it('should instantiate', () => {
    expect(rectangle.position.x).toBe(10);
    expect(rectangle.position.y).toBe(15);
    expect(rectangle.width).toBe(20);
    expect(rectangle.height).toBe(40);
  });
  it('should move body', () => {
    rectangle.move({x: 15, y: 25});
    let position = rectangle.centroid();
    expect(position.x).toBe(35);
    expect(position.y).toBe(60);
  });
});
