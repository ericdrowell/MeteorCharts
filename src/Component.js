(function() {
  MeteorChart.Component = function(config) {
    this.attrs = {};
    this.className = config.type;
    this.id = config.id;
    this.type = config.type;
    this.options = config.options || {};
    this.updateOn = config.updateOn || [];
    this.state = {};

    // binding functions
    this.x(config.x);
    this.y(config.y);
    this.width(config.width);
    this.height(config.height);
    this.data(config.data);

    this.layer = new Kinetic.Layer({
      name: this.className,
      id: this.id
    });
  };

  MeteorChart.Component.prototype = {
    _bind: function() {
      var updateOn = this.updateOn,
          len = updateOn.length,
          n;

      for (n=0; n<len; n++) {
        this._bindSingle(updateOn[n]);  
      }
    },
    _bindSingle: function(event) {
      var that = this,
          chart = this.chart,
          stage = chart.stage;

      stage.on(event, function() {
        var component = chart.components[that.id];
        component.update(); 
        component.batchDraw();
      });
    },
    getDataColor: function(n) {
      var themeData = this.chart.theme().data,
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
        this.layer.opacity(1);
      }
      else {
        this.layer.opacity(0);
      }

      this.layer.x(this.x());
      this.layer.y(this.y());

      // concrete component update
      if (this._update) {
        this._update();
      }
    },
    destroy: function() {

      if (this._destroy) {
        this._destroy();
      }
    }
  };

  MeteorChart.Component.define = function(type, methods) {
    MeteorChart.Components[type] = function(config) {
      var init = this.init;

      MeteorChart.Component.call(this, config);

      if (init) {
        this.init();
      }
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