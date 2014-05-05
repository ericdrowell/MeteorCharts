(function() {
  MeteorChart.Component = function(config) {
    this.attrs = {}; 
    this.cache = {};
    this.chart = config.chart;
    this.className = config.type;
    this.id = config.id;
    this.type = config.type;

    // layout bindings
    this.set('x', config.x);
    this.set('y', config.y);
    this.set('width', config.width);
    this.set('height', config.height);
    this.set('orientation', config.orientation);

    // app bindings
    this.set('data', config.data);
    this.set('style', config.style);

    // build content container
    this.content = document.createElement('div');
    this.content.className = 'component-content';
    this.content.setAttribute('data-component-type', this.type);
    this.content.setAttribute('data-component-id', this.id);
    this.content.style.display = 'inline-block';
    this.content.style.position = 'absolute';
  };

  MeteorChart.Component.prototype = {
    render: function() {
      var that = this;
      MeteorChart.Animation.queue(this.id, function() {
        //MeteorChart.log(this.id + ' render');

        // reset width and height so that they do not affect component
        // width and height methods
        that.content.style.width = 'auto';
        that.content.style.height = 'auto';

        // render concrete component first because the component width and height
        // may depend on it
        if (that._render) {
          that._render();
        }

        that.content.style.left = that.get('x');
        that.content.style.top = that.get('y');
        that.content.style.width = that.get('width')
        that.content.style.height = that.get('height');
      });
    },

    destroy: function() {

    },
    fire: function(event, obj) {
      var that = this;
      MeteorChart.Event.fire.call(this, MeteorChart.Util.merge({
          event: event,
          type: this.type,
          id: this.id
        }, 
        obj)
      );
    },
    set: function(attr, val) {
      var chart = this.chart, 
          deps = chart.deps,
          componentIds, key;

      if (val !== undefined) {
        this.attrs[attr] = val;

        // invalidate attr cache
        delete this.cache[attr];

        // render any components that are affected by this change
        if (deps[this.id] && deps[this.id][attr]) {
          componentIds = deps[this.id][attr];
          for (key in componentIds) {
            // TODO: cuurently invalidating entire cache because I don't know
            // which component attrs are dependent on this component.  There might
            // be a smater way to go about this.
            chart.components[key].cache = {};
            chart.components[key].render();
          }
        }
      }
    },
    get: function(attr, context) {
      var chart = this.chart,
          val = this.attrs[attr],
          ret;

      // add dependency
      if (context) {
        if (!chart.deps[this.id]) {
          chart.deps[this.id] = {};
        }

        if (!chart.deps[this.id][attr]) {
          chart.deps[this.id][attr] = {};
        }
        
        chart.deps[this.id][attr][context.id] = 1;
      }

      // if attr value is cached, immediately return it
      if (this.cache[attr] !== undefined) {
        return this.cache[attr];
      }

      // default
      if ((val === undefined || val === null) && this.defaults[attr] !== undefined) {
        val = this.defaults[attr];
      }

      // if val is a function then execute it to obtain the val
      if (MeteorChart.Util._isFunction(val)) {
        ret = val.call(this);
      }
      else {
        ret = val;
      }  

      // cache the new result
      this.cache[attr] = ret;

      return ret;
    },

    // render helpers
    /**
     * @param {Integer} [scaleFactor] can be -3, -2, -1, 0, 1, 2, etc.  -1, 0, and -1 and
     *   1 have the same result, and 0 defaults to 1.  If you want to double the padding
     *   scale, use 2.  If you want to triple it, use 3.  If you want to halve it, use -2
     */
    padding: function(scaleFactor) {
      var chart = this.chart,
          scale = MeteorChart.Util._getScale(MeteorChart.Constants.PADDING_SCALE, scaleFactor);

      return (this.style.padding || chart.style.padding || chart.theme.padding) * scale;
    }
  };

  MeteorChart.Component.extend = function(type, methods) {
    if (!methods.defaults) {
      methods.defaults = {};
    }

    if (!methods.defaults.style) {
      methods.defaults.style = {};
    }

    MeteorChart.Components[type] = function(config) {
      MeteorChart.Component.call(this, config);
    };

    MeteorChart.Components[type].prototype = methods;
    MeteorChart.Util.extend(MeteorChart.Components[type].prototype, MeteorChart.Component.prototype);
  };
})();