(function() {
	var MAX_NUMBER_OF_X_LABELS = 7;

  Meteor.XAxis = function(chart) {
    this.chart = chart;
    this.units = new Meteor[chart.model.xAxis.units]();
    this.setGranularity();
    this.addXLabels();
  };

  Meteor.XAxis.prototype = {
  	setGranularity: function() {
      var chart = this.chart,
          maxX = chart.maxX,
          minX = chart.minX,
          range = maxX - minX,
          smallestIncrement = range / MAX_NUMBER_OF_X_LABELS;

      this.units.setGranularity(smallestIncrement);
  	},
    addXLabels: function() {
      var chart = this.chart,
          units = this.units,
          maxX = chart.maxX,
          minX = chart.minX,
          scaleX = chart.scaleX,
          range = maxX - minX,
          increment = units.getIncrement(),
          smallestIncrement = Math.round(range / MAX_NUMBER_OF_X_LABELS / increment) * increment,
          n;

      for (n=minX; n<maxX; n+=smallestIncrement) {
        this.addXLabel(units.getFormattedShort(n), (n - minX) * scaleX);
      }
    }, 
    addXLabel: function(str, x) {
      var chart = this.chart,
          layout = chart.layout,
          y = layout.height - 16,
          skin = chart.skin,
          text = new Kinetic.Text(Meteor.Util.merge(skin.gridLabel, {
            text: str
          })),
          tag = new Kinetic.Tag({
            fill: skin.background,
            opacity: 0.7
          }),
          label = new Kinetic.Label({
            x: x,
            y: y
          });

      label.add(tag).add(text);
      chart.topLabelLayer.add(label);
    }
  };
})();