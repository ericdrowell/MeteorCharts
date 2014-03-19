(function() {
  MeteorChart.Component = function(config) {
    this.attrs = {};
    this.className = config.type;
    this.id = config.id;
    this.type = config.type;
    this.options = config.options || {};
    this.dependencies = config.dependencies || {};

    // binding functions
    this.x(config.x);
    this.y(config.y);
    this.width(config.width);
    this.height(config.height);
    this.data(config.data);
    this.visible(config.visible);

    this.layer = new Kinetic.Layer({
      name: this.className,
      id: this.id,
      opacity: this.visible() ? 1 : 0
    });
  };

  MeteorChart.Component.prototype = {
    getDataColor: function(n) {
      var themeData = this.chart.theme.data,
          len = themeData.length;

      return themeData[n % len];
    },
    batchDraw: function() {
      this.layer.batchDraw();
    },
    draw: function() {
      this.layer.draw();
    },
    changed: function() {
      this.chart.stage.fire('meteorchart-component-update-' + this.id);
    },
    update: function() {
      // abstract component update
      var layer = this.layer,
          visible = this.visible();

      if (visible) {
        if (this.opacityTween) {
          this.opacityTween.reverse();
        }
        else {
          this.layer.opacity(1);
        } 
      }
      else {
        if (this.opacityTween) {
          this.opacityTween.play();
        }
        else {
          this.layer.opacity(0);
        } 
      }

      this.layer.x(this.x());
      this.layer.y(this.y());

      // concrete component update
      if (this._update) {
        this._update();
      }
    },
    destroy: function() {

    },
    clear: function() {
      this.layer.destroyChildren(); 
    }
  };

  MeteorChart.Component.define = function(type, methods) {
    MeteorChart.Components[type] = function(config) {
      MeteorChart.Component.call(this, config);
    };

    MeteorChart.Components[type].prototype = methods;
    Kinetic.Util.extend(MeteorChart.Components[type], MeteorChart.Component);
  };

  // getters setters
  MeteorChart.Util.addMethod(MeteorChart.Component, 'x', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'y', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'width', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'height', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'data');
  MeteorChart.Util.addMethod(MeteorChart.Component, 'visible', true);
})();