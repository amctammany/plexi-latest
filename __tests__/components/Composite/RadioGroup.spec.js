var Component = require('../../../src/core/modules/Component');
var RadioGroupConfig = require('../../../src/components/Composite/RadioGroup');
var UIDivConfig = require('../../../src/components/UI/Div');
var RadioGroup = Component.create('Composite.RadioGroup', RadioGroupConfig);

var Game = require('../../../src/core/Game');
var RadioGroup, rg, div;
var RadioGroupRef;

Plexi.Game.state.items = [{text: 'f1'}, {text: 'f2'}, {text: 'f3'}];
describe('RadioGroup', () => {
  beforeEach(function () {
    div = document.createElement('div');
    Component.create('UI.Div', UIDivConfig);
    rg = RadioGroup.create({
      //game: new Game(null, {Stage: 'Main'}),
      template: 'UI.Div',
      items: [
        {text: 'foo1'},
        {text: 'foo2'},
      ],
    });
    rg.render(rg, null);
    RadioGroupRef = RadioGroup.create({
      template: 'UI.Div',
      items: '$items',
    });
    //RadioGroup.render(RadioGroup, div);
    //RadioGroup.update();
    //console.log(RadioGroup);
    //console.log(RadioGroup);
  });
  it('should be true', () => {
    expect(!!RadioGroup).toBe(true);
    expect(!!rg).toBe(true);
  });

  it('should have length', () => {
    let items = rg.getItems();
    //console.log(RadioGroup);
    expect(items.length).toBe(2);
  });
  it('should make RadioGroup of object', () => {
    let rg1 = RadioGroup.create({
      template: 'UI.Div',
      items: {
        a: 'foo',
        b: 'bar',
        c: 'baz',
      },
    });
    let items = rg1.getItems();
    //console.log(items);
    expect(items.length).toBe(3);
  })
  it('should have length from reference', () => {
     let items = RadioGroupRef.getItems();
     expect(items.length).toBe(3);
  })
  it('should have children text properties', () => {
    let items = rg.getItems();
    expect(items[0].text).toBe('foo1');
    expect(items[1].text).toBe('foo2');
  });

  it('should preUpdate RadioGroup', () => {
    rg.preUpdate();
    //console.log(RadioGroup.getItems());
  });
});
