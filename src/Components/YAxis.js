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
          y = 0;

      // draw labels at 0 and above
      while(y <= maxY) {
        this.addYLabel(units.shortFormatter(y), Math.round(chart.getChartY(y)));
        y+=increment; 
      }
      
      // draw labels below 0
      y=-1 * increment;
      while(y > minY) {
        this.addYLabel(units.shortFormatter(y), Math.round(chart.getChartY(y)));
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
          gridLineColor = skin.gridLine,
          textColor = skin.text,
          text = new Kinetic.Text(Meteor.Util.merge(skin.gridLabel, {
            text: str
          })),
          tag = new Kinetic.Tag(),
          backgroundColor = skin.background,
          label = new Kinetic.Label({
            y: y - 8 + dataY
          }),
          line = new Kinetic.Line({
            stroke: gridLineColor,
            strokeWidth: 2,
            points: [0, 0, width, 0],
            y: y + dataY,
            x: dataX
          });

      label.add(tag).add(text);
       
      bottomLayer.add(line); 
      chart.topLayer.add(label);
    }
  };
})();