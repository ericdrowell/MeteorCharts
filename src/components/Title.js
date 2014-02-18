(function() {
  MeteorChart.Component.define('Title', {
    build: function() {
      var font = this.chart.theme.background.fonts.large;

      this.layer.add(new Kinetic.Text({
        text: this.data(),
        fontFamily: font.fontFamily,
        fontSize: font.fontSize,
        fill: font.fill,
        stroke: font.stroke
      })); 
    },
    destroy: function() {

    }
  });
})();