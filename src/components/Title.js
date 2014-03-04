(function() {
  MeteorChart.Component.define('Title', {
    init: function() {
      var theme = this.chart.theme(),
          font = theme.font;

      this.layer.enableHitGraph(false);
      
      this.layer.add(new Kinetic.Text({
        text: this.data(),
        fontFamily: font.family,
        fontSize: font.size * MeteorChart.Constants.TYPOGRAPHIC_SCALE * 2,
        fill: theme.secondary
      })); 
    },
    destroy: function() {

    }
  });
})();