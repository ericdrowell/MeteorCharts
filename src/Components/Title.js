(function() {
  MeteorCharts.Title = function(chart) {
    var chart = this.chart = chart,
        model = this.model = chart.model,
        _view = chart._view,
        str = model.str = '',
        text = this.text = new Kinetic.Text(MeteorCharts.Util.merge(
          _view.getText('title', 'text'), 
          {
            text: model.title,
            listening: false
          }
        ));

    chart.bottomLayer.add(text);
  };

  MeteorCharts.Title.prototype = {

  };
})();