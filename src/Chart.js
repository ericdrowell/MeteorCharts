var MeteorChart;
(function() {
  MeteorChart = function(config) { 
    var that = this,
        container = config.container,
        components, len, n, componentId, conf, componentData;

    this.attrs= {};
    this.container = MeteorChart.Util._isString(container) ? document.getElementById(container) : container;
    
    this.width(config.width);
    this.height(config.height);
    this.data(config.data);
    this.padding(config.padding);

    this.layout = config.layout(this);
    this.theme = config.theme;
    this.interaction = config.interaction;
    this.options = config.options;
    this._components = config.components;
    this.components = [];

    components = this.layout.components;
    len = components.length;

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

    MeteorChart.log('1) INSTANTIATE COMPONENTS');
    for (n=0; n<len; n++) {
      conf = components[n];
      MeteorChart.log('-- ' + conf.id);

      this._decorateConf(conf);
      component = new MeteorChart.Components[conf.name](conf);

      this.components[component.id] = component;
      this.components.push(component); 
    }

    MeteorChart.log('2) INITIALIZE COMPONENTS');
    for (n=0; n<this.components.length; n++) {
      component = this.components[n];
      MeteorChart.log('-- ' + component.id);

      if (component.init) {
        component.init();
      }
    }

    MeteorChart.log('3) RENDER AND ADD COMPONENTS');
    for (n=0; n<this.components.length; n++) {
      component = this.components[n];
      MeteorChart.log('-- ' + component.id);
      component._render();
      this.content.appendChild(component.content); 
    }
  };

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

  MeteorChart.prototype = {
    _decorateConf: function(conf) {
      var id = conf.id,
          component = this._components[id];

      if (component) {

        // decorate options 
        if (!conf.options) {
          conf.options = {};
        }

        if (component.options) {
          conf.options = MeteorChart.Util.merge(conf.options, component.options);
        }  

        // decorate data

        if (component.data) {
          conf.data = function() {
            return component.data;
          };
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
    add: function(component) {
      component.chart = this;
      component.build();
      component.update();
      this.content.appendChild(component.content); 
    },
    render: function() { 
      var components = this.components,
          len = components.length,
          n, component;

      for (n=0; n<len; n++) {
        components[n]._render();
      }
    }
  };

  MeteorChart.version = '@@version';
  MeteorChart.Components = {};
  MeteorChart.Formatters = {};
  MeteorChart.Layouts = {};
  MeteorChart.Themes = {};
  MeteorChart.Interactions = {};

  MeteorChart.Constants = {
    TYPOGRAPHIC_SCALE: 1.2
  };

  MeteorChart.log = function(obj) {
    console.log(obj);
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
