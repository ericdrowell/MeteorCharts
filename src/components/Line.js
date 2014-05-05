(function() {
  MeteorChart.Component.extend('Line', {
    _render: function() {
      this.content.style.backgroundColor = this.get('style', this).stroke || this.chart.theme.primary;
    }
  });
})();