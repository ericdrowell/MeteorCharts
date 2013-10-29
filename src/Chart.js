(function() {
  // constants
  var LEFT = 'left',
      CENTER = 'center',
      AUTO = 'auto',
      EMPTY_STRING = '',
      TEXT = 'Text',
      SPACE = ' ',
      HOVERING = 'hovering',
      ZOOMING = 'zooming',
      PANNING = 'panning';

  MeteorCharts.Chart = function(config) {
    this._init(config);
  };

  MeteorCharts.Chart.prototype = {
    _init: function(config) {
      var that = this;

      this.model = config.model || {};
      this.view = config.view || {};
      this._view = new MeteorCharts.View(this);
      this.events = {};
      this._setState(HOVERING);

      // create stage
      this.stage = new Kinetic.Stage({
        container: config.container,
        listening: false,
        width: this._view.get('width'),
        height: this._view.get('height'),
      });

      this.stage.getContainer().style.display = 'inline-block';
      this.stage.getContent().setAttribute('role', 'presentation');

      // layers
      this.bottomLayer = new Kinetic.Layer({listening: false});
      this.dataLayer = new Kinetic.Layer({listening: false});
      this.topLayer = new Kinetic.Layer({listening: false});
      this.interactionLayer = new Kinetic.Layer({
        opacity: 0,
        listening: false
      });

      // description
      this.content = document.createElement('div');
      this.content.style.textIndent = '-999999px';
      this.content.style.position = 'absolute';

      // add meteor classes
      this.bottomLayer.getCanvas()._canvas.className = 'meteorcharts-bottom-layer';
      this.dataLayer.getCanvas()._canvas.className = 'meteorcharts-data-layer';
      this.topLayer.getCanvas()._canvas.className = 'meteorcharts-top-layer';
      this.interactionLayer.getCanvas()._canvas.className = 'meteorcharts-interaction-layer';
      this.content.className = 'meteorcharts-content';

      this.stage.add(this.bottomLayer);
      this.stage.add(this.dataLayer);
      this.stage.add(this.topLayer);
      this.stage.add(this.interactionLayer);

      this.stage.getContainer().insertBefore(this.content, this.stage.getContent());

      this.title = new MeteorCharts.Title(this);

      this.interactionShow = new Kinetic.Tween({
        node: that.interactionLayer,
        duration: 0.3,
        opacity: 1,
        easing: Kinetic.Easings.EaseInOut
      });

      this._bind();
      


    },
    batchDraw: function() {
      this.enableSeriesTween = false;
      this.stage.batchDraw();
    },
    draw: function() {
      this.enableSeriesTween = true;
      this.stage.draw();
      this.fire('draw');
    },
    getView: function() {
      return this._view;
    },
    showInteractionLayer: function() {
      this.interactionShow.play();
    },
    hideInteractionLayer: function() {
      this.interactionShow.reverse();
    },
    on: function(evt, handler) {
      if (!this.events[evt]) {
        this.events[evt] = [];
      }
      this.events[evt].push(handler);
    },
    fire: function(evt) {
      var events = this.events[evt],
          len, n;

      if (events) {
        len = events.length;
        for (n=0; n<len; n++) {
          events[n]();
        }
      }
    },
    _setState: function(state) {
      this.state = state;
      this.fire('stateChange');
    },
    _getContent: function() {
      return '';
    },
    _addContent: function() {
      this.content.innerHTML = this._getContent();
    },
    _bind: function() {
      var stage = this.stage,
          that = this,
          keydown = false;

        // manage keydown / up
      document.body.addEventListener('keydown', function(evt) {
        keydown = true;
      });

      document.body.addEventListener('keyup', function(evt) {
        keydown = false;
      });

      stage.on('contentTouchstart contentTouchend contentTouchmove', function(evt) {
        evt.preventDefault();
      });

      // mouse events
      stage.on('contentMousedown', function() {
        switch (that.state) {
          case HOVERING:
            if (keydown) {
              that._setState(PANNING);
            }
            else {
              that._setState(ZOOMING);
            }
          case ZOOMING:
            that.zoom._startZoomSelect();

        }
      });

      stage.on('contentMousemove contentTouchmove contentTouchstart', function() {
        switch(that.state) {
          case HOVERING:
            that.pointerMove(); 
            break;
          case ZOOMING:
            that.tooltip.group.hide();
            that.connector.group.hide();
            that.zoom._resizeZoomSelect();
            break;
          case PANNING:
            that._pan();
            that.tooltip.group.hide();
            that.connector.group.hide();
            break;
        }

        that.lastPos = stage.getPointerPosition();
        that.interactionLayer.batchDraw();
      });

      stage.on('contentMouseup', function() {
        switch(that.state) {
          case ZOOMING:
            that.zoom._endZoomSelect();
            that._setState(HOVERING);
            that.tooltip.group.show();
            that.connector.group.show();
            break;
          case PANNING:
            that._setState(HOVERING);
            that.tooltip.group.show();
            that.connector.group.show();
            stage.draw();
            that.fire('draw');
            break;
        }
      });

      stage.on('contentMouseover contentTouchstart', function() {
        that.showInteractionLayer();
      });

      stage.on('contentMouseout contentTouchend', function() {
        that.hideInteractionLayer();
      });


      // bind before draw event to bottom layer because this is the
      // first layer in the stage that's drawn.  the _draw() method needs to 
      // execute immediately before drawing any of the stage layers
      this.bottomLayer.on('beforeDraw', function() {
        that._draw();
      });

      this.on('stateChange', function() {
        switch(that.state) {
          case HOVERING:
            //that.enableSeriesTween = true;
            break;
          case PANNING:
            //that.enableSeriesTween = false;
            break;
          case ZOOMING:
            //that.enableSeriesTween = true;
            break;
          default:
            //that.enableSeriesTween = true;
            break;
        }
      });
    }
  };
})();