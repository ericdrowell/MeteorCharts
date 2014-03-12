(function() {
  MeteorChart.Component.define('Line', {
    build: function() {
      var data = this.data(),
          unit = data.unit || {},
          series = data.series,
          len = series.length,
          n, line, points, viewport;

      // disable hit graph to improve draw performance since
      // we won't bee needing it
      this.layer.enableHitGraph(false);

      for (n=0; n<len; n++) {
        points = series[n].points;

        this.layer.add(new Kinetic.Line({
          points: points,
          stroke: this.getDataColor(n),
          y: this.height(),
          strokeScaleEnabled: false,
          lineJoin: 'round'
        }));
      }

      viewport = MeteorChart.Util.getSeriesMinMax(series);
      this.minX = viewport.minX;
      this.minY = viewport.minY;
      this.maxX = viewport.maxX;
      this.maxY = viewport.maxY;

      this.formatterX = new MeteorChart.Formatters[unit.x || 'Number'](this.minX, this.minY);
      this.formatterY = new MeteorChart.Formatters[unit.y || 'Number'](this.maxX, this.maxY);

      this._scale();
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

      this.scaleX = scaleX;
      this.scaleY = scaleY;

      this.layer.getChildren().setAttrs({
        offsetX: minX,
        offsetY: minY,
        scaleX: scaleX,
        scaleY: -1 * scaleY
      });
    }
  });
})();