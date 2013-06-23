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
          n;

      for (n=minX; n<maxX; n+=increment) {
        this.addXLabel(units.shortFormatter(n), (n - minX) * scaleX);
      }
    }, 
    addXLabel: function(str, x) {
      var chart = this.chart,
          skin = chart.skin,
          y = skin.height - 16,
          text = new Kinetic.Text(Meteor.Util.merge(skin.text, {
            text: str,
            x: x + chart.dataX,
            y: y
          }));

      chart.topLayer.add(text);
    }
  };
})();