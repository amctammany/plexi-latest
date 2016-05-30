module.exports = {
  Component: {
    UIDiv: {
      refs: {
        _tag: 'div',
      },
    },
    MainDiv: {
      _componentType: 'UIDiv',
      props: {
        position: {row: 0, column: 0},
        grid: {rows: 3, columns: 3, padding: 10},
        components: [
          {
            type: 'UIDiv',
            props: {
              position: {row: 0, column: 0},
              text: '1',
            }
          }
        ]
      }
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
