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
    },
    render: function(config) {
      var chart = this.chart,
          pos = chart.dataToChart(config.x, config.y),
          node = this.node,
          line = this.line;

      node.setFill(config.color);
      node.setPosition(pos.x, pos.y);
      line.setPoints([pos.x, pos.y, pos.x, chart.tooltip.group.getY()]);
      line.setStroke(config.color);
    }
  };
})();