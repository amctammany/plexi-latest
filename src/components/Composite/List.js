import Translator from '../../behaviors/Common/Translator';
import {isArray, isObject, values} from 'lodash';

var List = {
  behaviors: [Translator],
  refs: {
    _tag: 'div',
  },
  props: {
    items: null,
    template: null,
    orientation: null,
  },
  init: function init() {
    //console.log('list group init')
    //this.getItems();
    this.preUpdate = (game) => {
      //console.log('list group preupdate')
      let items = this.getItems();
      //console.log(this.items);
      if (this._items === items) {
        //console.log('repeat')
        return;
      }
      let length = items.length;
      let tmpl = this.getRef('template');
      let template = Plexi.Component.find(tmpl);
      this.$el.innerHTML = '';
      this.grid.rows = this.orientation === 'vertical' ? length : 1;
      this.grid.columns = this.orientation === 'horizontal' ? length : 1;
      this._components = items.map((item, i) => {
        let position = this.orientation === 'vertical' ? {row: i, column: 0} : {row: 0, column: i};
        //if (!item._translated) {
          //item = this.translate(item);
        //}
        //console.log(item);
        let formattedItem = Object.assign(this.translate(item), {position,});
        //console.log(formattedItem)
        let t = template.create(formattedItem);
        return t;
      });
      this._components.forEach(c => {
        c.render(this, this.$el);
      });
      this._items = items;

    };
  },
  methods: {
    getItems: function getItems() {
      let res;
      if (isArray(this.items)) {
        res = this.items;
      } else {
        let items = this.getRef(this.items);
        //console.log(items);
        if (isArray(items)) {
          res = items;
        } else if (isObject(items)) {
          res = values(items);
        } else {
          res = [];
        }
        //res = isArray(items) ? items : [];
      }
      //console.log(res);
      return res;
    },

  },
};

module.exports = List;
