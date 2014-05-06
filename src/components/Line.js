(function() {
  MeteorChart.Component.extend('Line', {
    _render: function() {
      this.content.style.backgroundColor = this.get('style').stroke || this.chart.theme.primary;
    }
  });
})();