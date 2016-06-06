jest.unmock('../../../src/core/Module');
jest.unmock('../../../src/core/Stamp');
jest.unmock('../../../src/core/modules/Component');
jest.unmock('../../../src/behaviors/Common/Referential');
jest.unmock('../../../src/behaviors/Common/Tiled');

var Component = require('../../../src/core/modules/Component');
var comp, c;
var config = {
  refs: {
    position: {row: 0, column: 0},
    grid: {rows: 3, columns: 3},
    width: 600,
    height: 600,
  },
  props: {
    state: {

    },
  },
};

describe('Component', () => {
  beforeEach(function () {
    comp = Component.create('comp', config);
    c = comp.create();
    c.render(c);

  });
  it('should be true', () => {
    //console.log(Plexi);
    expect(!!Component).toBe(true);
    expect(!!comp).toBe(true);
    expect(!!c).toBe(true);
  });
  it('should be Referential', () => {
     expect(typeof(c.getRef)).toBe('function');
  });
});
