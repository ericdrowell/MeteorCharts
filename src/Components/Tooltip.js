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
		      strokeWidth: 3
		    }),
		    text = this.text = new Kinetic.Text(Meteor.Util.merge(tooltipSkin.text, {
		      text: 'stuff'
		    })),
		    tag = this.tag = new Kinetic.Tag(Meteor.Util.merge(tooltipSkin.tag, {
		      pointerDirection: 'down',
		      pointerWidth: 10,
		      pointerHeight: 10,
		      lineJoin: 'round',
	        shadowColor: 'black',
	        shadowBlur: 10,
	        shadowOffset: 5,
	        shadowOpacity: 0.5
		    })),
		    label = this.label = new Kinetic.Label({
		      y: -5
		    });

    this.chart = chart;
    label.add(tag).add(text);  
    group.add(node).add(label);
    chart.interactionLayer.add(group);

    this._bind();
  };

  Meteor.Tooltip.prototype = {
    _bind: function() {
      var chart = this.chart,
          stage = chart.stage;
      
      stage.on(MOUSEMOVE, function() {
        chart.pointerMove();
      }); 
      
      stage.on(TOUCHMOVE, function() {
        chart.pointerMove();
      }); 
    }
  };
})();