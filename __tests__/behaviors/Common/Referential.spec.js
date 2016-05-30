jest.unmock('../../../src/core/Stamp');
jest.unmock('../../../src/behaviors/Common/Referential');

var Stamp = require('../../../src/core/Stamp');
var Referential = require('../../../src/behaviors/Common/Referential');
var ReferentialStamp = new Stamp(Referential);

var parent, child;

var game = {
  refs: {
    foo: 'bar',
  },
  getRef: function (ref) {
    return this.refs[ref];
  },
  setRef: function (ref, value) {
    this.refs[ref] = value;
  },
  refresh: function () {

  },
};

describe('Common.Referential', () => {
  beforeEach(function () {
    parent = ReferentialStamp.create({
      game,
      state: {
        name: {
          first: 'Alex',
          last: 'McTammany',
        },
        nickname: '@name.first',
        //height: '@height',
      },
      width: 300,
      height: 500,
    });
    child = ReferentialStamp.create({
      game,
      parent,
      state: {
        name: {
          first: 'Foo',
          last: 'Bar',
        },
        w: '@width',
        h: '@height',
      },
    });
  });
  it('should be true', () => {
    expect(!!ReferentialStamp).toBe(true);
  });
  it('should get child ref from parent object', () => {
    expect(child.getRef('@w')).toBe(300);
    expect(child.getRef('@h')).toBe(500);
  });
  it('should get ref', () => {
    expect(parent.getRef('@name.first')).toBe('Alex');
    expect(parent.getRef('@name.last')).toBe('McTammany');
    expect(parent.getRef('@nickname')).toBe('Alex');
    expect(parent.getRef('width')).toBe(300);
    expect(parent.getRef('height')).toBe(500);
    //expect(parent.getRef('length')).toBe('length');
  });
  it('should get ref from game', () => {
    expect(parent.getRef('$foo')).toBe('bar');
  });
  it('should get ref from data', () => {
    let data = {name: {first: 'Foo', last: 'bar'}};
    expect(parent.getRef('#name.first', data)).toBe('Foo');
    expect(parent.getRef('#name.last', data)).toBe('bar');
  });
  it('should get ref from parent', () => {
    //console.log(child);
    expect(child.getRef('@nickname')).toBe('Foo');
  });
  it('should get ref from given object', () => {
    let res = child.getRef({id: '@name.last'});
    expect(res.id).toBe('Bar');
  });
  it('should return reference if nothing found', () => {
    expect(child.getRef('@foobar')).toBe('@foobar');
  });
  it('should return number if ref is a number', () => {
    expect(child.getRef(123)).toBe(123);
    //expect(fn).toThrow(new Error('Invalid reference'));
  });

  it('should set ref', () => {
    parent.setRef('name.first', 'Andrew');
    expect(parent.getRef('@name.first')).toBe('Andrew');
    parent.setRef('@nickname', 'Nobody');
    expect(parent.getRef('@name.first')).toBe('Nobody');
  });
  it('should fail to set ref if reference invalid', () => {
    let fn = function () {child.setRef(123, 'foobar')};
    expect(fn).toThrow(new Error('Invalid reference'));
  });
  it('should set ref to src if no reference found', () => {
    expect(child.getRef('@abc')).toBe('@abc');
    child.setRef('@abc', 'foobar');
    expect(child.getRef('@abc')).toBe('foobar');

  });
  it('should set child ref', () => {
    child.setRef('@name.first', 'Foo');
    expect(child.getRef('@name.first')).toBe('Foo');
    child.setRef('name.first', 'Foo1');
    expect(child.getRef('@name.first')).toBe('Foo1');
    child.setRef('@nickname', 'Bar');
    expect(child.getRef('@name.first')).toBe('Bar');
  });
  it('should set game ref', () => {
    child.setRef('$abc', 'def');
    expect(child.getRef('$abc')).toBe('def');
    expect(parent.getRef('$abc')).toBe('def');
  });
});

