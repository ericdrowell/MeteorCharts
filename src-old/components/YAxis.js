(function() {
  var APPROX_LABEL_MAX_DISTANCE = 50;

  MeteorCharts.YAxis = function(chart) {
    var maxNumLabels = chart._view.get('height') / APPROX_LABEL_MAX_DISTANCE;

    this.chart = chart;
    this.maxNumberOfLabels = chart._view.get('yAxis', 'maxNumberOfLabels');
    this.formatter = new MeteorCharts[chart._view.get('yAxis', 'formatter')](chart.minY, chart.maxY, maxNumLabels);
    this.lineGroup = new Kinetic.Group();
    chart.bottomLayer.add(this.lineGroup);
    this.addYLabels();
  };

  MeteorCharts.YAxis.prototype = {
    addYLabels: function() {
      var that = this,
          chart = this.chart,
          formatter = this.formatter,
          minY = chart.minY,
          increment = formatter.getIncrement(),
          dataHeight = chart.dataHeight,
          scaleY = chart.scaleY,
          maxWidth = 0,
          width = 0;

      formatter.each(function(n) {
        width = that.addYLabel(formatter.short(n), Math.round(dataHeight + (minY - n) * scaleY));
        maxWidth = Math.max(width, maxWidth);
      });

      chart.dataX = maxWidth + 10 + chart._view.get('padding');
      this.lineGroup.setX(chart.dataX);
    },
    addYLabel: function(str, y) {
      var chart = this.chart,
          _view = chart._view,
          padding = _view.get('padding'),
          width = _view.get('width'),
          height = chart.dataHeight,
          dataY = chart.dataY,
          bottomLayer = chart.bottomLayer,
          topLayer = chart.topLayer,
          lines = _view.get('yAxis', 'gridLines'),
          text = new Kinetic.Text(MeteorCharts.Util.merge(
            _view.get('yAxis', 'text'),
            {
              text: str,
              x: padding,
              y: y - 8 + dataY,
              listening: false
            }
          )),
          lineGroup = this.lineGroup,
          line;

      if (lines !== 'none') {
        line = new Kinetic.Line(MeteorCharts.Util.merge(
          lines, 
          {
            y: y + dataY,
            listening: false
          }
        ));
 
        lineGroup.add(line); 
      }

      chart.topLayer.add(text);

      return text.getWidth();
    }
  };
})();