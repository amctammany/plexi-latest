jest.unmock('../src/Plexi');
jest.unmock('../src/core/Module');
jest.unmock('../src/core/Stamp');

//var Plexi = require('../src/Plexi');

describe('Plexi', () => {
  beforeEach(function() {
    //Plexi = require('../src/Plexi');
  });
  it('should be true', () => {
    expect(!!Plexi).toBe(true);
  });
  it('should do something', () => {
    let result = Plexi.doSomething();
    expect(!!result).toBe(true);
  });
  it('should have Module', () => {
    expect(!!Plexi.Module).toBe(true);
    expect(Plexi.Module.size()).toBe(0);
  });
  it('should load', () => {
    Plexi.load({Module: {One: {refs: {}, props: {}}}});
    expect(Plexi.Module.size()).toBe(1);
    Plexi.load({Module: {Two: {refs: {}, props: {}}}});
    expect(Plexi.Module.size()).toBe(2);
  });
});
