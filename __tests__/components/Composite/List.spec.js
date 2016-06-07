var Component = require('../../../src/core/modules/Component');
var ListConfig = require('../../../src/components/Composite/List');
var UIDivConfig = require('../../../src/components/UI/Div');
var List = Component.create('Composite.List', ListConfig);

var Game = require('../../../src/core/Game');
var list, l, div;
var listRef;

Plexi.Game.state.items = [{text: 'f1'}, {text: 'f2'}, {text: 'f3'}];
describe('List', () => {
  beforeEach(function () {
    div = document.createElement('div');
    Component.create('UI.Div', UIDivConfig);
    list = List.create({
      //game: new Game(null, {Stage: 'Main'}),
      template: 'UI.Div',
      items: [
        {text: 'foo1'},
        {text: 'foo2'},
      ],
    });
    list.render(list, null);
    listRef = List.create({
      template: 'UI.Div',
      items: '$items',
    });
    //list.render(list, div);
    //list.update();
    //console.log(List);
    //console.log(list);
  });
  it('should be true', () => {
    expect(!!List).toBe(true);
    expect(!!list).toBe(true);
  });

  it('should have length', () => {
    let items = list.getItems();
    //console.log(list);
    expect(items.length).toBe(2);
  });
  it('should make list of object', () => {
    let l = List.create({
      items: {
        a: 'foo',
        b: 'bar',
        c: 'baz',
      },
    });
    let items = l.getItems();
    //console.log(items);
    expect(items.length).toBe(3);
  })
  it('should have length from reference', () => {
     let items = listRef.getItems();
     expect(items.length).toBe(3);
  })
  it('should have children text properties', () => {
    let items = list.getItems();
    expect(items[0].text).toBe('foo1');
    expect(items[1].text).toBe('foo2');
  });

  it('should preUpdate list', () => {
    list.preUpdate();
    //console.log(list.getItems());
  });
});
