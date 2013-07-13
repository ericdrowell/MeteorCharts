(function() {
  Meteor.YAxis = function(chart) {
    this.chart = chart;
    this.maxNumberOfLabels = chart.skin.yAxis.maxNumberOfLabels;
    this.units = new Meteor[chart.model.yAxis.units](chart.minY, chart.maxY, this.maxNumberOfLabels);
    this.lineGroup = new Kinetic.Group();
    chart.bottomLayer.add(this.lineGroup);
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
          y = 0, 
          maxWidth = 0,
          width;

      // draw labels at 0 and above
      while(y <= maxY) {
        if (y >= minY) {
          width = this.addYLabel(units.formatShort(y), Math.round(dataHeight + (minY - y) * scaleY));
          maxWidth = Math.max(width, maxWidth);
        }
        y+=increment; 
      }
      
      // draw labels below 0
      y=-1 * increment;
      while(y >= minY) {
        if (y <= maxY) {
          width = this.addYLabel(units.formatShort(y), Math.round(dataHeight + (minY - y) * scaleY));
          maxWidth = Math.max(width, maxWidth);
        }
        y-=increment; 
      }

      chart.dataX = maxWidth + 10;
      this.lineGroup.setX(chart.dataX);

    },
    addYLabel: function(str, y) {
      var chart = this.chart,
          skin = chart.skin,
          width = skin.width,
          height = chart.dataHeight,
          dataY = chart.dataY,
          bottomLayer = chart.bottomLayer,
          topLayer = chart.topLayer,
          lines = skin.yAxis.lines,
          textColor = skin.text,
          text = new Kinetic.Text(Meteor.Util.merge(skin.text, {
            text: str,
            y: y - 8 + dataY
          })),
          lineGroup = this.lineGroup,
          line;

      if (lines) {
        line = new Kinetic.Line(Meteor.Util.merge(lines, {
          points: [0, 0, width, 0],
          y: y + dataY
        }));
 
        lineGroup.add(line); 
      }

      chart.topLayer.add(text);

      return text.getWidth();
    }
  };
})();