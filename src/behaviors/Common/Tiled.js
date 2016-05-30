var Tiled = {
  props: {
    width: null,
    height: null,
    grid: {
      rows: 1,
      columns: 1,
      padding: 0,
    },
    position: {
      row: null,
      column: null,
    },
    size: {
      rows: 1,
      columns: 1,
    },
  },
  init: function init() {
    this.dx = this.width / this.grid.columns;
    this.dy = this.height / this.grid.rows;
  },
  methods: {
    getPosition: function getPosition(item) {
      let border = item.border ? item.border.size : 0;
      if (item === this) {
        this.dx = (this.width);
        this.dy = (this.height);
      } else {
        this.dx = (this.width) / this.grid.columns;
        this.dy = (this.height) / this.grid.rows;
      }
      //console.log(this.grid);
      var columnSize = item.size.columns || 1,
          rowSize = item.size.rows || 1,
          padding = this.grid.padding || 0;

      return {
        x: item.position.column * this.dx + padding,
        y: item.position.row * this.dy + padding,
        width: (columnSize * this.dx) - (padding * 2) - (2 * border),
        height: (rowSize * this.dy) - (padding * 2) - (2 * border),
      };
    },
  },
};

module.exports = Tiled;
