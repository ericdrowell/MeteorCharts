var MeteorChart;
(function() {
  MeteorChart = function(config) { 
    var that = this,
        container = config.container,
        layoutComponents, components, component, len, n, componentId, conf, componentData;

    this.attrs= {};
    this.container = MeteorChart.Util._isString(container) ? document.getElementById(container) : container;

    this.width(config.width);
    this.height(config.height);
    this.style(config.style);

    this.layout = config.layout(this);
    this.theme = config.theme;
    this._components = config.components || {};
    this.components = [];

    // build content container
    this.content = document.createElement('div');
    this.content.className = 'meteorchart-content';
    this.content.style.width = this.width();
    this.content.style.height = this.height();
    this.content.style.display = 'inline-block';
    this.content.style.backgroundColor = this.theme.background;
    this.content.style.position = 'relative';
    this.content.style.overflow = 'hidden';
    this.container.appendChild(this.content);

    // initialize renderer dummies
    MeteorChart.Dom.dummy = MeteorChart.Dom.createElement('div');
    MeteorChart.Dom.dummy.style.display = 'inline-block';
    MeteorChart.Dom.dummy.className = 'dom-dummy';
    this.content.appendChild(MeteorChart.Dom.dummy);

    layoutComponents = this.layout.components;
    len = layoutComponents.length;

    // init components
    for (n=0; n<len; n++) {
      this._initComponent(layoutComponents[n]);
    }

    // add components to chart content
    for (n=0, len=this.components.length; n<len; n++) {
      component = this.components[n];

      if (component.init) {
        component.init();
      }

      component.render();

      MeteorChart.log('add ' + component.id);
      this.content.appendChild(component.content); 
    }

    // store reference to this chart
    MeteorChart.charts.push(this);
  };

  MeteorChart.prototype = {
    _initComponent: function(conf) {
      var component;

      MeteorChart.log('init ' + conf.id);

      this._decorateConf(conf);
      component = new MeteorChart.Components[(conf.renderer || '') + conf.type](conf);

      this.components[component.id] = component;
      this.components.push(component);      
    },
    _decorateConf: function(conf) {
      var id = conf.id,
          component = this._components[id];

      if (component) {
        if (component.data) {
          conf.data = component.data;
        }
        if (component.renderer) {
          conf.renderer = component.renderer;
        }
      }

      conf.chart = this;
    },
    destroy: function() {
      var components = this.components,
          len = components.length,
          n;

      // destroy components
      for (n=0; n<len; n++) {
        components[n].destroy();
      }

      // clear any leftover DOM
      this.container.innerHTML = '';
    },
    render: function() { 
      var components = this.components,
          len = components.length,
          n, component
        
      for (n=0; n<len; n++) {
        components[n].render();
      }
    },
    // render helpers
    padding: function(scaleFactor) {
      var scale = scale = MeteorChart.Util._getScale(MeteorChart.Constants.PADDING_SCALE, scaleFactor);
      return (this.style().padding || this.theme.padding) * scale;
    }
  };

  MeteorChart.version = '@@version';
  MeteorChart.Components = {};
  MeteorChart.Formatters = {};
  MeteorChart.Layouts = {};
  MeteorChart.Themes = {};

  MeteorChart.Constants = {
    TYPOGRAPHIC_SCALE: 1.2,
    PADDING_SCALE: 1.2
  };

  // global properties
  MeteorChart.charts = [];

  // UA
  MeteorChart.UA = (function(root) {
    var userAgent = (root.navigator && root.navigator.userAgent) || '';
    var ua = userAgent.toLowerCase(),
        // jQuery UA regex
        match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [],

        // adding mobile flag as well
        mobile = !!(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i));

    return {
        browser: match[ 1 ] || '',
        version: match[ 2 ] || '0',

        // adding mobile flab
        mobile: mobile
    };
  })(this);

  MeteorChart.log = function(str) {
    console.log('-- ' + str);
  };

  MeteorChart.render = function() {
    var charts = this.charts,
        len = charts.length,
        n;

    for (n=0; n<len; n++) {
      charts[n].render();
    }
  }


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
