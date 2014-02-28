(function() {
  MeteorChart.Component.define('Line', {
    init: function() {
      this.state = {
        minX: Infinity,
        minY: Infinity,
        maxX: -1 * Infinity,
        maxY: -1 * Infinity,
        focusedElement: {
          x: 0,
          y: 0,
          data: {}
        }
      };
    },
    bind: function() {
      var that = this,
          stage = this.chart.stage;

      stage.on('contentMousemove', function() {
        var pos = stage.getPointerPosition();

        that.state.focusedElement = {
          x: pos.x,
          y: pos.y,
          data: {}
        };

        that.update();
      });
    },
    build: function() {
      var data = this.data(),
          len = data.length,
          n, line, points;

      // disable hit graph to improve draw performance since
      // we won't bee needing it
      this.layer.enableHitGraph(false);

      for (n=0; n<len; n++) {
        points = data[n].points;

        this.layer.add(new Kinetic.Line({
          points: points,
          stroke: this.getDataColor(n),
          y: this.height(),
          strokeScaleEnabled: false
        }));

        this._updateMinMax(points);
      }

      this._scale();

      this.update();
    },
    destroy: function() {

    },
    _scale: function() {
      var x = this.x(),
          y = this.y(),
          width = this.width(),
          height = this.height(),
          state = this.state,
          minX = state.minX,
          maxX = state.maxX,
          minY = state.minY,
          maxY = state.maxY,
          diffX = maxX - minX,
          diffY = maxY - minY,
          scaleX = width / diffX,
          scaleY = height / diffY;

      this.layer.getChildren().setAttrs({
        offsetX: minX,
        offsetY: minY,
        scaleX: scaleX,
        scaleY: -1 * scaleY
      });
    },
    _updateMinMax: function(points) {
      var len = points.length,
          state = this.state,
          n, x, y;

      for (n=0; n<len; n+=2) {
        x = points[n];
        y = points[n+1];
        state.minX = Math.min(state.minX, x);
        state.maxX = Math.max(state.maxX, x);
        state.minY = Math.min(state.minY, y);
        state.maxY = Math.max(state.maxY, y);
      }
    }
  });
})();