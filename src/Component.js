(function() {
  MeteorChart.Component = function(config) {
    this.attrs = {};
    this.chart = config.chart;
    this.className = config.type;
    this.id = config.id;
    this.type = config.type;
    this.dependencies = config.dependencies || {};

    // binding functions
    this.x(config.x);
    this.y(config.y);
    this.width(config.width);
    this.height(config.height);
    this.data(config.data);
    this.style(config.style);

    // cache
    this.cache = {
      x: null,
      y: null,
      width: null,
      height: null,
      data: null,
      style: null
    };

    // build content container
    this.content = document.createElement('div');
    this.content.className = 'component-content';
    this.content.setAttribute('data-component-type', this.type);
    this.content.setAttribute('data-component-id', this.id);
    this.content.style.display = 'inline-block';
    this.content.style.position = 'absolute';
  };

  MeteorChart.Component.prototype = {
    _render: function() {
      var state = {
        x: this.x(),
        y: this.y(),
        width: this.width(),
        height: this.height(),
        data: this.data(),
        style: this.style()
      };

      if (!MeteorChart.Util.isEqual(this.cache, state)) {
        
        // reset width and height so that they do not affect component
        // width and height methods
        this.content.style.width = 'auto';
        this.content.style.height = 'auto';

        // render concrete component first because the component width and height
        // may depend on it
        if (this.render) {
          this.render();
        }

        this.content.style.left = this.x();
        this.content.style.top = this.y();
        this.content.style.width = this.width();
        this.content.style.height = this.height();

        //MeteorChart.log('-- ' + this.id + ' rendered ');

        // set cache to current state
        this.cache = state;

        // did not use cache
        return false;
      }
      else {
        //MeteorChart.log('-- ' + this.id + ' state is the same ');

        // used cache
        return true;
      }


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
      obj));
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

      return (this.style().padding || chart.style().padding || chart.theme.padding) * scale;
    }
  };

  MeteorChart.Component.extend = function(type, methods) {
    MeteorChart.Components[type] = function(config) {
      MeteorChart.Component.call(this, config);
    };

    MeteorChart.Components[type].prototype = methods;
    MeteorChart.Util.extend(MeteorChart.Components[type], MeteorChart.Component);
  };

  // getters setters
  MeteorChart.Util.addMethod(MeteorChart.Component, 'x', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'y', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'width', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'height', 0);
  MeteorChart.Util.addMethod(MeteorChart.Component, 'data');
  MeteorChart.Util.addMethod(MeteorChart.Component, 'style', function() {return {};});
})();