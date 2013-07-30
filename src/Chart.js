(function() {
  // constants
  var LEFT = 'left',
      CENTER = 'center',
      AUTO = 'auto',
      EMPTY_STRING = '',
      TEXT = 'Text',
      SPACE = ' ',
      MOUSEMOVE = 'mousemove',
      MOUSEOUT = 'mouseout',
      MOUSEOVER = 'mouseover',
      TOUCHMOVE = 'touchmove',
      TOUCHSTART = 'touchstart',
      TOUCHEND = 'touchend',
      MOUSEDOWN = 'mousedown',
      MOUSEMOVE = 'mousemove',
      MOUSEUP = 'mouseup',
      HOVERING = 'hovering',
      ZOOMING = 'zooming',
      PANNING = 'panning';

  Meteor.Chart = function(config) {
    this._init(config);
  };

  Meteor.Chart.prototype = {
    _init: function(config) {
      var that = this;

      this.model = config.model;
      this.view = config.view;
      this.events = {};

      // create stage
      this.stage = new Kinetic.Stage({
        container: config.container,
        listening: false,
        width: this.view.width,
        height: this.view.height
      });

      this.stage.getContainer().style.display = 'inline-block';

      // layers
      this.bottomLayer = new Kinetic.Layer({listening: false});
      this.dataLayer = new Kinetic.Layer({listening: false});
      this.interactionLayer = new Kinetic.Layer({
        opacity: 0,
        listening: false
      });
      this.topLayer = new Kinetic.Layer({listening: false});

      // add meteor classes
      this.bottomLayer.getCanvas().getElement().className = 'meteorcharts-bottom-layer';
      this.dataLayer.getCanvas().getElement().className = 'meteorcharts-data-layer';
      this.topLayer.getCanvas().getElement().className = 'meteorcharts-top-layer';
      this.interactionLayer.getCanvas().getElement().className = 'meteorcharts-interaction-layer';

      this.stage.add(this.bottomLayer);
      this.stage.add(this.dataLayer);
      this.stage.add(this.topLayer);
      this.stage.add(this.interactionLayer);

      this.title = new Meteor.Title(this);

      this.interactionShow = new Kinetic.Tween({
        node: that.interactionLayer,
        duration: 0.3,
        opacity: 1,
        easing: Kinetic.Easings.EaseInOut
      });

      this._bind();
    },
    batchDraw: function() {
      this._draw();
      this.stage.batchDraw();
    },
    draw: function() {
      this._draw();
      this.stage.draw();
      this.fire('draw');
    },
    showInteractionLayer: function() {
      this.interactionShow.play();
      this.interactionLayer.setOpacity(1);
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
    _bind: function() {
      var stage = this.stage,
          that = this,
          keydown = false,
          state = HOVERING;

        // manage keydown / up
      document.body.addEventListener('keydown', function(evt) {
        keydown = true;
      });

      document.body.addEventListener('keyup', function(evt) {
        keydown = false;
      });

      // mouse events
      stage.on(MOUSEDOWN, function() {
        switch (state) {
          case HOVERING:
            if (keydown) {
              state = PANNING;
            }
            else {
              state = ZOOMING;
            }
          case ZOOMING:
            that.zoom._startZoomSelect();

        }
      });

      stage.on(MOUSEMOVE, function() {
        switch(state) {
          case HOVERING:
            that.pointerMove(); break;
          case ZOOMING:
            that.tooltip.group.hide();
            that.zoom._resizeZoomSelect();
            break;
          case PANNING:
            that._pan();
            that.tooltip.group.hide();
            break;
        }

        that.lastPos = stage.getPointerPosition();
        that.interactionLayer.batchDraw();
      });

      stage.on(MOUSEUP, function() {
        switch(state) {
          case ZOOMING:
            that.zoom._endZoomSelect();
            state = HOVERING;
            that.tooltip.group.show();
            break;
          case PANNING:
            state = HOVERING;
            that.tooltip.group.show();
            stage.draw();
            that.fire('draw');
            break;
        }
      });

      stage.on(MOUSEOVER, function(evt) {
        if (!evt.targetNode) {
          that.showInteractionLayer();
        }
      });

      stage.on(MOUSEOUT, function(evt) {
        if (!evt.targetNode) {
          that.hideInteractionLayer();
        }
      });

      // touch events
      stage.on(TOUCHSTART, function() {
        that.showInteractionLayer();
      });

      stage.on(TOUCHEND, function() {
        that.hideInteractionLayer();
      });
    }
  };
})();