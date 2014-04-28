(function() {
  MeteorChart.Component.extend('Line', {
    _render: function() {
      this.content.style.backgroundColor = this.style.stroke || this.chart.theme.primary;
    }
  });
})();