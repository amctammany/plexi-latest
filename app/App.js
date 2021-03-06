module.exports = {
  requires: {
    components: ['UI.Div', 'UI.Button', 'Composite.List', 'Composite.RadioGroup', 'Display.Canvas'],
    behaviors: ['Component.TypedActions'],
    bodytypes: ['Rectangle', 'Circle'],
    actions: ['Base'],
  },
  Action: {
    BOTTOM_BUTTON_PRESS: {
      refs: {},
      props: {
        actions: [
          {
            type: 'CHANGE_STATE',
            payload: {
              ref: '$bodytype',
              value: '@id',
            },
          },

        ],
      },
    },
    CANVAS_SELECT: {
      refs: {},
      props: {
        actions: [
          {
            type: 'SELECT_BODY',
            payload: {
              position: {
                x: '#position.x',
                y: '#position.y',
              },
              action: {
                type: 'CHANGE_STATE',
                payload: {
                  ref: '$selectedBodies',
                  value: '#bodies',
                },
              },
            },
          },
        ],
      },
    },
    CANVAS_DELETE: {
      refs: {},
      props: {
        actions: [
          {
            type: 'DELETE_BODY',
            payload: {
              position: {
                x: '#position.x',
                y: '#position.y',
              },
            },
          },
        ],
      },
    },
    CANVAS_CREATE: {
      refs: {

      },
      props: {
        actions: [
          {
            type: 'CREATE_BODY',
            payload: {
              bodytype: '$bodytype',
              config: {
                position: {
                  x: '#position.x',
                  y: '#position.y',
                }
              },
            },
          },
        ],
      },
    },
  },
  BodyType: {
    Square: {
      behaviors: ['Rectangle'],
      props: {
        width: 50,
        height: 50,
        background: 'black',
      },
    },
    Circ: {
      behaviors: ['Circle'],
      props: {
        radius: 25,
        fillStyle: 'blue',
      },
    },
  },
  World: {
    Main: {
      refs: {
        gravity: 0.01,
      },
    },
  },
  Component: {
    BottomButton: {
      _componentType: 'UI.Button',
      refs: {
        action: {
          type: 'BOTTOM_BUTTON_PRESS',
        },

      },
      props: {
        text: '@id',
        style: {
          background: 'grey',
        },
      },
    },
    Menu: {
      _componentType: 'Composite.RadioGroup',
      refs: {
        items: '$$BodyType.children',
        template: 'BottomButton',
        orientation: 'horizontal',
        dictionary: {
          text: 'fixed.refs._type',
          state: {
            id: '@text',
          },
        },
        itemAction: {
          type: 'BOTTOM_BUTTON_PRESS',
        },
        itemClasses: {
          selected: {
            border: '2px solid white',
          },
        },
      },
      props: {
        style: {
          background: 'red',
        },
        grid: {
          padding: 10,
        },
        state: {
          selected: null,
        },
      },
    },
    MainCanvas: {
      _componentType: 'Display.Canvas',
      behaviors: ['Component.TypedActions'],
      refs: {
        actions: {
          CREATE: {
            type: 'CANVAS_CREATE',
          },
          SELECT: {
            type: 'CANVAS_SELECT',
          },
          DELETE: {
            type: 'CANVAS_DELETE',
          }
        },
        action: {
          type: 'CANVAS_CREATE',
          payload: {
            //x: '#position.x',
            //y: '#position.y',
          }
        }

      },
      props: {
        _actionType: '$CanvasSelectTool',
      },
    },
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
    CanvasSelectMenuButton: {
      _componentType: 'UI.Button',
      refs: {

      },
      props: {

      },
    },
    CanvasSelectMenu: {
      _componentType: 'Composite.RadioGroup',
      refs: {
        template: 'CanvasSelectMenuButton',
        orientation: 'horizontal',
        grid: {
          padding: 10,
        },
      },
      props: {
        style: {
          background: 'green',
        },
        items: [
          {
            text: 'Create',
            action: {
              type: 'CHANGE_STATE',
              payload: {
                ref: '$CanvasSelectTool',
                value: 'CREATE',
              },
            },
          },
          {
            text: 'Select',
            action: {
              type: 'CHANGE_STATE',
              payload: {
                ref: '$CanvasSelectTool',
                value: 'SELECT',
              },
            },

          },
          {
            text: 'Delete',
            action: {
              type: 'CHANGE_STATE',
              payload: {
                ref: '$CanvasSelectTool',
                value: 'DELETE',
              },
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
        grid: {rows: 5, columns: 5, padding: 10},
        components: [
          {
            type: 'CanvasSelectMenu',
            props: {
              position: {row: 0, column: 0},
              size: {rows: 1, columns: 5},
            },
          },
          {
            type: 'MainCanvas',
            props: {
              position: {row: 1, column: 0},
              size: {rows: 3, columns: 5},
            },
          },
          {
            type: 'Menu',
            props: {
              position: {row: 4, column: 0},
              size: {rows: 1, columns: 5},
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
