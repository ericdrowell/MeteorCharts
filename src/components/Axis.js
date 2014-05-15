(function() {
  MeteorChart.Component.extend('Axis', {
    defaults: {
      width: function() {
        var that = this,
            maxWidth = 0;

        return 50;
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
          data = this.get('data'),
          style = this.get('style'),
          min = data.min,
          max = data.max,
          diff = max - min,
          scale = (this.get('orientation') === 'vertical' ? this.get('height') : this.get('width')) / diff,
          increment = style.increment,
          val = this._getFirstValue(),
          offset = (val - min) * scale;

      this.innerContent.innerHTML = '';

      that._addLabel(offset, val);
      val += increment;

      while (val <= max) {
        offset += increment * scale;
        that._addLabel(offset, val);
        val += increment;
      }
    },
    _getFirstValue: function() {
      var data = this.get('data'),
          style = this.get('style'),
          min = data.min,
          increment = style.increment;

      if (min % increment === 0) {
        return min
      }
      else {
        return min - (min % increment) + increment;
      }
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

      if (this.get('orientation') === 'vertical') {
        text.style.top = this.get('height') - offset - (MeteorChart.Dom.getTextHeight(val) /2);
        text.style.left = 0;
      }
      // horizontal
      else {
        text.style.top = 0;
        text.style.left = offset - (MeteorChart.Dom.getTextWidth(val)/2); 
      }
  
      //this.set('labelOffsets', this.attrs.labelOffsets.concat([offset]));

    }
  });
})();