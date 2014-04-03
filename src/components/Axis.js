(function() {
  MeteorChart.Component.define('Axis', {
    init: function() {
      var data = this.data(),
          options = this.options;
          
      this.formatter = new MeteorChart.Formatters[options.unit || 'Number'](data.min, data.max, this.options.maxNumLabels || 5);
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
      var theme = this.chart.theme,
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
        text.y(this.height() - offset - (text.height() / 2));
      }
      else {
        text.x(offset - (text.width() / 2)); 
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
    return this.chart.theme.font.size;
  });

})();