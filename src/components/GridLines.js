(function() {
  MeteorChart.Component.define('GridLines', {
    init: function() {
      this.orientation = this.options.orientation || 'horizontal';
    },
    build: function() {
      var data = this.data(),
          len = data.length,
          n;

      for (n=0; n<len; n++) {
        this._addLine(data[n]);
      }
    },
    _addLine: function(offset) {
      var data = this.data();

      this.layer.add(new Kinetic.Line({
        points: [offset, 0, offset, this.height()],
        stroke: this.chart.theme().ternary,
        strokeWidth: this.options.lineWidth
      }));
    },
    destroy: function() {

    }
  });
})();