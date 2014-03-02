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
    this.selected(config.selected);

    this.layer = new Kinetic.Layer({
      name: this.className,
      id: this.id
    });
  };

  MeteorChart.Component.prototype = {
    _setAttr: function(attr, val) {
      this.attrs[attr] = val;
    },
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
        chart.components[that.id].batchDraw(); 
      });
    },
    getDataColor: function(n) {
      var themeData = this.chart.theme.data,
          len = themeData.length;

      return themeData[n % len];
    },
    batchDraw: function() {
      this._update();

      if (this.update) {
        this.update();
      }
      this.layer.batchDraw();
    },
    draw: function() {
      this.layer.draw();
    },
    changed: function() {
      this.chart.stage.fire('meteorchart-component-update-' + this.id);
    },
    _update: function() {
      var layer = this.layer;

      this.layer.x(this.x());
      this.layer.y(this.y());
    },
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

  // Factory methods
  MeteorChart.Component.addGetterSetter = Kinetic.Factory.addGetterSetter;
  MeteorChart.Component.addSetter = Kinetic.Factory.addSetter;
  MeteorChart.Component.addOverloadedGetterSetter = Kinetic.Factory.addOverloadedGetterSetter;

  // the addGetter method needs to be slightly different from the Kinetic.Factory.addGetter method
  // because MeteorChart component attrs can be functions which are bound to other component data
  MeteorChart.Component.addGetter = function(constructor, attr, def) {
    var that = this,
        method = 'get' + Kinetic.Util._capitalize(attr);

    constructor.prototype[method] = function() {
      var func = this.attrs[attr];

      if (func) {
        return func.call(this);
      }
      else {
        return def;
      }
    };
  };

  // getters setters
  MeteorChart.Component.addGetterSetter(MeteorChart.Component, 'x', 0);
  MeteorChart.Component.addGetterSetter(MeteorChart.Component, 'y', 0);
  MeteorChart.Component.addGetterSetter(MeteorChart.Component, 'width', 0);
  MeteorChart.Component.addGetterSetter(MeteorChart.Component, 'height', 0);
  MeteorChart.Component.addGetterSetter(MeteorChart.Component, 'data');
  MeteorChart.Component.addGetterSetter(MeteorChart.Component, 'selected', null);
})();