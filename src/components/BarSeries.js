(function() {
  MeteorChart.Component.extend('BarSeries', {
    defaults: {
      style: {
        barWidth: 20
      },
      orientation: 'vertical'
    },
    init: function() {

    },
    _render: function() {
      var data = this.get('data'),
          theme = this.chart.theme,
          dataLen = data.length,
          offset = 0,
          style = this.get('style'),
          barWidth = style.barWidth,
          n, group, bars, barsLen, i, color, increment;

      this.content.innerHTML = '';

      if (this.get('orientation') === 'vertical') {
        increment = (this.get('width') - barWidth) / (dataLen - 1);  
      }
      else {
        increment = (this.get('height') - barWidth) / (dataLen - 1);
      }

      for (n=0; n<dataLen; n++) {
        group = data[n];
        bars = group.bars;
        barsLen = bars.length;


        for (i=0; i<barsLen; i++) {
          bar = bars[i];
          this._addBar(offset, bar, theme.data[i]);
          offset += increment;

        }
      }
    },
    _addBar: function(offset, bar, color) {
      var div = MeteorChart.DOM.createElement('div'),
          style = this.get('style'),
          viewport = this.get('viewport'),
          range = viewport.max - viewport.min,
          barWidth = style.barWidth,
          length;

      if (this.get('orientation') === 'vertical') {
        length = this.get('height') * bar.value / range;
        div.style.bottom = '0';
        div.style.left = offset + 'px';
        div.style.width = barWidth + 'px';
        div.style.height = length + 'px';
      }
      else {

      }

      div.style.backgroundColor = color;
      div.style.position = 'absolute';
      this.content.appendChild(div);
    }
  });
})();