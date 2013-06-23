(function() {
	var MAX_NUMBER_OF_X_LABELS = 7;

  Meteor.XAxis = function(chart) {
    this.chart = chart;
    this.unit = new Meteor[chart.model.xAxis.units]();
    this.setGranularity();
    this.addXLabels();
  };

  Meteor.XAxis.prototype = {
  	setGranularity: function() {
      var chart = this.chart,
          maxX = chart.maxX,
          minX = chart.minX,
          range = (maxX - minX) / 1000,
          smallestIncrement = range / MAX_NUMBER_OF_X_LABELS;

      this.unit.setGranularity(smallestIncrement);
  	},
    addXLabels: function() {
      var chart = this.chart,
          unit = this.unit,
          maxX = chart.maxX,
          minX = chart.minX,
          scaleX = chart.scaleX,
          range = (maxX - minX) / 1000,
          increment = unit.getIncrement(),
          smallestIncrement = Math.round(range / MAX_NUMBER_OF_X_LABELS / increment) * increment,
          n;

      for (n=minX; n<maxX; n+=(smallestIncrement*1000)) {
        this.addXLabel(unit.getFormattedShort(n), (n - minX) * scaleX);
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