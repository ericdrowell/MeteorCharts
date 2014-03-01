(function() {
  MeteorChart.Component.define('Line', {
    init: function() {
      this.minX = Infinity;
      this.minY = Infinity;
      this.maxX = -1 * Infinity;
      this.maxY = -1 * Infinity;
    },
    bind: function() {
      var that = this,
          stage = this.chart.stage;

      stage.on('contentMouseover contentMousemove', function() {
        var pos = stage.getPointerPosition();

        //console.log(pos.x)
        if (pos) {
          that.selected = {};

          that.changed();
        }
      });

      stage.on('contentMouseout', function() {
        //console.log(stage.getPointerPosition());
        that.selected = {};
        that.changed();
      });
    },
    build: function() {
      var data = this.data(),
          series = data.series,
          len = series.length,
          n, line, points;

      // disable hit graph to improve draw performance since
      // we won't bee needing it
      this.layer.enableHitGraph(false);

      for (n=0; n<len; n++) {
        points = series[n].points;

        this.layer.add(new Kinetic.Line({
          points: points,
          stroke: this.getDataColor(n),
          y: this.height(),
          strokeScaleEnabled: false
        }));

        this._updateMinMax(points);
      }

      this._scale();

      this.changed();
    },
    destroy: function() {

    },
    _scale: function() {
      var x = this.x(),
          y = this.y(),
          width = this.width(),
          height = this.height(),
          minX = this.minX,
          maxX = this.maxX,
          minY = this.minY,
          maxY = this.maxY,
          diffX = maxX - minX,
          diffY = maxY - minY,
          scaleX = width / diffX,
          scaleY = height / diffY;

      //debugger;

      this.layer.getChildren().setAttrs({
        offsetX: minX,
        offsetY: minY,
        scaleX: scaleX,
        scaleY: -1 * scaleY
      });
    },
    _updateMinMax: function(points) {
      var len = points.length,
          n, x, y;

      for (n=0; n<len; n+=2) {
        x = points[n];
        y = points[n+1];
        this.minX = Math.min(this.minX, x);
        this.maxX = Math.max(this.maxX, x);
        this.minY = Math.min(this.minY, y);
        this.maxY = Math.max(this.maxY, y);
      }
    }
  });
})();