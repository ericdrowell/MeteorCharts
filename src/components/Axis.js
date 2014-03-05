(function() {
  MeteorChart.Component.define('Axis', {
    init: function() {
      var data = this.data();
      this.formatter = new MeteorChart.Formatters[data.unit || 'Number'](data.min, data.max, 5);
    },
    build: function() {
      var that = this,
          chart = this.chart,
          data = this.data(),
          min = data.min,
          max = data.max,
          diff = max - min,
          scale = (this.options.orientation === 'vertical' ? this.height() : this.width()) / diff,
          offset = 0,
          increment = this.formatter.increment;

      this.labelOffsets = [];
      this.layer.enableHitGraph(false);

      this.formatter.each(function(n, val) {
        offset = n * increment * scale;
        that._addLabel(offset, val);
      });  
    },
    _createText: function(text) {
      var theme = this.chart.theme(),
          font = theme.font;

      return new Kinetic.Text({
        text: this.formatter.short(text),
        fontFamily: font.family,
        fontSize: font.size,
        fill: theme.secondary
      })
    },
    _addLabel: function(offset, val) {
      var text = this._createText(val);

      if (this.options.orientation === 'vertical') {
        text.y(offset);
      }
      else {
        text.x(offset);
      }
  
      this.layer.add(text);  
      this.labelOffsets.push(offset);
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Axis, 'width', function() {
    var that = this;
        maxWidth = 0;

    this.formatter.each(function(n, val) {
      var textWidth = that._createText(val).width();
      maxWidth = Math.max(maxWidth, textWidth);
    });  

    return maxWidth;
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Axis, 'height', function() {
    var that = this;
        maxHeight = 0;

    this.formatter.each(function(n, val) {
      var textHeight = that._createText(val).height();
      maxHeight = Math.max(maxHeight, textHeight);
    });  

    return maxHeight;
  });

})();