(function() {
  MeteorChart.Data.Points = {
    getTitles: function() {
      var arr = [],
          data = this.data(),
          len = data.length,
          n;

      for (n=0; n<len; n++) {
        arr.push(data[n].title);
      }

      return arr;
    },
    _bind: function() {
      var that = this;
      this.content.addEventListener('mousemove', MeteorChart.Util._throttle(function(evt) {
        var contentPosition = that.chart.getContentPosition(),
            nearestPoint = that._getNearestPoint(evt.clientX - contentPosition.x, evt.clientY - contentPosition.y);
        that.fire('newTarget', nearestPoint);
      }, 17), false);
    },
    _getNearestPoint: function(x, y) {
      var data = this.data(),
          len = data.length,
          nearestPoints = [],
          n, series, points, nearestPoint;

      for (n=0; n<len; n++) {
        series = data[n];
        nearestPoint = this._getNearestPointX(series.points, x, y);
        nearestPoint.title = series.title;
        nearestPoints.push(nearestPoint);
      }

      return this._getNearestPointY(nearestPoints, y);
    },
    _getNearestPointX: function(points, x) {
      var len = points.length,
          nearestPoint = {},
          minDiffX = Infinity,
          dataX = this.chartToDataX(x),
          n, _dataX, diffX;

      for (n=0; n<len; n+=2) {
        _dataX = points[n];
        diffX = Math.abs(dataX - _dataX);
        if (diffX < minDiffX) {
          nearestPoint.dataX = _dataX;
          nearestPoint.dataY = points[n+1];
          minDiffX = diffX;
        }  
      }

      nearestPoint.x = this.dataToChartX(nearestPoint.dataX);
      nearestPoint.y = this.dataToChartY(nearestPoint.dataY);

      return nearestPoint;
    },
    _getNearestPointY: function(nearestPoints, y) {
      var len = nearestPoints.length,
          minDiffY = Infinity,
          dataY = this.chartToDataY(y),
          nearestPoint = {},
          n, point, _dataY, diffY;

      for (n=0; n<len; n++) {
        point = nearestPoints[n];
        _dataY = point.dataY;

        diffY = Math.abs(dataY - _dataY);
        if (diffY < minDiffY) {
          nearestPoint = point;
          minDiffY = diffY;
        }
      }

      return nearestPoint;
    },
    dataToChart: function(x, y) {
      return {
        x: this.dataToChartX(x),
        y: this.dataToChartY(y)
      }; 
    },
    dataToChartX: function(x) {
      return (x - this.get('viewport').minX) * this._getScale().x;
    },
    dataToChartY: function(y) {
      return this.get('height') - ((y - this.get('viewport').minY) * this._getScale().y);
    },
    chartToData: function(x, y) {
      return {
        x: this.chartToDataX(x),
        y: this.chartToDataY(y)
      };
    },
    chartToDataX: function(x) {
      return ((x - this.get('x')) / this._getScale().x) + this.get('viewport').minX;
    },
    chartToDataY:function(y) {
      return this.get('viewport').minY - (((y - this.get('y')) - this.get('height')) / this._getScale().y);
    }
  };
})();
