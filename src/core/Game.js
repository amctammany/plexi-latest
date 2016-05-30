import Stage from './modules/Stage';

class Game {
  constructor(el, config) {
    this.$el = document.getElementById(el) || document.create('div');
    this.width = config.width || 500;
    this.height = config.height || 500;

    this.$el.style.width = this.width;
    this.$el.style.height = this.height;

    this.Stage = null;
    this.state = config.state || {};
    this.changeStage(config.Stage);
  }
  loadStage(stageName) {
    if (!stageName) return;
    let stage = Stage.find(stageName);
    //console.log(stage);
    var s;
    if (stage) {
      s = stage.create({game: this});
      //console.log(s);
      s.render(this, this.$el);
    }
    return s;
  }
  changeStage(stageName) {
    if (!stageName) return;
    this.paused = true;
    //if (this.Stage && this.Stage.onExit) this.Stage.onExit();
    if (this.Stage && this.Stage.$el) this.Stage.$el.hidden = true;
    this._stageName = stageName;
    this.Stage = this.loadStage(stageName);

    //this.Stage.$el.hidden = false;
    //if (this.Stage && this.Stage.onLoad) this.Stage.onLoad();
    this.paused = false;
    return this.Stage;
  }
  dispatch(src, event, data) {
    //console.log(src);
    //console.log(event);
    if (!event) return;
    //console.log(...data);
    let action = Action.find(event.type);
    if (!!action) {

    //console.log(event.payload);
      let a = action.create({});
    //console.log(a);
    //console.log(a);
    //console.log(event.payload);
      a.execute(src, event.payload, data);
      //this.refresh();
    } else {
      console.warn('invalid event: ' + event);
    }
    //console.log(action);
    //console.log(event);
    //console.log(src);
    //let s = src.getRef(event.payload);
    //console.log(s);
  }

  refresh() {

  }

}

module.exports = Game;
