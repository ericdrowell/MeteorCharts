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
          groupOffset = 0,
          style = this.get('style'),
          barWidth = style.barWidth,
          // TODO: currently counting the number of bars for the first group
          // there's probably a better way
          barsLen = data[0].bars.length,
          n, group, bars, barsLen, i, color, increment, barOffset;

      this.content.innerHTML = '';

      if (this.get('orientation') === 'vertical') {
        increment = (this.get('width') - (barWidth * barsLen)) / (dataLen - 1);  
      }

      for (n=0; n<dataLen; n++) {
        group = data[n];
        bars = group.bars; 
        barsLen = bars.length;
        
        for (i=0; i<barsLen; i++) {
          bar = bars[i];
          barOffset = barWidth * i;
          this._addBar(groupOffset + barOffset - i, bar, this.getDataColor(i));

        }

        groupOffset += increment;
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
        div.style.left = Math.floor(offset) + 'px';
        div.style.width = Math.floor(barWidth) + 'px';
        div.style.height = Math.floor(length) + 'px';
      }
      else {

      }

      div.style.backgroundColor = color;
      div.style.position = 'absolute';
      this.content.appendChild(div);
    }
  });
})();