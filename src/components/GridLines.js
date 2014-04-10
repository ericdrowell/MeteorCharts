(function() {
  MeteorChart.Component.extend('GridLines', {
    build: function() {
      this.orientation = this.options.orientation || 'horizontal';

      var data = this.data(),
          len = data.length,
          n;

      for (n=0; n<len; n++) {
        this._addLine(data[n]);
      }
    },
    _addLine: function(offset) {
      var data = this.data(),
          points;

      if (this.orientation === 'horizontal') {
        points = [0, offset, this.width(), offset];
      }
      else {
        points = [offset, 0, offset, this.height()]
      } 

      this.layer.add(new Kinetic.Line({
        points: points,
        stroke: MeteorChart.Util.hexToRgba(this.chart.theme.secondary, 0.2),
        strokeWidth: this.options.lineWidth
      }));
    }
  });
})();