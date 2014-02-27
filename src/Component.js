(function() {
  MeteorChart.Component = function(config) {
    this.attrs = {};
    this.className = config.type;
    this.id = config.id;
    this.type = config.type;
    this.options = config.options;
    this.state = {};

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
    _setAttr: function(attr, val) {
      this.attrs[attr] = val;
    },
    getDataColor: function(n) {
      var themeData = this.chart.theme.data,
          len = themeData.length;

      return themeData[n % len];
    },
    draw: function() {
      this.layer.draw();
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
      var val = this.attrs[attr];
      val === undefined ? def : val;

      if (Kinetic.Util._isFunction(val)) {
        return val.call(this);
      }
      else {
        return val;
      }
    };
  };

  // getters setters
  MeteorChart.Component.addGetterSetter(MeteorChart.Component, 'x', 0);
  MeteorChart.Component.addGetterSetter(MeteorChart.Component, 'y', 0);
  MeteorChart.Component.addGetterSetter(MeteorChart.Component, 'width', 0);
  MeteorChart.Component.addGetterSetter(MeteorChart.Component, 'height', 0);
  MeteorChart.Component.addGetterSetter(MeteorChart.Component, 'data');
})();