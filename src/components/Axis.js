(function() {
  MeteorChart.Component.extend('Axis', {
    init: function() {
      var data = this.data(),
          options = this.options;

      this.innerContent = MeteorChart.Util.createElement('div');
      this.innerContent.style.position = 'relative';

      this.content.appendChild(this.innerContent);
          
      this.formatter = new MeteorChart.Formatters[options.unit || 'Number'](data.min, data.max, this.options.maxNumLabels || 5);
    },
    _render: function() {
      var that = this,
          chart = this.chart,
          data = this.data(),
          min = data.min,
          max = data.max,
          diff = max - min,
          scale = (this.options.orientation === 'vertical' ? this.height() : this.width()) / diff,
          offset = 0,
          increment = this.formatter.increment;

      this.innerContent.innerHTML = '';

      this.labelOffsets = [];

      this.formatter.each(function(n, val) {
        offset = n * increment * scale;
        that._addLabel(offset, val);
      });  
    },
    _addLabel: function(offset, val) {
      var theme = this.chart.theme,
          font = theme.font,
          text;

      text = MeteorChart.Util.createElement('span');
      text.innerHTML = val;
      text.style.position = 'absolute';
      text.style.fontSize = font.size;
      text.style.fontFamily = font.family;
      text.style.color = theme.secondary;
      this.innerContent.appendChild(text);

      if (this.options.orientation === 'vertical') {
        text.style.top = this.height() - offset - (text.clientHeight/2);
        text.style.left = 0;
      }
      // horizontal
      else {
        text.style.top = 0;
        text.style.left = offset - (text.clientWidth/2); 
      }

      
      this.labelOffsets.push(offset);
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Axis, 'width', function() {
    return 50; 
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Axis, 'height', function() {
    return this.chart.theme.font.size;
  });

})();