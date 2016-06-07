var BodyType = require('../../../src/core/modules/BodyType');
var bodytype, bt;

describe('BodyType', () => {
  beforeEach(function () {
    bodytype = BodyType.create('bt', {
      props: {
        id: 'bt',
        fillStyle: 'red',
        strokeStyle: 'black',
      }
    });
    bt = bodytype.create({

    });

  });

  it('should be true', () => {
    expect(!!BodyType).toBe(true);
    expect(!!bodytype).toBe(true);
    expect(!!bt).toBe(true);

  });
});

