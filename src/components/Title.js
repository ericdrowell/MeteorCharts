(function() {
  MeteorChart.Component.define('Title', {
    build: function() {
      var theme = this.chart.theme(),
          font = theme.font.large;

      this.layer.enableHitGraph(false);
      
      this.layer.add(new Kinetic.Text({
        text: this.data(),
        fontFamily: font.family,
        fontSize: font.size,
        fill: theme.secondary
      })); 
    },
    destroy: function() {

    }
  });
})();