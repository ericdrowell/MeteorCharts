(function() {
  MeteorCharts.XAxis = function(chart) {
    this.chart = chart;
    this.maxNumberOfLabels = chart._view.get('xAxis', 'maxNumberOfLabels');
    this.formatter = new MeteorCharts[chart._view.get('xAxis', 'formatter')](chart.minX, chart.maxX, this.maxNumberOfLabels);
    this.addXLabels();
  };

  MeteorCharts.XAxis.prototype = {
    addXLabels: function() {
      var chart = this.chart,
          formatter = this.formatter,
          maxNumberOfLabels = this.maxNumberOfLabels,
          maxX = chart.maxX,
          minX = chart.minX,
          scaleX = chart.scaleX,
          range = maxX - minX,
          increment = formatter.getIncrement(),
          start = Math.ceil(minX/increment) * increment,
          n, x;

      for (n=start; n<maxX; n+=increment) {
        x = (n - minX) * scaleX + chart.dataX;
        this.addXLabel(formatter.formatShort(n), x);
      }
    }, 
    addXLabel: function(str, x) {
      var chart = this.chart,
          _view = chart._view,
          lines = _view.get('xAxis', 'lines'),
          dataY = chart.dataY,
          dataHeight = chart.dataHeight,
          bottomLayer = chart.bottomLayer,
          y = _view.get('height') - _view.get('text', 'fontSize') - _view.get('padding'),
          text = new Kinetic.Text(MeteorCharts.Util.merge(
            _view.get('text'),
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