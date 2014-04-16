(function() {
  MeteorChart.Component.extend('Line', {
    render: function() {
      this.content.style.backgroundColor = this.style().stroke || this.chart.theme.primary;
    }
  });
})();