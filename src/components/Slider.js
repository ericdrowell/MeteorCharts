(function() {
  MeteorChart.Component.define('Slider', {
    build: function() {
      var that = this,
          theme = this.chart.theme,
          data = this.data();

      console.log('build')
      this.layer.add(new Kinetic.Rect({
        width: data.width,
        height: data.height,
        fill: theme.secondary,
        draggable: true,
        cornerRadius: data.height / 2,
        dragBoundFunc: function(pos) {
          var x = pos.x,
              y = this.getAbsolutePosition().y;

          if (x < that.x()) {
            x = that.x();
          } 
          else if (x > that.x() + that.width() - data.width) {
            x = that.x() + that.width() - data.width
          }

          return {
            x: x,
            y: y
          }
        }
      }));
    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Slider, 'width', function() {
    return this.data().width;
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Slider, 'height', function() {
    return this.data().height;
  });

})();