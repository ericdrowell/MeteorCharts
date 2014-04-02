(function() {
  MeteorChart.Component.define('Slider', {
    build: function() {
      var theme = this.chart.theme,
          data = this.data();

      console.log('build')
      this.layer.add(new Kinetic.Rect({
        width: data.width,
        height: data.height,
        fill: theme.secondary,
        draggable: true,
        dragBoundFunc: function(pos) {
          return {
            x: pos.x,
            y: this.getAbsolutePosition().y
          }
        }
      }));
    }
  });
})();