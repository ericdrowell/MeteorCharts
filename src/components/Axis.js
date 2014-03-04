(function() {
  MeteorChart.Component.define('Axis', {
    init: function() {
      this.orientation = this.options.orientation || 'horizontal';
    },
    build: function() {
      var that = this,
          chart = this.chart,
          data = this.data(),
          formatter = new MeteorChart.Formatters[data.unit || 'Number'](data.min, data.max, 5),
          min = data.min,
          max = data.max,
          diff = max - min,
          orientation = this.orientation,
          scale = (orientation === 'horizontal' ? this.width() : this.height()) / diff,
          offset = 0,
          increment = formatter.increment;

      this.labelOffsets = [];
      this.formatter = formatter;

      this.layer.enableHitGraph(false);

      formatter.each(function(n, val) {
        offset = n * increment * scale;
        that._addLabel(offset, val);
      });  
    },
    _addLabel: function(offset, val) {
      var theme = this.chart.theme(),
          font = theme.font,
          orientation = this.orientation;
          
      this.layer.add(new Kinetic.Text({
        x: orientation === 'horizontal' ? offset : 0,
        y: orientation === 'vertical' ? this.height() - offset : 0,
        text: this.formatter.short(val),
        fontFamily: font.family,
        fontSize: font.size,
        fill: theme.secondary
      }));  

      this.labelOffsets.push(offset);
    },
    destroy: function() {

    }
  });
})();