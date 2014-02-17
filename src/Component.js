(function() {
  MeteorChart.Component = function(config) {
    this.attrs = {};

    this.id(config.id);
    this.type(config.type);
    this.x(config.x);
    this.y(config.y);
    this.width(config.width);
    this.height(config.height);
    this.data(config.data);
    this.options(config.options);

    this.layer = new Kinetic.Layer({
      name: this.className,
      id: this.id()
    });
  };

  MeteorChart.Component.prototype = {
    _setAttr: function(attr, val) {
      this.attrs[attr] = val;
    },
    getDataColor: function(n) {
      var themeData = this.theme.data,
          len = themeData.length;

      return themeData[n % len];
    },
    draw: function() {
      this.layer.draw();
    }
  };

  Kinetic.Factory.addGetterSetter(MeteorChart.Component, 'id');
  Kinetic.Factory.addGetterSetter(MeteorChart.Component, 'type');
  Kinetic.Factory.addGetterSetter(MeteorChart.Component, 'x', 0);
  Kinetic.Factory.addGetterSetter(MeteorChart.Component, 'y', 0);
  Kinetic.Factory.addGetterSetter(MeteorChart.Component, 'width', 0);
  Kinetic.Factory.addGetterSetter(MeteorChart.Component, 'height', 0);
  Kinetic.Factory.addGetterSetter(MeteorChart.Component, 'data');
  Kinetic.Factory.addGetterSetter(MeteorChart.Component, 'options');
})();