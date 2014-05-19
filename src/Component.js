(function() {
  var PX = 'px';

  var ATTR_BLACKLIST = {
    'id': 1,
    'type': 1,
    'chart': 1
  };

  MeteorChart.Component = function(config) {
    var key;

    this._id = MeteorChart.idCounter++;
    this.attrs = {};
    this.chart = config.chart;
    this.className = config.type;
    this.id = config.id;
    this.type = config.type;

    // set attrs
    for (key in config) {
      if (!ATTR_BLACKLIST[key]) {
        this.set(key, config[key]);
      }
    }

    // build content container
    this.content = document.createElement('div');
    this.content.className = 'component-content';
    this.content.setAttribute('data-component-type', this.type);
    this.content.setAttribute('data-component-id', this.id);
    this.content.style.display = 'inline-block';
    this.content.style.position = 'absolute';
    this.content.style.opacity = 0;

    MeteorChart.Dom.addVendorStyle(this.content, 'transition', 'opacity 0.3s ease-in-out');
    //this.content.style.WebkitTransition = 'opacity 1s';
  };

  MeteorChart.Component.prototype = {
    render: function() {
      var that = this;

      // make component visible and trigger css transition
      that.content.style.opacity = 1;

      MeteorChart.Renderer.queue(this.chart._id + '-' + this._id, function() {
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

        that.content.style.left =   that.get('x') + PX;
        that.content.style.top =    that.get('y') + PX;
        that.content.style.width =  that.get('width') + PX;
        that.content.style.height = that.get('height') + PX;
      });
    },

    destroy: function() {

    },
    hide: function() {
      this.content.style.opacity = 0;
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
      if (val !== undefined) {
        this.attrs[attr] = val;
      }
    },
    get: function(attr, context) {
      var val = this.attrs[attr],
          ret;

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

      // auto round x, y, width, and height values because these should
      // resolve to integer pixels

      if (attr === 'x' 
       || attr === 'y'
       || attr === 'width'
       || attr === 'height') {
        ret = Math.round(ret);
      }
 


      return ret;
    },


    /**
     * @param {Integer} [factor] can be -2, -1, 0, 1, 2, or 3.  0 is the base value.
     * bigger numbers are larger font sizes, and smaller numbers are smaller font sizes
     */
    fontSize: function(power) {
      if (power === undefined) {
        power = 0;
      }
      return Math.round(this.chart.theme.fontSize * Math.pow(MeteorChart.Constants.TYPOGRAPHIC_SCALE, power));
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