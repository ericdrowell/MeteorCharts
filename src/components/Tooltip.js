(function() {
var EMPTY_STRING = '',
    SPACE = ' ',
    MOUSEMOVE = 'mousemove',
    MOUSEOUT = 'mouseout',
    MOUSEOVER = 'mouseover',
    TOUCHMOVE = 'touchmove',
    TOUCHSTART = 'touchstart',
    TOUCHEND = 'touchend';

  MeteorCharts.Tooltip = function(chart) {
    var text = this.text = new Kinetic.Text({}),
        tag = this.tag = new Kinetic.Tag(),
        label = this.label = new Kinetic.Label();

    this.chart = chart;
    label.add(tag).add(text);
    chart.interactionLayer.add(label);
  };

  MeteorCharts.Tooltip.prototype = {
    reset: function() {
      var _view = this.chart._view;

      this.text.setAttrs(MeteorCharts.Util.merge(
        _view.get('tooltip', 'text'),
        {
          text: ''
        }
      ));

      this.tag.setAttrs(_view.get('tooltip', 'tag'));
    }
  };
})();