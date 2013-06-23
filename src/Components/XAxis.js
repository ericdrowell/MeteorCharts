(function() {
  Meteor.XAxis = function(chart) {
    this.chart = chart;
    this.maxNumberOfLabels = chart.layout.xAxis.maxNumberOfLabels;
    this.units = new Meteor[chart.model.xAxis.units](chart.maxX - chart.minX, this.maxNumberOfLabels);
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
          n;

      for (n=minX; n<maxX; n+=increment) {
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