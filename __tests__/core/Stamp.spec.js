jest.unmock('../../src/core/Stamp');

var Stamp = require('../../src/core/Stamp');

var testStamp, otherStamp, doubleStamp, composeStamp, stamp, other;

var TestStamp = {
  refs: {
    style: {
      stroke: 'blue',
      fill: 'red',
    },
  },
  props: {
    x: 10,
    y: 15,
    z: null,
    position: {
      a: 1, b: 2, c: 3,
    },
  },
  init: function () {
    this.z = this.x + this.y;
  },
  methods: {
    execute: function () {
      return 100;
    },
    add: function () {
      return this.x + this.y;
    }
  },
};

var OtherStamp = {
  //behaviors: [TestStamp],
  props: {
    a: 10,
    b: 20,
  },
  init: function () {
    this.z = this.a + this.b;
    //console.log("other init");
  },
  methods: {
    execute: function () {
      return this.a + this.b;
    },
  },
};

describe('Stamp', () => {
  beforeEach(function () {
    testStamp = new Stamp(TestStamp);
    otherStamp = new Stamp(OtherStamp);
    doubleStamp = testStamp.compose(testStamp);
    composeStamp = testStamp.compose(otherStamp);
    stamp = testStamp.create();
    other = otherStamp.create();
  });

  it('should replicate', () => {
    //console.log(doubleStamp);
  });
  it('should fail to add init with bad method', () => {
    let oldCount = testStamp.fixed.init.length;
    let newStamp = testStamp.init({inits: 'foo'});
    let newCount = newStamp.fixed.init.length;
    expect(newCount).toBe(oldCount);
  });
  it('should fail to add init if not a function', () => {
    let initFn = function() {

    };
    let newStamp = (new Stamp()).init(initFn, 'foo');
    expect(newStamp.fixed.init.length).toBe(1);
  })
  it('should add init', () => {
    let newStamp = testStamp.init({foo: function () {return 'bar'}});
    expect(newStamp.fixed.init.length).toBe(2);
  });
  it('should only add init method if needed', () => {
    expect(testStamp.fixed.init.length).toBe(1);
    expect(otherStamp.fixed.init.length).toBe(1);
    expect(doubleStamp.fixed.init.length).toBe(1);
    expect(composeStamp.fixed.init.length).toBe(2);
  });
  it('should be true', () => {
    expect(!!Stamp).toBe(true);
    expect(!!testStamp).toBe(true);
    expect(!!otherStamp).toBe(true);
    expect(!!stamp).toBe(true);
    expect(!!other).toBe(true);
  });

  it('should compose stamps', () => {
    //let comp = testStamp.compose(otherStamp);
    let comp = otherStamp.compose(testStamp);
    expect(!!comp).toBe(true);
    stamp = comp.create();
    expect(stamp.x).toBe(10);
    expect(stamp.y).toBe(15);
    expect(stamp.a).toBe(10);
    expect(stamp.b).toBe(20);
    expect(stamp.execute()).toBe(stamp.a + stamp.b);
  });

  it('should create blank stamp', () => {
    let blank = new Stamp({});
    stamp = blank.create();
    expect(!!stamp).toBe(true);
  });

  it('should be true', () => {
    expect(!!Stamp).toBe(true);
    expect(!!testStamp).toBe(true);
    expect(!!stamp).toBe(true);
  });

  it('should create stamp with props', () => {
    Object.keys(TestStamp.props).forEach(p => {
      if (!TestStamp.props[p]) return;
      expect(stamp[p]).toEqual(TestStamp.props[p]);
    });
  });
  it('should initialize stamp', () => {
    //console.log(stamp);
    expect(stamp.z).toBe(stamp.x + stamp.y);
    expect(stamp.style.stroke).toBe('blue');
    expect(stamp.style.fill).toBe('red');
  });

  it('should create new stamp with new props', () => {
    let newStamp = testStamp.props({x: 50, y: 100});
    let stamp = newStamp.create();
    expect(!!stamp).toBe(true);
    expect(stamp.z).toBe(150);
  });

  it('should create new stamp with new refs', () => {
    let style = {background: 'blue'};
    let newStamp = testStamp.refs({style});
    let stamp = newStamp.create();
    expect(stamp.style).toBe(style);
  });

});
