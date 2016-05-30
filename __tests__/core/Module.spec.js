jest.unmock('../../src/core/Module');
jest.unmock('../../src/core/Stamp');
var Module = require('../../src/core/Module');
var mod;

var config = {
  refs: {
    foo: 'bar',
  },
  props: {
    bar: 'foo',
  },
};

describe('Module', () => {
  beforeEach(function () {
    Module.reset();
  });
  it('should be true', () => {
    expect(!!Module).toBe(true);
  });

  it('should create Module', () => {
    mod = Module.create('mod', config);
    expect(!!mod).toBe(true);
  });
  it('should find Module', () => {
    mod = Module.create('mod', config);
    let res = Module.find('mod');
    expect(res).toBe(mod);
  });
  it('should fail to find module', () => {
    expect(function () {Module.find('notreal')}).toThrow(new Error('Invalid find: notreal'));
    //let expected = Module.find('notreal');
    //expect(!!expected).toBe(false);
  });
  it('should size module children', () => {
    expect(Module.size()).toBe(0);
    Module.create('foo', {});
    expect(Module.size()).toBe(1);
  });
  it('should get array of children', () => {
    mod = Module.create('mod', config);
    let children = Module.children();
    expect(children).toContain(mod);
    let mod1 = Module.create('one', {});
    children = Module.children();
    expect(children).toContain(mod, mod1);
  });

});
