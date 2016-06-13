var Stamp = require('../../../src/core/Stamp');
var TypedActions = require('../../../src/behaviors/Component/TypedActions');
var TypedActionsStamp = new Stamp(TypedActions);
var Referential = require('../../../src/behaviors/Common/Referential');
var ReferentialStamp = new Stamp(Referential);
var s = new Stamp(TypedActionsStamp).compose(ReferentialStamp);

var typed;

describe('Common.TypedActions', () => {
  beforeEach(function () {
    typed = s.create({

    });
  });

  it('should be true', () => {
    expect(!!typed).toBe(true);
  });
});
