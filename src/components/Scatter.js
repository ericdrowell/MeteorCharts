(function() {
  var ALL_SHAPES = ['circle'];

  MeteorChart.Component.extend('Scatter', {
    defaults: {
      style: {
        shape: 'circle',
        filled: true,
        size: 10,
        lineWidth: 2
      }
    },
    init: function() {
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');
      this.content.appendChild(this.canvas);

      this._bind();
    },
    _render: function() {
      var data = this.data(),
          dataLen = data.length,
          context = this.context,
          style = this.style(),
          padding = this.chart.theme.padding,
          width = this.width(),
          height = this.height(),
          scale = this._getScale(),
          scaleX = scale.x,
          scaleY = scale.y,
          viewport = this.viewport(),
          canvasWidth = width + (padding * 2),
          canvasHeight = height + (padding * 2),
          n, line, points, i, pointsLen, color;

      // render
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
      this.canvas.style.marginLeft = '-' + padding + 'px';
      this.canvas.style.marginTop = '-' + padding + 'px';

      context.save();
      context.translate(padding, padding);

      for (n=0; n<dataLen; n++) {
        points = data[n].points;
        pointsLen = points.length;
        color = this.getDataColor(n);

        for (i = 0; i<pointsLen; i+=2) {
          this._renderNode(points[i], points[i+1], color);
        }

      } 

      context.restore();
    },
    _renderNode: function(x, y, color) {
      var context = this.context,
          style = this.style(),
          shape = style.shape,
          filled = style.filled,
          lineWidth = style.lineWidth,
          size = style.size,
          backgroundColor = this.chart.theme.background;
          width = this.width(),
          height = this.height(),
          scale = this._getScale(),
          scaleX = scale.x,
          scaleY = scale.y,
          viewport = this.viewport(),
          _x = (x - viewport.minX) * scaleX,
          _y = (y - viewport.minY) * scaleY;

      context.save();
      context.translate(0, height);
      context.scale(1, -1);
      context.beginPath();
      
      if (shape === 'circle') {
        context.arc(_x, _y, size / 2, 0, Math.PI * 2, false);

        if (filled) {
          context.fillStyle = color;
          context.fill();
        }
        else {
          context.strokeStyle = color;
          context.fillStyle = backgroundColor;
          context.lineWidth = lineWidth;
          context.fill();
          context.stroke(); 
        }
      }
      
      context.restore();
    },





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
        var nearestPoint = that._getNearestPoint(evt.clientX, evt.clientY);
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
  });
})();