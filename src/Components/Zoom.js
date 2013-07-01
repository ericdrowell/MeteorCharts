(function() {
	var MOUSEDOWN = 'mousedown',
	    MOUSEMOVE = 'mousemove',
	    MOUSEUP = 'mouseup',
	    MIN_ZOOM_SIZE = 20;

  Meteor.Zoom = function(chart) {
	  var chart = this.chart = chart,
	      skin = chart.skin;

    this.selecting = false;
	  this.startX = 0;
	  this.startY = 0;

	  this.rect = new Kinetic.Rect(Meteor.Util.merge(skin.select, {
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
      this._updateMinMax();
      this.startX = 0;
      this.startY = 0;
      this.rect.setSize(0);
      this.rect.setVisible(false);
    },
    _updateMinMax: function() {
      var chart = this.chart,
          pos = chart.stage.getPointerPosition(),
          startX = this.startX,
          startY = this.startY,
          rect = this.rect,
          chartMinX = Math.min(startX, pos.x),
          chartMinY = Math.max(startY, pos.y),
          chartMaxX = Math.max(startX, pos.x),
          chartMaxY = Math.min(startY, pos.y),
          min = chart.chartToData(chartMinX, chartMinY),
          max = chart.chartToData(chartMaxX, chartMaxY);

      //console.log(min.x + ',' + max.x);
      //console.log(min.y + ',' + max.y)

      if (Math.abs(chartMaxX - chartMinX) > MIN_ZOOM_SIZE && Math.abs(chartMaxY - chartMinY) > MIN_ZOOM_SIZE) {
	      chart.setMinMaxX(min.x, max.x);
	      chart.setMinMaxY(min.y, max.y);
	      chart.sync();
	    }

    }
  };
})();