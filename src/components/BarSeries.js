(function() {
  MeteorChart.Component.extend('BarSeries', {
    init: function() {

    },
    _render: function() {
      var data = this.get('data'),
          dataLen = data.length,
          n, group, bars, barsLen, i, barTitle, barValue;

      for (n=0; n<dataLen; n++) {
        group = data[n];
        bars = group.bars;
        barsLen = bars.length;

        for (i=0; i<barsLen; i++) {
          bar = bars[i];
          barTitle = bar.title;
          barValue = bar.value;

          this._addBar();

        }
      }
    },
    _addBar: function(offset, val, min, max) {

    }
  });
})();