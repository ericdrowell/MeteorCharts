var MeteorChart;
(function() {
  MeteorChart = function(config) {
    var that = this,
        container = config.container,
        len, n, component;

    this._id = MeteorChart.idCounter++;
    this.attrs= {};
    this.container = MeteorChart.Util._isString(container) ? document.getElementById(container) : container;

    this.set('width', config.width);
    this.set('height', config.height);
    this.set('style', config.style);

    this.id = config.id;
    this.layout = MeteorChart.Layouts[config.layout];
    this.theme = MeteorChart.Themes[config.theme];

    this.slots = {};
    this.components = {};

    // build content container
    this.content = document.createElement('div');
    this.content.className = 'meteorchart-content';
    this.content.style.position = 'relative';
    this.content.style.overflow = 'hidden';
    this.content.style.opacity = 0;
    MeteorChart.DOM.addVendorStyle(this.content, 'transition', 'opacity 0.3s ease-in-out');
    this.container.appendChild(this.content);

    // initialize renderer dummies
    MeteorChart.DOM.dummy = MeteorChart.DOM.createElement('div');
    MeteorChart.DOM.dummy.style.display = 'inline-block';
    MeteorChart.DOM.dummy.className = 'dom-dummy';
    this.content.appendChild(MeteorChart.DOM.dummy);

    // init components
    for (n=0, len = config.components.length; n<len; n++) {
      component = config.components[n];

      // if slot is defined, merge component config with layout slot
      if (component.slot !== undefined) {
        that._initComponent(MeteorChart.Util._extend(this.layout[component.slot], component));
      }
      // if slot is not defined, go ahead and initialize the component but
      // set the opacity to 1
      else {
        (that._initComponent(component)).content.style.opacity = 0;
      }   
    }

    // add components to chart content
    for (n=0, len = config.components.length; n<len; n++) {
      that._addComponent(this.components[config.components[n].id]);
    }

    // store reference to this chart
    MeteorChart.charts.push(this);

    // need to delay chart render in order for the css transition
    // fade in to be applied
    setTimeout(function() {
      that._show();
    }, 50);

    that.render();
  };

  MeteorChart.prototype = {
    defaults: {
      style: function() {
        return {
          padding: this.theme.padding
        };
      }
    },
    _show: function() {
      // make component visible and trigger css transition
      this.content.style.opacity = 1;
    },
    _initComponent: function(conf) {
      MeteorChart.log('init ' + conf.id);

      // final decorations
      conf.chart = this;

      var component = new MeteorChart.Components[conf.type](conf);
      this.components[conf.id] = component;

      if (conf.slot !== undefined) {
        this.slots[conf.slot] = component;
      }

      return component;
    },
    _addComponent: function(component) {
      if (component.init) {
        component.init();
      }

      MeteorChart.log('add ' + component.id);
      this.content.appendChild(component.content);
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
      MeteorChart.log('render chart');

      var components = this.components,
          len = components.length,
          key, component;

      this.content.style.width = this.get('width') + 'px';
      this.content.style.height = this.get('height') + 'px';
      this.content.style.backgroundColor = this.theme.background;

      for (key in components) {
        components[key].render();
      }
    }
  };

  MeteorChart.version = '@@version';
  MeteorChart.Components = {};
  MeteorChart.Formatters = {};
  MeteorChart.Layouts = {};
  MeteorChart.Themes = {};

  // global properties
  MeteorChart.charts = [];
  MeteorChart.debug = false;
  MeteorChart.idCounter = 0;

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
    if (this.debug) {
      console.log('-- ' + str);
    }
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
