(function() {
  Meteor.XAxis = function(chart) {
    this.chart = chart;
    this.maxNumberOfLabels = chart.skin.xAxis.maxNumberOfLabels;
    this.units = new Meteor[chart.model.xAxis.units](chart.minX, chart.maxX, this.maxNumberOfLabels);
    this.addXLabels();
  };

  Meteor.XAxis.prototype = {
    addXLabels: function() {
      var chart = this.chart,
          units = this.units,
          maxNumberOfLabels = this.maxNumberOfLabels,
          maxX = chart.maxX,
          minX = chart.minX,
          scaleX = chart.scaleX,
          range = maxX - minX,
          increment = units.getIncrement(),
          n, x;

      for (n=minX; n<maxX; n+=increment) {
        x = (n - minX) * scaleX + chart.dataX;
        this.addXLabel(units.formatShort(n), x);
      }
    }, 
    addXLabel: function(str, x) {
      var chart = this.chart,
          skin = chart.skin,
          lines = skin.xAxis.lines,
          dataY = chart.dataY,
          dataHeight = chart.dataHeight,
          bottomLayer = chart.bottomLayer,
          y = skin.height - 16,
          text = new Kinetic.Text(Meteor.Util.merge(skin.text, {
            text: str,
            x: x,
            y: y
          })),
          line;

      text.setOffsetX(text.getWidth()/2);

      if (lines) {
        line = new Kinetic.Line(Meteor.Util.merge(lines, {
          points: [x, dataY, x, dataY + dataHeight]
        }));
 
        bottomLayer.add(line); 
      }

      chart.topLayer.add(text);
    }
  };
})();