(function() {
  MeteorCharts.Connector = function(chart) {
    this.chart = chart;
    this.group = new Kinetic.Group();
    this.node = new Kinetic.Circle();
    this.line = new Kinetic.Line();
    this.group.add(this.line).add(this.node);
    chart.interactionLayer.add(this.group);
  };

  MeteorCharts.Connector.prototype = {
    reset: function() {
      var _view = this.chart._view;

      this.node.setAttrs(_view.get('connector', 'node'));
      this.line.setAttrs(_view.get('connector', 'line'));
    }
  };
})();