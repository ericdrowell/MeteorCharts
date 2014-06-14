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
      var data = this.get('data'),
          len = data.length,
          style = this.get('style'),
          formatter = style.formatter || MeteorChart.Formatters.String,
          offset = 0,
          increment, n, val;

      if (this.get('orientation') === 'vertical') {
        increment = this.get('height') / (len - 1);
      }
      else {
        increment = this.get('width') / (len - 1);
      }

      for (n=0; n<len; n++) {
        val = data[n];
        func(offset, formatter.short(val)); 
        offset += increment;
      }
    },
    getLabelInfo: function() {
      var that = this,
          info = {};

      this._eachLabel(function(offset, val) {
        info[val] = {
          offset: offset
        };
      });

      return info;
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