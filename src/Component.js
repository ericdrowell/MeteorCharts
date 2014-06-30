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
  };

  MeteorChart.Component.prototype = {
    defaults: {
      align: 'left',
      style: {}
    },
    render: function() {
      var that = this;

      MeteorChart.Renderer.queue(this.chart._id + '-' + this._id, function() {
        MeteorChart.log('render ' + that.id);

        // reset width and height so that they do not affect component
        // width and height methods
        that.content.style.width = 'auto';
        that.content.style.height = 'auto';

        // render concrete component first because the component width and height
        // may depend on it
        if (that._render) {
          that._render();
        }

        that.content.style.textAlign = that.get('align');
        that.content.style.left =      that.get('x') + PX;
        that.content.style.top =       that.get('y') + PX;
        that.content.style.width =     that.get('width') + PX;
        that.content.style.height =    that.get('height') + PX;
      });
    },

    destroy: function() {

    },
    getDataColor: function(n) {
      var colors = this.chart.theme.data;
      return colors[n % colors.length];
    },
    hide: function() {
      this.content.style.opacity = 0;
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
    MeteorChart.Components[type] = function(config) {
      MeteorChart.Component.call(this, config);
    };

    MeteorChart.Components[type].prototype = MeteorChart.Util._extend(methods, MeteorChart.Component.prototype);
  };
})();