module.exports = {
  requires: {
    components: ['UI.Div'],
    behaviors: [],
  },
  Component: {
    RedDiv: {
      _componentType: 'UI.Div',
      refs: {
        style: {
          background: 'red',
        },
      },
    },
    GreenDiv: {
      _componentType: 'UI.Div',
      refs: {
        style: {
          background: 'green',
        },
      },
    },
    MainDiv: {
      _componentType: 'UI.Div',
      props: {
        position: {row: 0, column: 0},
        grid: {rows: 3, columns: 3, padding: 10},
        components: [
          {
            type: 'GreenDiv',
            props: {
              position: {row: 0, column: 0},
              size: {rows: 1, columns: 3},
              text: 'hi',
            },
          },
          {
            type: 'RedDiv',
            props: {
              position: {row: 2, column: 0},
              size: {rows: 1, columns: 3},
              text: 'hi',
            },
          },

        ],
      },
    },
  },
  Stage: {
    Main: {
      refs: {
        component: 'MainDiv',
      },
    },
  },
};
