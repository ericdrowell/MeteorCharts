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
    var group = this.group = new Kinetic.Group(),
        node = this.node = new Kinetic.Circle(),
        text = this.text = new Kinetic.Text({}),
        tag = this.tag = new Kinetic.Tag(),
        label = this.label = new Kinetic.Label({
          y: -8
        });

    this.chart = chart;
    label.add(tag).add(text);
    group.add(node).add(label);
    chart.interactionLayer.add(group);
  };

  MeteorCharts.Tooltip.prototype = {
    style: function() {
      var _view = this.chart._view;

      this.node.setAttrs({
        radius: 5,
        stroke: _view.get('backgroundColor'),
        strokeWidth: 3,
        listening: false
      });

      this.text.setAttrs(MeteorCharts.Util.merge(
        _view.get('tooltip', 'text'),
        {
          text: '',
          listening: false
        }
      ));

      this.tag.setAttrs(MeteorCharts.Util.merge(
        _view.get('tooltip', 'tag'),
        {
          pointerDirection: 'down',
          pointerWidth: 10,
          pointerHeight: 10,
          lineJoin: 'round',
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffset: 5,
          shadowOpacity: 0.5,
          listening: false
        }
      ));
    }
  };
})();