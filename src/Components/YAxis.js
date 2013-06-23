(function() {
	var APPROX_NUMBER_OF_Y_LABELS = 5;

  Meteor.YAxis = function(chart) {
    this.chart = chart;
    this.addYLabels();
  };

  Meteor.YAxis.prototype = {
    addYLabels: function() {
      var chart = this.chart,
          minY = chart.minY,
          maxY = chart.maxY,
          range = maxY - minY,
          increment = Math.round((range / APPROX_NUMBER_OF_Y_LABELS) / 10) * 10,
          y = 0;

      // draw labels at 0 and above
      while(y <= maxY) {
        this.addYLabel(chart.getFormattedYLabel(y), chart.getChartY(y));
        y+=increment; 
      }
      
      // draw labels below 0
      y=-1 * increment;
      while(y > minY) {
        this.addYLabel(chart.getFormattedYLabel(y), chart.getChartY(y));
        y-=increment; 
      }

    },
    addYLabel: function(str, y) {
      var chart = this.chart,
          skin = chart.skin,
          width = skin.width,
          height = skin.height,
          bottomLabelLayer = chart.bottomLabelLayer,
          topLabelLayer = chart.topLabelLayer,
          skin = chart.skin,
          gridLineColor = skin.gridLine,
          textColor = skin.text,
          text = new Kinetic.Text(Meteor.Util.merge(skin.gridLabel, {
            text: str
          })),
          tag = new Kinetic.Tag({
            fill: skin.background,
            opacity: 0.7
          }),
          backgroundColor = skin.background,
          label = new Kinetic.Label({
            y: y + 2
          }),
          line = new Kinetic.Line({
            stroke: gridLineColor,
            strokeWidth: 2,
            points: [0, 0, width, 0],
            y: y
          });

      label.add(tag).add(text);
       
      bottomLabelLayer.add(line); 
      chart.topLabelLayer.add(label);
    }
  };
})();