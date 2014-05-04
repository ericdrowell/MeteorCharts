(function() {
  MeteorChart.Component.extend('Axis', {
    defaults: {
      width: function() {
        var that = this,
            maxWidth = 0,
            formatter = this._getFormatter();

        formatter.each(function(n, val) {
          maxWidth = Math.max(maxWidth, MeteorChart.Dom.getElementWidth(that._getLabel(val)));
        }); 

        return maxWidth; 
      },
      height: function() {
        return this.chart.theme.fontSize;
      }
    },
    init: function() {
      this.innerContent = MeteorChart.Dom.createElement('div');
      this.innerContent.style.position = 'relative';
      this.content.appendChild(this.innerContent);
    },
    _render: function() {
      var that = this,
          chart = this.chart,
          data = this.get('data', this),
          style = this.get('style', this),
          min = data.min,
          max = data.max,
          diff = max - min,
          scale = (this.get('orientation', this) === 'vertical' ? this.get('height') : this.get('width')) / diff,
          offset = 0,
          formatter = this._getFormatter(),
          increment = formatter.increment;

      this.innerContent.innerHTML = '';

      this.set('labelOffsets', []);

      formatter.each(function(n, val) {
        offset = n * increment * scale;
        that._addLabel(offset, val);
      });  
    },
    _getFormatter: function() {
      var data = this.get('data', this),
          style = this.get('style', this);

      return new MeteorChart.Formatters[style.unit || 'Number'](data.min, data.max, style.maxNumLabels || 5)
    },
    _getLabel: function(val) {
      var theme = this.chart.theme,
          text = MeteorChart.Dom.createElement('span');

      text.innerHTML = val;
      text.style.position = 'absolute';
      text.style.fontSize = theme.fontSize;
      text.style.fontFamily = theme.fontFamily;
      text.style.color = theme.primary;
      
      return text;
    },
    _addLabel: function(offset, val) {
      var text = this._getLabel(val);

      this.innerContent.appendChild(text);

      if (this.get('orientation', this) === 'vertical') {
        text.style.top = this.get('height') - offset - (MeteorChart.Dom.getTextHeight(val) /2);
        text.style.left = 0;
      }
      // horizontal
      else {
        text.style.top = 0;
        text.style.left = offset - (MeteorChart.Dom.getTextWidth(val)/2); 
      }
  
      this.set('labelOffsets', this.attrs.labelOffsets.concat([offset]));

    }
  });
})();