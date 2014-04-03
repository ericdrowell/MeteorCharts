(function() {
  MeteorChart.Component.define('Slider', {
    build: function() {
      var that = this,
          theme = this.chart.theme,
          options = this.options,
          data = this.data();

      this.layer.add(new Kinetic.Rect({
        width: options.width,
        height: options.height,
        fill: theme.secondary,
        draggable: true,
        cornerRadius: options.height / 2,
        dragBoundFunc: function(pos) {
          var x = pos.x,
              y = this.getAbsolutePosition().y;

          if (x < that.x()) {
            x = that.x();
          } 
          else if (x > that.x() + that.width() - options.width) {
            x = that.x() + that.width() - options.width
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
    return this.options.width;
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Slider, 'height', function() {
    return this.options.height;
  });

})();