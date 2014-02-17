(function() {
  MeteorChart.Component.define('Line', {
    build: function() {
      var data = this.data(),
          len = data.length,
          n, line, points;

      // disable hit graph to improve draw performance since
      // we won't bee needing it
      this.layer.enableHitGraph(false);
      this.minX = Infinity;
      this.maxX = -1 * Infinity;
      this.minY = Infinity;
      this.maxY = -1 * Infinity;

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