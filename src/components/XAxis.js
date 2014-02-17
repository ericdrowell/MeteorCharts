(function() {
  MeteorChart.Component.define('XAxis', {
    build: function() {
      var that = this,
          data = this.data(),
          options = this.options,
          formatter = new MeteorChart.Formatters[options.formatter](data.min, data.max, options.maxIncrements),
          min = data.min,
          max = data.max,
          diff = max - min,
          scale = this.width() / diff,
          x;

      formatter.each(function(n) {
        x = (n * scale) - min;
        that._addLabel(x, n);
      });  
    },
    _addLabel: function(x, n) {
      var mediumFont = this.chart.theme.background.fonts.medium;

      this.layer.add(new Kinetic.Text({
        x: x,
        text: n,
        fontFamily: mediumFont.fontFamily,
        fontSize: mediumFont.fontSize,
        fill: mediumFont.fill,
        stroke: mediumFont.stroke
      }));  
    },
    destroy: function() {

    }
  });
})();