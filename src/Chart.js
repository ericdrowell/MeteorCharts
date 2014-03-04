/*
 * Meteor Charts v@@version
 * http://www.meteorcharts.com
 * Copyright 2013, Eric Rowell
 * License http://www.meteorcharts.com/terms-of-use.html
 * Date: @@date
 */
 var MeteorChart;
(function() {
  MeteorChart = function(config) {
    var that = this,
        container = config.container,
        layout = config.layout,
        components = layout.components,
        len = components.length,
        n, componentId, conf, componentData;

    this.attrs= {};
    this.width(config.width);
    this.height(config.height);
    this.theme(config.theme);
    this.data(config.data);
    this.options(config.options);
    this.padding(config.padding);

    this.components = [];

    this.container = Kinetic.Util._isString(container) ? document.getElementById(container) : container;
    this.kineticContainer = document.createElement('div');
    this.kineticContainer.className = 'meteorchart-content';
    this.kineticContainer.style.width = this.width();
    this.kineticContainer.style.height = this.height();
    this.kineticContainer.style.display = 'inline-block';
    this.kineticContainer.style.backgroundColor = this.theme().primary;
    this.container.appendChild(this.kineticContainer);

    this.stage = new Kinetic.Stage({
      width: that.width(),
      height: that.height(),
      container: that.kineticContainer
    });

    // instantiate components and add them to the hash
    for (n=0; n<len; n++) {
      conf = components[n];
      

      // add data if it's in the chart data object
      this._addData(conf);

      component = new MeteorChart.Components[conf.type](conf);
      component.chart = this;
      this.components[component.id] = component;
      this.components.push(component); 
    }

    // initialize each component based on init order
    for (n=0; n<layout.initOrder.length; n++) {
      componentId = layout.initOrder[n];
      component = this.components[componentId];
      component.init();
      component.update();
    }

    // add each component to the stage based on the order of the component config
    for (n=0; n<this.components.length; n++) {
      component = this.components[n];
      this.stage.add(component.layer); 
    }

    // add bindings and tweens
    for (n=0; n<this.components.length; n++) {
      component = this.components[n];

      // abstract component bindings
      component._bind();

      // component subclass bindings
      if (component.bind) {
        component.bind();
      }

      // add tweens
      component._addTweens();
    }

    // init layout if one is defined
    if (layout.init) {
      layout.init(this);
    }
  };

  MeteorChart.prototype = {
    _addData: function(conf) {
      var componentData = this.data()[conf.id];

      if (componentData) {
        conf.data = function() {
          return componentData;
        };
      }
    },
    destroy: function() {
      var components = this.components,
          len = components.length,
          n;

      // destroy components
      for (n=0; n<len; n++) {
        components[n].destroy();
      }

      // destroy stage
      this.stage.destroy();

      // clear any leftover DOM
      this.container.innerHTML = '';

      

    }
  };

  MeteorChart.version = '@@version';
  MeteorChart.Components = {};
  MeteorChart.Formatters = {};
  MeteorChart.Layouts = {};
  MeteorChart.Themes = {};
  MeteorChart.Constants = {
    TYPOGRAPHIC_SCALE: 1.2
  };
})();

// Uses Node, AMD or browser globals to create a module.

// If you want something that will work in other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrict.js

// Defines a module "returnExports" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

// if the module has no dependencies, the above pattern can be simplified to
( function(root, factory) {
    if( typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    }
    else if( typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    }
    else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function() {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return MeteorChart;
}));
