(function() {
  var DBLCLICK = 'dblclick',
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
          chart = this.chart,
          stage = chart.stage,
          skin = chart.skin;

      stage.on(DBLCLICK, function() {
        skin.xAxis.min = 'auto';
        skin.xAxis.max = 'auto';
        skin.yAxis.min = 'auto';
        skin.yAxis.max = 'auto';
        chart.sync();
      });
    },
    _startZoomSelect: function() {
      var chart = this.chart,
          pos = chart.stage.getPointerPosition(),
          behavior = chart.behavior,
          type = behavior.select && behavior.select.type ? behavior.select.type : 'box';

      this.selecting = true;
      this.startX = pos.x;
      this.startY = type === 'box' ? pos.y : chart.dataY;
      this.rect.setPosition(this.startX, this.startY);
    },
    _resizeZoomSelect: function() {
      var rect = this.rect,
          chart = this.chart,
          pos, behavior, type;

      if (this.selecting) {
          pos = chart.stage.getPointerPosition();
          behavior = chart.behavior;
          type = behavior.select && behavior.select.type ? behavior.select.type : 'box';

        this.rect.setWidth(pos.x - this.startX);
        this.rect.setHeight(type === 'box' ? pos.y - this.startY : chart.dataHeight);

        if (!rect.isVisible()) {
          rect.setVisible(true);
        }
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
          skin = chart.skin,
          behavior = chart.behavior,
          type = behavior.select && behavior.select.type ? behavior.select.type : 'box';
          pos = chart.stage.getPointerPosition(),
          startX = this.startX,
          startY = this.startY,
          rect = this.rect,
          chartMinX = Math.min(startX, pos.x),
          chartMinY = type === 'box' ? Math.max(startY, pos.y) : chart.dataY + chart.dataHeight,
          chartMaxX = Math.max(startX, pos.x),
          chartMaxY = type === 'box' ? Math.min(startY, pos.y) : chart.dataY,
          min = chart.chartToData(chartMinX, chartMinY),
          max = chart.chartToData(chartMaxX, chartMaxY);

      //console.log(min.x + ',' + max.x);
      //console.log(min.y + ',' + max.y)

      if (Math.abs(chartMaxX - chartMinX) > MIN_ZOOM_SIZE && Math.abs(chartMaxY - chartMinY) > MIN_ZOOM_SIZE) {
        skin.xAxis.min = min.x;
        skin.yAxis.min = min.y;
        skin.xAxis.max = max.x;
        skin.yAxis.max = max.y;
        chart.sync();
      }

    }
  };
})();