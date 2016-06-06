jest.unmock('../../../src/core/Module');
jest.unmock('../../../src/core/Stamp');
jest.unmock('../../../src/core/modules/Component');
jest.unmock('../../../src/behaviors/Common/Referential');
jest.unmock('../../../src/behaviors/Common/Tiled');

var Component = require('../../../src/core/modules/Component');
var comp, c, c1;
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
    //components: [],
  }
};

describe('Component', () => {
  beforeEach(function () {
    comp = Component.create('comp', config);
    c = comp.create();
    c1 = comp.props({components: [
      {
        type: 'comp',
        props: {},
      },
    ]}).create();
    c.render(c);
    c1.render(c);

  });
  it('should be true', () => {
    //console.log(Plexi);
    expect(!!Component).toBe(true);
    expect(!!comp).toBe(true);
    expect(!!c).toBe(true);
  });

  it('should have children', () => {
    expect(c._components.length).toBe(0);
    expect(c1._components.length).toBe(1);
  });

  it('should be Referential', () => {
     expect(typeof(c.getRef)).toBe('function');
  });
});
