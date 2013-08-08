(function() {
  var DBLCLICK = 'dblclick',
      MIN_ZOOM_SIZE = 20;

  MeteorCharts.Zoom = function(chart) {
    this.chart = chart;
    this.selecting = false;
    this.startX = 0;
    this.startY = 0;
    this.rect = new Kinetic.Rect({listening: false});

    chart.interactionLayer.add(this.rect);

    this._bind();
  };

  MeteorCharts.Zoom.prototype = {
    style: function() {
      this.rect.setAttrs(MeteorCharts.Util.merge(
        this.chart._view.get('zoom', 'selection'),
        {
          width: 0,
          height: 0
        }
      ));
    },
    _bind: function() {
      var that = this,
          chart = this.chart,
          stage = chart.stage;

      stage.on(DBLCLICK, function() {
        chart.view.xAxis.min = 'auto';
        chart.view.xAxis.max = 'auto';
        chart.view.yAxis.min = 'auto';
        chart.view.yAxis.max = 'auto';
        chart.draw();
      });
    },
    _startZoomSelect: function() {
      var chart = this.chart,
          pos = chart.stage.getPointerPosition(),
          view = chart.view,
          type = chart._view.get('zoom', 'type');

      this.selecting = true;
      this.startX = pos.x;
      this.startY = type === 'box' ? pos.y : chart.dataY;
      this.rect.setPosition(this.startX, this.startY);
    },
    _resizeZoomSelect: function() {
      var rect = this.rect,
          chart = this.chart,
          pos, view, type;

      if (this.selecting) {
          pos = chart.stage.getPointerPosition();
          view = chart.view;
          type = chart._view.get('zoom', 'type');

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
          view = chart.view,
          _view = chart._view,
          type = chart._view.get('zoom', 'type');
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
        _view.set('xAxis', 'min', min.x);
        _view.set('yAxis', 'min', min.y);
        _view.set('xAxis', 'max', max.x);
        _view.set('yAxis', 'max', max.y);
        chart.draw();
      }

    }
  };
})();