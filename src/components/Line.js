(function() {
  MeteorChart.Components.Line = function(config) {
    this.className = 'Line';
    MeteorChart.Component.call(this, config);
  };

  MeteorChart.Components.Line.prototype = {
    build: function() {
      var data = this.data(),
          len = data.length,
          n, line, series;

      // disable hit graph to improve draw performance since
      // we won't bee needing it
      this.layer.enableHitGraph(false);
      this.minX = Infinity;
      this.maxX = -1 * Infinity;
      this.minY = Infinity;
      this.maxY = -1 * Infinity;

      for (n=0; n<len; n++) {
        series = data[n].series;

        this.layer.add(new Kinetic.Line({
          points: series,
          stroke: this.getDataColor(n),
          y: this.height(),
          strokeScaleEnabled: false
        }));

        this._updateMinMax(series);
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
    _updateMinMax: function(series) {
      var len = series.length,
          n, x, y;

      for (n=0; n<len; n+=2) {
        x = series[n];
        y = series[n+1];
        this.minX = Math.min(this.minX, x);
        this.maxX = Math.max(this.maxX, x);
        this.minY = Math.min(this.minY, y);
        this.maxY = Math.max(this.maxY, y);
      }
    }
  };

  Kinetic.Util.extend(MeteorChart.Components.Line, MeteorChart.Component);


})();