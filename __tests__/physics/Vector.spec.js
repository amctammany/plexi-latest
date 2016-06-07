var Vector = require('../../src/physics/Vector');
var v1, v2;

describe('Vector', () => {
  beforeEach(function () {
    v1 = new Vector(1, 2);
    v2 = new Vector(3, 4);
  });

  it('should be true', () => {
    expect(!!Vector).toBe(true);
  });

  it('should non-destructively add vectors', () => {
    let result = v1.add(v2);
    expect(result.x).toBe(4);
    expect(result.y).toBe(6);
    expect(v1.x).toBe(1);
    expect(v1.y).toBe(2);
  });
  it('should add vector to self', () => {
    let result = v1.iadd(v2);
    expect(result.x).toBe(4);
    expect(result.y).toBe(6);
    expect(v1.x).toBe(4);
    expect(v1.y).toBe(6);
  });
  it('should non-destructively subtract vectors', () => {
    let result = v1.subtract(v2);
    expect(result.x).toBe(-2);
    expect(result.y).toBe(-2);
    expect(v1.x).toBe(1);
    expect(v1.y).toBe(2);
  });
  it('should subtract vector from self', () => {
    let result = v1.isubtract(v2);
    expect(result.x).toBe(-2);
    expect(result.y).toBe(-2);
    expect(v1.x).toBe(-2);
    expect(v1.y).toBe(-2);
  });
  it('should non-destructively multiply vector by scalar', () => {
    let result = v1.multiply(5);
    expect(result.x).toBe(5);
    expect(result.y).toBe(10);
    expect(v1.x).toBe(1);
    expect(v1.y).toBe(2);
  });
  it('should multiply scalar with self', () => {
    let result = v1.imultiply(5);
    expect(result.x).toBe(5);
    expect(result.y).toBe(10);
    expect(v1.x).toBe(5);
    expect(v1.y).toBe(10);
  });

  it('should get dot product of two vectors', () => {
    let result = v1.dot(v2);
    expect(result).toBe(11);
  });

  it('should get magnitude of vector', () => {
    let result = v2.getMagnitude();
    expect(result).toBe(5);
  });
  it('should set magnitude of vector', () => {
    let result = v2.setMagnitude(10);
    expect(result.x).toBe(6);
    expect(result.y).toBe(8);
  });
  it('should normalize vector', () => {
    let result = v2.normalize();
    expect(result.x).toBe(3/5);
    expect(result.y).toBe(4/5);
  });

  it('should return perpendicular vector', () => {
    let result = v1.perpendicular();
    expect(result.x).toBe(2);
    expect(result.y).toBe(-1);
  });

  it('should reflect vector along axis', () => {
    let axis = new Vector(0, 1)
    let result = v1.reflect(axis);
    expect(result.x).toBe(-1);
    expect(result.y).toBe(2);
  });

  it('should zero vector', () => {
    let result = v1.zero();
    expect(result.x).toBe(0);
    expect(result.y).toBe(0);
    expect(v1.x).toBe(0);
    expect(v1.y).toBe(0);
  });

});
