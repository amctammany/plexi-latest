module.exports = {
  requires: {
    components: ['UI.Div', 'UI.Button'],
    behaviors: [],
    actions: ['Base'],
  },
  Component: {
    RedDiv: {
      _componentType: 'UI.Div',
      refs: {
        grid: {rows: 1, columns: 3, padding: 10},
        style: {
          background: 'red',
        },
      },
      props: {
        components: [
          {
            type: 'UI.Button',
            props: {
              position: {row: 0, column: 0},
              text: 'button',
              action: [],
            },
          },
        ],
      },
    },
    GreenDiv: {
      _componentType: 'UI.Div',
      refs: {
        grid: {rows: 1, columns: 3, padding: 10},
        style: {
          background: 'green',
        },
      },
      props: {
        components: [
          {
            type: 'UI.Button',
            props: {
              position: {row: 0, column: 0},
              text: '-5',
              action: {
                type: 'CHANGE_STATE',
                payload: {
                  ref: '$counter',
                  fn: 'add',
                  value: -5,
                },
              },
            },
          },

          {
            type: 'UI.Button',
            props: {
              position: {row: 0, column: 1},
              text: '$counter',
              action: {
                type: 'CHANGE_STATE',
                payload: {
                  ref: '$counter',
                  fn: 'add',
                  value: 10,
                },
              },
            },
          },
          {
            type: 'UI.Button',
            props: {
              position: {row: 0, column: 2},
              text: '+5',
              action: {
                type: 'CHANGE_STATE',
                payload: {
                  ref: '$counter',
                  fn: 'add',
                  value: 5,
                },
              },
            },
          },

        ],
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
            },
          },
          {
            type: 'RedDiv',
            props: {
              position: {row: 2, column: 0},
              size: {rows: 1, columns: 3},
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
