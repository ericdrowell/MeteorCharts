(function() {
  MeteorCharts.XAxis = function(chart) {
    this.chart = chart;
    this.maxNumberOfLabels = chart.view.xAxis.maxNumberOfLabels;
    this.units = new MeteorCharts[chart.model.xAxis.units](chart.minX, chart.maxX, this.maxNumberOfLabels);
    this.addXLabels();
  };

  MeteorCharts.XAxis.prototype = {
    addXLabels: function() {
      var chart = this.chart,
          units = this.units,
          maxNumberOfLabels = this.maxNumberOfLabels,
          maxX = chart.maxX,
          minX = chart.minX,
          scaleX = chart.scaleX,
          range = maxX - minX,
          increment = units.getIncrement(),
          start = Math.ceil(minX/increment) * increment,
          n, x;

      for (n=start; n<maxX; n+=increment) {
        x = (n - minX) * scaleX + chart.dataX;
        this.addXLabel(units.formatShort(n), x);
      }
    }, 
    addXLabel: function(str, x) {
      var chart = this.chart,
          view = chart.view,
          lines = view.xAxis.lines,
          dataY = chart.dataY,
          dataHeight = chart.dataHeight,
          bottomLayer = chart.bottomLayer,
          y = view.height - 16,
          text = new Kinetic.Text(MeteorCharts.Util.merge(
            view.text, 
            {
              text: str,
              x: x,
              y: y,
              listening: false
            }
          )),
          line;

      text.setOffsetX(text.getWidth()/2);

      if (lines) {
        line = new Kinetic.Line(MeteorCharts.Util.merge(
          lines, 
          {
            points: [x, dataY, x, dataY + dataHeight],
            listening: false
          }
        ));
 
        bottomLayer.add(line); 
      }

      chart.topLayer.add(text);
    }
  };
})();