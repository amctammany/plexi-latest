var Behavior = require('../../../src/core/modules/Behavior');
var c, Circle;
//var config =
describe('Behavior', () => {
  beforeEach(function () {
    //Behavior.reset();
    Circle = Behavior.create('Circle', {
      props: {
        x: null,
        y: null,
        radius: null,
        fill: null,
      },
      methods: {
        add: function add() {
          return this.x + this.y;
        },
      },
    });

    c = Behavior.create('c', {
      behaviors: [Circle],
      props: {
        radius: 25,
        fill: 'blue',
      },
    });
  });
  it('should be true', () => {
    expect(!!Behavior).toBe(true);
  });
  it('should be a circle', () => {
    let x = 10, y = 20;
    let i = c.create({x, y});
    expect(!!c).toBe(true);
    expect(i.y).toBe(y);
    expect(i.radius).toBe(25);
    expect(i.fill).toBe('blue');
    expect(i.add()).toBe(30);
  });
  it('should add to methods', () => {
    let d = c.methods({subtract: function () {
      return this.x - this.y;
    }});
    let x = 10, y = 20;
    let i = c.create({x, y});
    let j = d.create({x, y});
    expect(c.subtract).toBe(undefined);
    expect(j.subtract()).toBe(-10);
  });
});
