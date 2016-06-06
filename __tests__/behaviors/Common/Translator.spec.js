var Stamp = require('../../../src/core/Stamp');
var Translator = require('../../../src/behaviors/Common/Translator');
var TranslatorStamp = new Stamp(Translator);
var Referential = require('../../../src/behaviors/Common/Referential');
var ReferentialStamp = new Stamp(Referential);
var s = new Stamp(Translator).compose(ReferentialStamp);

var translator, t;

t = {
  id: 'test',
  x: 100,
  pX: 10,
  position: {
    x: 10,
    y: 20,
  },
};

describe('Common.Translator', () => {
  beforeEach(function () {
    translator = s.create({
      dictionary: {
        text: 'id',
        posX: 'position.x',
        posY: 'position.y',
      },
    });

  });
  it('should be true', () => {
    expect(!!TranslatorStamp).toBe(true);
  });
  it('should translate item', () => {
    let result = translator.translate(t);
    expect(result.text).toBe('test');
    expect(result.posX).toBe(10);
    expect(result.posY).toBe(20);
  });
});
