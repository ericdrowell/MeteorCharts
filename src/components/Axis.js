(function() {
  var PX = 'px';
  MeteorChart.Component.extend('Axis', {
    defaults: {
      width: function() {
        var that = this,
            maxWidth = 0;

        this._eachLabel(function(offset, val) {
          maxWidth = Math.max(maxWidth, MeteorChart.Dom.getTextWidth(val));
        });

        return maxWidth;
      },
      height: function() {
        return this.fontSize(0);
      }
    },
    init: function() {
      this.innerContent = MeteorChart.Dom.createElement('div');
      this.innerContent.style.position = 'relative';
      this.content.appendChild(this.innerContent);
    },
    _render: function() {
      var that = this;

      this.innerContent.innerHTML = '';

      this._eachLabel(function(offset, val) {
        that._addLabel(offset, val);
      });
    },
    _eachLabel: function(func) {
      var that = this,
          chart = this.chart,
          data = this.get('data'),
          len = data.length,
          style = this.get('style'),
          min = data[0],
          max = data[len - 1],
          diff = max - min,
          scale = (this.get('orientation') === 'vertical' ? this.get('height') : this.get('width')) / diff,
          formatter = style.formatter || MeteorChart.Formatters.Number,
          n, val, offset;

      for (n=0; n<len; n++) {
        val = data[n];

        if (this.get('orientation') === 'vertical') {
          offset = (val - min) * scale;
        }
        else {
          offset = (val - min) * scale;
        }
        func(offset, formatter.short(val, min, max)); 
      }
    },
    getLabelOffsets: function() {
      var that = this,
          labelOffsets = [];

      this._eachLabel(function(offset, val) {
        labelOffsets.push(offset);
      });

      return labelOffsets;
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
      text.style.fontSize = this.fontSize(0) + PX;
      text.style.fontFamily = theme.fontFamily;
      text.style.color = theme.primary;

      return text;
    },
    _addLabel: function(offset, val) {
      var text = this._getLabel(val);

      this.innerContent.appendChild(text);

      if (this.get('orientation') === 'vertical') {
        text.style.top = (this.get('height') - offset - (MeteorChart.Dom.getTextHeight(val) /2)) + PX;
        text.style.left = 0 + PX;
      }
      // horizontal
      else {
        text.style.top = 0 + PX;
        text.style.left = (offset - (MeteorChart.Dom.getTextWidth(val)/2)) + PX;
      }
    }
  });
})();