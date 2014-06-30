(function() {
  MeteorChart.Component.extend('Bars', {
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
          barWidth = Math.round(style.barWidth),
          // TODO: currently counting the number of bars for the first group
          // there's probably a better way
          barsLen = data[0].bars.length,
          viewport = this.get('viewport'),
          range = viewport.max - viewport.min,
          n, group, bars, barsLen, i, color, increment, barOffset, length;

      this.content.innerHTML = '';

      if (this.get('orientation') === 'vertical') {
        increment = Math.round((this.get('width') - (barWidth * barsLen)) / (dataLen - 1));  
      }

      for (n=0; n<dataLen; n++) {
        group = data[n];
        bars = group.bars; 
        barsLen = bars.length;
        
        for (i=0; i<barsLen; i++) {
          bar = bars[i];
          barOffset = barWidth * i;
          length = this.get('height') * bar.value / range;
          this._addBar(groupOffset + barOffset, barWidth, length, this.getDataColor(i));

        }

        groupOffset += increment;
      }
    },
    _addBar: function(offset, width, length, color) {
      var div = MeteorChart.DOM.createElement('div'),
          style = this.get('style'),
          length;

      if (this.get('orientation') === 'vertical') {
        div.style.bottom = '0';
        div.style.left = offset + 'px';
        div.style.width = width + 'px';
        div.style.height = Math.floor(length) + 'px';
      }

      div.style.backgroundColor = color;
      div.style.position = 'absolute';
      this.content.appendChild(div);
    }
  });
})();