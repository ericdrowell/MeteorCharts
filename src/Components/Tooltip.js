(function() {
var EMPTY_STRING = '',
    SPACE = ' ',
    MOUSEMOVE = 'mousemove',
    MOUSEOUT = 'mouseout',
    MOUSEOVER = 'mouseover',
    TOUCHMOVE = 'touchmove',
    TOUCHSTART = 'touchstart',
    TOUCHEND = 'touchend';

  Meteor.Tooltip = function(chart) {
    var group = this.group = new Kinetic.Group(),
        node = this.node = new Kinetic.Circle(),
        text = this.text = new Kinetic.Text({}),
        tag = this.tag = new Kinetic.Tag(),
        label = this.label = new Kinetic.Label({
          y: -5
        });

    this.chart = chart;
    label.add(tag).add(text);
    group.add(node).add(label);
    chart.interactionLayer.add(group);
  };

  Meteor.Tooltip.prototype = {
    style: function() {
      var view = this.chart.view,
          tooltipView = view.tooltip;

      this.node.setAttrs({
        radius: 5,
        stroke: view.background,
        strokeWidth: 3,
        listening: false
      });

      this.text.setAttrs(Meteor.Util.merge(
        tooltipView.text, 
        {
          text: '',
          listening: false
        }
      ));

      this.tag.setAttrs(Meteor.Util.merge(
        tooltipView.tag, 
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