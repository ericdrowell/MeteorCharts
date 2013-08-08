(function() {
  MeteorCharts.Title = function(chart) {
    var chart = this.chart = chart,
        model = this.model = chart.model,
        _view = chart._view,
        str = model.str = '',
        padding = _view.get('padding'),
        text = this.text = new Kinetic.Text(MeteorCharts.Util.merge(
          _view.get('title', 'text'), 
          {
            text: model.title,
            listening: false,
            x: padding,
            y: padding
          }
        ));

    chart.bottomLayer.add(text);
  };

  MeteorCharts.Title.prototype = {
    getWidth: function() {
      return this.text.getWidth() || 0;
    },
    hide: function() {
      this.text.hide();
    }
  };
})();