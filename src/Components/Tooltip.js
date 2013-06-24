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
        skin = chart.skin,
        tooltipSkin = skin.tooltip,

		    node = this.node = new Kinetic.Circle({
		      radius: 5,
		      stroke: skin.background,
		      strokeWidth: 5
		    }),
		    text = this.text = new Kinetic.Text(Meteor.Util.merge(tooltipSkin.text, {
		      text: ''
		    })),
		    tag = this.tag = new Kinetic.Tag(Meteor.Util.merge(tooltipSkin.tag, {
		      pointerDirection: 'left',
		      pointerWidth: 5,
		      pointerHeight: tooltipSkin.text.fontSize + (2*tooltipSkin.text.padding),
		      lineJoin: 'round'
		    })),
		    label = this.label = new Kinetic.Label({
		      x: 5
		    });

    this.chart = chart;
    label.add(tag).add(text);  
    group.add(node).add(label);
    chart.interactionLayer.add(group);

    this._bind();
  };

  Meteor.Tooltip.prototype = {
    _bind: function() {
      var stage = this.chart.stage,
          content = stage.getContent(),
          that = this;
      
      content.addEventListener(MOUSEMOVE, function() {
        that.update();
      }); 
      
      content.addEventListener(TOUCHMOVE, function() {
        that.update();
      }); 
    },
    update: function() {

    }
  };
})();