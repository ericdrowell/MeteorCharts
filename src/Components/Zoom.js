(function() {
	var MOUSEDOWN = 'mousedown',
	    MOUSEMOVE = 'mousemove',
	    MOUSEUP = 'mouseup';

  Meteor.Zoom = function(chart) {
	  var chart = this.chart = chart,
	      skin = chart.skin;

    this.selecting = false;
	  this.startX = 0;
	  this.startY = 0;

	  this.rect = new Kinetic.Rect(Meteor.Util.merge(skin.select, {
      strokeScaleEnabled: false,
      width: 0,
      height: 0,
      visible: false
    }));

    chart.interactionLayer.add(this.rect);

    this._bind();
  };

  Meteor.Zoom.prototype = {
    _bind: function() {
      var that = this,
          stage = this.chart.stage,
          content = stage.getContent(),
          chart = this.chart;
      
      content.addEventListener(MOUSEDOWN, function() {
      	that._startZoomSelect();
      }); 

      content.addEventListener(MOUSEMOVE, function() {
        that._resizeZoomSelect();
      }); 

      content.addEventListener(MOUSEUP, function() {
      	that._endZoomSelect();
      }); 
    },
    _startZoomSelect: function() {
    	var pos = this.chart.stage.getPointerPosition();
    	this.startX = pos.x;
    	this.startY = pos.y;
    	this.rect.setPosition(pos);
      this.selecting = true;
      this.rect.setVisible(true);
    },
    _resizeZoomSelect: function() {
    	if (this.selecting) {
	    	var pos = this.chart.stage.getPointerPosition();
	    	this.rect.setWidth(pos.x - this.startX);
	    	this.rect.setHeight(pos.y - this.startY);
    	}
    },
    _endZoomSelect: function() {
      this.selecting = false;
      this.startX = 0;
      this.startY = 0;
      this.rect.setSize(0);
      this.rect.setVisible(false);
    }
  };
})();