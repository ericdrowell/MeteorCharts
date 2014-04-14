(function() {
  MeteorChart.Component.extend('Line', {
    render: function() {
      this.content.style.backgroundColor = MeteorChart.Util.hexToRgba(this.chart.theme.secondary, 0.1);
    }
  });
})();