//jest.disableAutomock();
jest.unmock('../../../src/core/Game');
jest.unmock('../../../src/core/modules/Action');
jest.unmock('../../../src/core/Module');
jest.unmock('../../../src/behaviors/Common/Referential');
jest.unmock('../../../src/actions/Base');

Plexi.loadActions(['Base']);
//var Plexi = require('../../../src/plexi');
var Stamp = require('../../../src/core/Stamp');
var Referential = require('../../../src/behaviors/Common/Referential');
var ReferentialStamp = new Stamp(Referential);
var Action = require('../../../src/core/modules/Action');
var action, a, res, ref;
var event = {
  position: {
    x: 10,
    y: 25,
  },
};

describe('Action', () => {
  beforeEach(function () {
    //Plexi.loadActions(['Base']);
    //Plexi.createGame(null, {
      //width: 500, height: 500,
    //})
    //console.log(Plexi);
    ref = ReferentialStamp.create({
      state: {
        x: 0,
        y: 0,
        a: 2,
        b: -5,
      },
    });
    action = Action.create('Action', {
      props: {

      },
      refs: {
        actions: [
          {
            type: 'CHANGE_STATE',
            payload: {
              ref: '@x',
              value: '#position.x',
            },
          },
          {
            type: 'CHANGE_STATE',
            payload: {
              ref: '@y',
              fn: 'add',
              value: '#position.y',
            },
          },
          {
            type: 'CHANGE_STATE',
            payload: {
              ref: '@a',
              fn: 'multiply',
              value: '#position.x',
            },
          },
          {
            type: 'CHANGE_STATE',
            payload: {
              ref: '@b',
              fn: 'subtract',
              value: '#position.y',
            },
          },

        ],
      },
    });
    a = action.create({

    });
    //console.log(ref);
  });
  it('should be true', () => {
    expect(!!Action).toBe(true);
    expect(!!action).toBe(true);
    expect(!!a).toBe(true);
  });
  it('should instantiate action', () => {
    //console.log(a);
    //expect(res.length).toBe(2);
    //expect(a.y).toBe(25);
  });
  it('should execute action', () => {
    expect(ref.getRef('@x')).toBe(0);
    expect(ref.getRef('@y')).toBe(0);
    expect(ref.getRef('@a')).toBe(2);
    expect(ref.getRef('@b')).toBe(-5);

    a.execute(ref, {type: 'Action', payload: {foo: 'bar'}}, event);

    expect(ref.getRef('@x')).toBe(10);
    expect(ref.getRef('@y')).toBe(25);
    expect(ref.getRef('@a')).toBe(20);
    expect(ref.getRef('@b')).toBe(-30);
  });
});
