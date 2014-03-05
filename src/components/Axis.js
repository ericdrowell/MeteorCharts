(function() {
  MeteorChart.Component.define('Axis', {
    init: function() {
      this.orientation = this.options.orientation || 'horizontal';

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

      this.maxWidth = 0;
      this.maxHeight = 0;

      formatter.each(function(n, val) {
        offset = n * increment * scale;
        that._addLabel(offset, val);
      });  

      // this.width(function() {
      //   return that.maxWidth;
      // });

      // this.height(function() {
      //   return that.maxHeight;
      // });
    },
    _addLabel: function(offset, val) {
      var theme = this.chart.theme(),
          font = theme.font,
          orientation = this.orientation,
          text;

      text = new Kinetic.Text({
        x: orientation === 'horizontal' ? offset : 0,
        y: orientation === 'vertical' ? this.height() - offset : 0,
        text: this.formatter.short(val),
        fontFamily: font.family,
        fontSize: font.size,
        fill: theme.secondary
      });
          
      this.layer.add(text);  

      this.labelOffsets.push(offset);

      this.maxWidth = Math.max(this.maxWidth, text.width());
      this.maxHeight = Math.max(this.maxHeight, text.height());


    },
    destroy: function() {

    }
  });
})();