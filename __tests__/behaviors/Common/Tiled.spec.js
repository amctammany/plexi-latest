jest.unmock('../../../src/core/Stamp');
jest.unmock('../../../src/behaviors/Common/Tiled');

var Stamp = require('../../../src/core/Stamp');
var Tiled = require('../../../src/behaviors/Common/Tiled');

var TiledStamp = new Stamp(Tiled);
var parent;

describe('Common.Tiled', () => {
  beforeEach(() => {
    parent = TiledStamp.create({
      width: 400,
      height: 600,
      grid: {rows: 3, columns: 4},
    });
  });
  it('should be true', () => {
    expect(!!TiledStamp).toBe(true);
  });

  it('should create tiled body', () => {
    expect(!!parent).toBe(true);
    expect(parent.dx).toBe(100);
    expect(parent.dy).toBe(200);
  });

  it('should get position of item', () => {
    let tile = TiledStamp.create({position: {row: 1, column: 1}, size: {rows: 2, columns: 2}});
    let position = parent.getPosition(tile);
    expect(position.x).toBe(100);
    expect(position.y).toBe(200);
    expect(position.width).toBe(200);
    expect(position.height).toBe(400);
  });
});
