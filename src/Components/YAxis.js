(function() {
  Meteor.YAxis = function(chart) {
    this.chart = chart;
    this.maxNumberOfLabels = chart.skin.yAxis.maxNumberOfLabels;
    this.units = new Meteor[chart.model.yAxis.units](chart.minY, chart.maxY, this.maxNumberOfLabels);
    this.addYLabels();
  };

  Meteor.YAxis.prototype = {
    addYLabels: function() {
      var chart = this.chart,
          units = this.units,
          minY = chart.minY,
          maxY = chart.maxY,
          range = maxY - minY,
          increment = units.getIncrement(),
          dataHeight = chart.dataHeight,
          scaleY = chart.scaleY,
          y = 0;

      // draw labels at 0 and above
      while(y <= maxY) {
        this.addYLabel(units.formatShort(y), Math.round(dataHeight + (minY - y) * scaleY));
        y+=increment; 
      }
      
      // draw labels below 0
      y=-1 * increment;
      while(y > minY) {
        this.addYLabel(units.formatShort(y), Math.round(dataHeight + (minY - y) * scaleY));
        y-=increment; 
      }

    },
    addYLabel: function(str, y) {
      var chart = this.chart,
          skin = chart.skin,
          width = chart.dataWidth,
          height = chart.dataHeight,
          dataX = chart.dataX,
          dataY = chart.dataY,
          bottomLayer = chart.bottomLayer,
          topLayer = chart.topLayer,
          lines = skin.yAxis.lines,
          textColor = skin.text,
          text = new Kinetic.Text(Meteor.Util.merge(skin.text, {
            text: str,
            y: y - 8 + dataY
          })),
          line;

      if (lines) {
        line = new Kinetic.Line(Meteor.Util.merge(lines, {
          points: [0, 0, width, 0],
          y: y + dataY,
          x: dataX
        }));
 
        bottomLayer.add(line); 
      }

      chart.topLayer.add(text);
    }
  };
})();