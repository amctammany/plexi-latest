var BodyType = require('../../src/core/modules/BodyType');
var PolygonConfig = require('../../src/bodytypes/Polygon');
var Polygon = BodyType.create('Polygon', PolygonConfig);

var polygon;

describe('Polygon', () => {
  beforeEach(function() {
    polygon = Polygon.create({
      points: [
        {x: 10, y: 10},
        {x: 20, y: 10},
        {x: 20, y: 20},
        {x: 10, y: 20},
      ]
    });
  });
  it('should be true', () => {
    expect(!!Polygon).toBe(true);
    expect(!!polygon).toBe(true);
  });
  it('should get axes', () => {
    let axes = polygon.getAxes();
    console.log(axes);
    expect(axes.length).toBe(4);
  });
  it('should get centroid', () => {
    let centroid = polygon.centroid();
    expect(centroid.x).toBe(15);
    expect(centroid.y).toBe(15);
  });
});

