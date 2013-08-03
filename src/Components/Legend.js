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
          view = chart.view,
          legendView = view.legend,
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
          {
            fill: view.text.fill
          }, 
          legendView.text, 
          {
            text: dataLine.title,
            x: x,
            listening: false
          }
        ));

        x += text.getWidth();

        if (n<len-1) {
          x += legendView.spacing;
        }

        line.setY(text.getHeight()/2);

        group.add(line).add(text);
      }

      group.setPosition(view.width - x - 10, 5);

      chart.bottomLayer.add(group);
    }
  };
})();