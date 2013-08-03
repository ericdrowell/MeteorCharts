(function() {
  MeteorCharts.Legend = function(chart) {
    this.chart = chart;
    this.group = new Kinetic.Group();
    this.addLabels();
  };

  MeteorCharts.Legend.prototype = {
    addLabels: function() {
      var chart = this.chart,
          group = this.group,
          model = chart.model,
          _view = chart._view,
          lines = model.lines,
          len = lines.length,
          x = 0,
          n, dataLine, text, line;

      for (n=0; n<len; n++) {
        dataLine = lines[n];

        line = new Kinetic.Line(MeteorCharts.Util.merge(
          chart._view.getDataStyle(n), 
          {
            x: x,
            points: [0, 0, 5, 0],
            scale: 2,
            listening: false
          }
        ));

        x += 10;
        x += 3;

        text = new Kinetic.Text(MeteorCharts.Util.merge(
          _view.getText('legend', 'text'), 
          {
            text: dataLine.title,
            x: x,
            listening: false
          }
        ));

        x += text.getWidth();

        if (n<len-1) {
          x += _view.get('legend', 'spacing');
        }

        line.setY(text.getHeight()/2);

        group.add(line).add(text);
      }

      group.setPosition(_view.get('width') - x - 10, 5);

      chart.bottomLayer.add(group);
    }
  };
})();