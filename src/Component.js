(function() {
  var DOM = MeteorChart.DOM,
      PX = 'px';

  var ATTR_BLACKLIST = {
    'id': 1,
    'type': 1,
    'chart': 1,
    'slot': 1,
    'on': 1
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
    DOM.addVendorStyle(this.content, 'transition', 'all 0.2s ease-in-out');

    // build description container
    if (this.getDescription) {
      this.description = document.createElement('li');
      this.chart.description.appendChild(this.description);
    }

    this.__bind(config.on);
  };

  MeteorChart.Component.prototype = {
    defaults: {
      align: 'left',
      style: {},
      visible: true
    },
    render: function() {
      var that = this;

      // only add render to renderer queue if visible
      if (this.get('visible')) {
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

          if (that.getDescription) {
            that.description.innerHTML = that.getDescription();
          }
    
        });
      }
    },

    destroy: function() {

    },
    getDataColor: function(n) {
      var colors = this.chart.theme.data;
      return colors[n % colors.length];
    },
    show: function() {
      this.content.style.opacity = 1;
    },
    hide: function() {
      this.content.style.opacity = 0;
    },
    _getScale: function() {
      var viewport = this.get('viewport'),
          width = this.get('width'),
          height = this.get('height'),
          diffX = viewport.maxX - viewport.minX,
          diffY = viewport.maxY - viewport.minY;

      return {
        x: width / diffX,
        y: height / diffY
      };
    },
    __bind: function(on) {
      var that = this,
          key;

      for (key in on) {
        this.on(key, on[key]);
      }

      this.content.addEventListener('mouseover', MeteorChart.Util._throttle(function(evt) {
        that.fire('mouseover');
      }, 17), false);

      this.content.addEventListener('mouseout', MeteorChart.Util._throttle(function(evt) {
        that.fire('mouseout');
      }, 17), false);
    },
    getContentPosition: function() {
      return DOM.getElementPosition(this.content);
    }
  };

  MeteorChart.Component.extend = function(type, methods) {
    MeteorChart.Components[type] = function(config) {
      MeteorChart.Component.call(this, config);
    };

    MeteorChart.Components[type].prototype = MeteorChart.Util._extend(methods, MeteorChart.Component.prototype);
  };
})();