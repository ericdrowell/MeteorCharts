(function() {
  MeteorChart.Component.extend('Axis', {
    init: function() {
      this.innerContent = MeteorChart.Dom.createElement('div');
      this.innerContent.style.position = 'relative';
      this.content.appendChild(this.innerContent);
    },
    render: function() {
      var that = this,
          chart = this.chart,
          data = this.data(),
          style = this.style(),
          min = data.min,
          max = data.max,
          diff = max - min,
          scale = (style.orientation === 'vertical' ? this.height() : this.width()) / diff,
          offset = 0,
          formatter = new MeteorChart.Formatters[style.unit || 'Number'](data.min, data.max, style.maxNumLabels || 5),
          increment = formatter.increment;

      this.innerContent.innerHTML = '';

      this.labelOffsets = [];

      formatter.each(function(n, val) {
        offset = n * increment * scale;
        that._addLabel(offset, val);
      });  

      this.fire('labelOffsetsChange', {
        labelOffsets: this.labelOffsets
      });
    },
    _addLabel: function(offset, val) {
      var theme = this.chart.theme,
          text;

      text = MeteorChart.Dom.createElement('span');
      text.innerHTML = val;
      text.style.position = 'absolute';
      text.style.fontSize = theme.fontSize;
      text.style.fontFamily = theme.fontFamily;
      text.style.color = theme.primary;
      this.innerContent.appendChild(text);

      if (this.style().orientation === 'vertical') {
        text.style.top = this.height() - offset - (MeteorChart.Dom.getTextHeight(val) /2);
        text.style.left = 0;
      }
      // horizontal
      else {
        text.style.top = 0;
        text.style.left = offset - (MeteorChart.Dom.getTextWidth(val)/2); 
      }
  
      this.labelOffsets.push(offset);
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Axis, 'width', function() {
    return 50; 
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Axis, 'height', function() {
    return this.chart.theme.fontSize;
  });

})();