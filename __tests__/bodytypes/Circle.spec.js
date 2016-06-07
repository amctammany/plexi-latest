var BodyType = require('../../src/core/modules/BodyType');
var CircleConfig = require('../../src/bodytypes/Circle');
var Circle = BodyType.create('Circle', CircleConfig);
var circle, s;
describe('Circle', () => {
  beforeEach(function() {
    circle = Circle.create({position: {x: 10, y: 15}, radius: 20});
  });
  it('should be true', () => {
    expect(!!Circle).toBe(true);
  });
  it('should instantiate', () => {
    expect(circle.position.x).toBe(10);
    expect(circle.position.y).toBe(15);
    expect(circle.radius).toBe(20);
  });
  it('should move body', () => {
    circle.move(15, 25);
    expect(circle.position.x).toBe(25);
    expect(circle.position.y).toBe(40);
  });
});
