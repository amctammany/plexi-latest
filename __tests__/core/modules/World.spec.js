var World = require('../../../src/core/modules/World');

var world, w;
describe('World', () => {
  beforeEach(function () {
    world = World.create('World', {
      props: {
        gravity: 1.0,
      },
    });
    w = world.create({game: {width: 500, height: 500}});
  });

  it('should be true', () => {
    expect(!!World).toBe(true);
    expect(!!world).toBe(true);
  });

  it('should have bodies', () => {
    expect(w.bodies.length).toBe(0);
  });
  it('should add body', () => {
    let body = w.addBody('Rectangle', {x: 10, y: 20});
    console.log(body);
    expect(w.bodies.length).toBe(1);
    expect(w.bodies[0]).toBe(body);
    expect(body._id).toBe(0);

    let body1 = w.addBody('Rectangle', {x: 20, y: 10});

    expect(w.bodies.length).toBe(2);
    expect(w.bodies[1]).toBe(body1);
    expect(body1._id).toBe(1);
  });
});
