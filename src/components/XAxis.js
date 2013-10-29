(function() {
  var APPROX_LABEL_MAX_DISTANCE = 100;

  MeteorCharts.XAxis = function(chart) {
    var maxNumLabels = chart._view.get('width') / APPROX_LABEL_MAX_DISTANCE;
    this.chart = chart;
    this.maxNumberOfLabels = chart._view.get('xAxis', 'maxNumberOfLabels');
    this.formatter = new MeteorCharts[chart._view.get('xAxis', 'formatter')](chart.minX, chart.maxX, maxNumLabels);
    this.addXLabels();
  };

  MeteorCharts.XAxis.prototype = {
    addXLabels: function() {
      var that = this,
          chart = this.chart,
          min = chart.minX,
          scaleX = chart.scaleX,
          formatter = this.formatter,
          x;

      formatter.each(function(n) {
        x = (n - min) * scaleX + chart.dataX;
        that.addXLabel(formatter.short(n), x);
      });      
    }, 
    addXLabel: function(str, x) {
      var chart = this.chart,
          _view = chart._view,
          lines = _view.get('xAxis', 'gridLines'),
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

      if (lines !== 'none') {
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