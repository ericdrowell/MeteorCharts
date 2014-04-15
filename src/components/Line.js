(function() {
  MeteorChart.Component.extend('Line', {
    render: function() {
      this.content.style.backgroundColor = this.chart.theme.secondary;
    }
  });
})();