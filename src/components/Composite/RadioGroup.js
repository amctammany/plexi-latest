import List from './List';
import Translator from '../../behaviors/Common/Translator';
import {merge} from 'supermixer';
import {isArray, isObject, values} from 'lodash';
var selectAction = {
            type: 'SOURCE_METHOD',
            payload: {
              src: 'parent',
              fn: 'select',
              args: ['@_id'],
            },
          };
var RadioGroup = {
  behaviors: [List, Translator],
  refs: {
    itemStyle: {
      border: '5px solid black',
    },
    itemClasses: {
      selected: {
        border: '5px solid red',
      },
    },

  },
  props: {
    state: {
      _selected: null,
    },
  },
  init: function init({instance: {game}}) {
    //console.log('radio group init')
    //console.log(this);
    var preupdate = this.preUpdate.bind(this);
    this.preUpdate = (game) => {
      //console.log('radio group preupdate')
      //this._items = this.items.map(i => {
        //console.log(i);
        //i.style = this.itemStyle;
        //i.classes = this.itemClasses;
        ////merge(i.style, this.itemStyle);
        //merge(i.classes, this.itemClasses);
        //console.log(i);
        //return i;
      //});
      preupdate(game);
    }
    this.postUpdate = (game) => {
      if (this.state._selected !== null) {
        this.select(this.state._selected);
      }
    };
    //console.log(this._items)

  },

  methods: {
    getItems: function getItems() {
      var items;
      if (isArray(this.items)) {
        items = this.items;
      } else if (isObject(this.items)) {
        items = values(this.items);
      } else {
        let itemsRef = this.getRef(this.items);
        items = isArray(itemsRef) ? itemsRef : [];
      }
      return items.map((i, index) => {
        //console.log(this.translate(i))
        //let item = this.translate(i);
        //
        let item = {};
        item.text = i.text;
        item._id = index;
        item.style = i.style || {};
        item.classes = i.classes || {};
        Object.assign(item.style, this.itemStyle);
        Object.assign(item.classes, this.itemClasses);
        item.action = [selectAction];
        //console.log(item.action);
        if (isArray(i.action)) {
          item.action.concat(i.action);
        } else if (isObject(i.action)) {
          //console.log(i.action);
          item.action.push(i.action);
          //console.log(item.action);
        } else {

        }
        item.action = item.action.reverse();
        return item;
        console.log(i.action)
        //console.log(i)
      });
      return items;
    },
    select: function select(ident) {
      let id = this.getRef(ident);
      let previousSelection = this._components.filter(c => {
        //console.log(c.state.id);
        //console.log(this.state._selected)
        return c._id === this.state._selected;
      });
      let nextSelection = this._components.filter(c => {
        return c._id === id;
      });

      previousSelection.forEach(c => {
        //console.log(c);
        c.removeClass('selected');
        c.update(Plexi.Game);
      });
      nextSelection.forEach(c => {
        //c._selected = true;
        c.addClass('selected');
        c.update(Plexi.Game);
      });
      //this._selected = id;

      //console.log('select radio group')
      //console.log(this);
      //console.log(id);
      //this.state._selected = id;
      this.setRef('@_selected', id);
      //this.update(Plexi.Game);
    },

  },
};

module.exports = RadioGroup;
