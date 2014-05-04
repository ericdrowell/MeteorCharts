(function() {
  MeteorChart.Component.extend('LineSeries', {
    init: function() {
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');

      this.content.style.overflow = 'hidden';
      this.content.appendChild(this.canvas);

      this._bind();
    },
    _render: function() {
      var data = this.get('data', this),
          series = data.series,
          unit = data.unit || {},
          len = series.length,
          context = this.context,
          zoomX = data.zoomX || 1,
          zoomY = data.zoomY || 1,
          n, line, points, i, pointsLen, viewport;

      //MeteorChart.log('render ' + this.id)

      this._setMinMaxScale();

      // update formatters
      this.formatterX = new MeteorChart.Formatters[unit.x || 'Number'](this.minX, this.minY);
      this.formatterY = new MeteorChart.Formatters[unit.y || 'Number'](this.maxX, this.maxY);

      // render
      context.clearRect(0, 0, this.get('width', this), this.get('height'));
      this.canvas.width = this.get('width', this);
      this.canvas.height = this.get('height');

      for (n=0; n<len; n++) {
        points = series[n].points;
        pointsLen = points.length;

        context.save();

        context.translate(this.get('width', this) / 2, this.get('height') / 2);
        context.scale(this.scaleX, this.scaleY * -1);
        context.scale(zoomX, zoomY);
        context.translate(this.minX * -1, this.minY * -1);
        context.translate(this.get('width', this) / (this.scaleX * -2), this.get('height') / (this.scaleY * -2));
        context.beginPath();
        context.moveTo(points[0], points[1]);

        for (i = 2; i<pointsLen; i+=2) {
          context.lineTo(points[i], points[i+1]);
        }

        context.restore();
        context.strokeStyle = MeteorChart.Color.getDataColor(this.chart.theme.data, n);
        context.lineWidth = 2;
        context.stroke();
      } 
    },
    shift: function(num) {
      if (num === undefined) {
        num = 1;
      }

      for (var n=0; n<num; n++) {
        this.get('data', this).series.shift();
      }
    },
    push: function(ser) {
      if (MeteorChart.Util._isArray(ser)) {
        for (var n=0; n<ser.length; n++) {
          this.push(ser[n]);
        }
      }
      else {
        this.get('data', this).series.push(ser);
      }
    },
    getPointsMinMax: function(points) {
      var minX = Infinity,
          minY = Infinity,
          maxX = Infinity * -1,
          maxY = Infinity * -1,
          len = points.length,
          n, x, y;

      for (n=0; n<len; n+=2) {
        point = points[n];
        x = points[n];
        y = points[n+1];
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      } 

      return {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      };
    },
    getSeriesMinMax: function() {
      var series = this.get('data', this).series,
          minX = Infinity,
          minY = Infinity,
          maxX = Infinity * -1,
          maxY = Infinity * -1,
          len = series.length,
          n, viewport;

      for (n=0; n<len; n++) {
        viewport = this.getPointsMinMax(series[n].points);
        minX = Math.min(minX, viewport.minX);
        minY = Math.min(minY, viewport.minY);
        maxX = Math.max(maxX, viewport.maxX);
        maxY = Math.max(maxY, viewport.maxY);
      } 

      return {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      };
    },
    dataToChartX: function(x) {
      return (x - this.minX) * this.scaleX;
    },
    dataToChartY: function(y) {
      return this.get('height') - ((y - this.minY) * this.scaleY);
    },
    dataToChart: function(x, y) {
      return {
        x: this.dataToChartX(x),
        y: this.dataToChartY(y)
      }; 
    },
    chartToDataX: function(x) {
      return (x / this.scaleX) + this.minX;
    },
    chartToDataY:function(y) {
      return this.minY - ((y - this.get('height')) / this.scaleY);
    },
    chartToData: function(x, y) {
      return {
        x: this.chartToDataX(x),
        y: this.chartToDataY(y)
      };
    },
    getSeriesNearestPointX: function(n, x) {
      var dataX = this.chartToDataX(x),
          data = this.get('data', this),
          series = data.series,
          shortestDistance = Infinity,
          nearestPoint = null,
          i, ser, points, point, pointsLen, title, chartDistance;

      ser = series[n];
      points = ser.points;
      title = ser.title;
      pointsLen = points.length;

      for (i=0; i<pointsLen; i+=2) {
        point = {
          x: points[i], 
          y: points[i+1]
        };

        chartDistance = Math.abs(dataX - point.x);

        if (chartDistance < shortestDistance) {
          nearestPoint = {
            dataX: point.x,
            dataY: point.y,
            title: title
          };

          shortestDistance = chartDistance;

        }
      }

      // decorate
      if (nearestPoint) {
        nearestPoint.x = this.dataToChartX(nearestPoint.dataX),
        nearestPoint.y = this.dataToChartY(nearestPoint.dataY)
      }

      return nearestPoint;
    },
    getNearestPoint: function(x, y) {
      var dataPos = this.chartToData(x, y),
          data = this.get('data', this),
          series = data.series,
          len = series.length,
          shortestDistance = Infinity,
          nearestPoint = null,
          squaredDistanceBetweenPoints = MeteorChart.Util.squaredDistanceBetweenPoints,
          n, i, ser, points, point, pointsLen, title, chartDistance;
   
      for (n=0; n<len; n++) {
        ser = series[n];
        points = ser.points;
        title = ser.title;
        pointsLen = points.length;

        for (i=0; i<pointsLen; i+=2) {
          point = {
            x: points[i], 
            y: points[i+1]
          };

          chartDistance = squaredDistanceBetweenPoints(point, dataPos);

          if (chartDistance < shortestDistance) {
            nearestPoint = {
              dataX: point.x,
              dataY: point.y,
              title: title
            }

            shortestDistance = chartDistance;
          }
        }
      }

      // decorate
      if (nearestPoint) {
        nearestPoint.x = this.dataToChartX(nearestPoint.dataX),
        nearestPoint.y = this.dataToChartY(nearestPoint.dataY)
      }

      // don't return nearest point if too far away
      // if (nearestPoint) {
      //   if (squaredDistanceBetweenPoints(nearestPoint, dataPos) > 50*50) {
      //     nearestPoint = null;
      //   }
      // }

      return nearestPoint;
    },
    _bind: function() {
      var that = this,
          content = this.content,
          contentPos;

      content.addEventListener('mousemove', MeteorChart.Util._throttle(function(evt) {
        contentPos = MeteorChart.Dom.getElementPosition(content);

        that.fire('mousemove', {
          x: evt.clientX - contentPos.x,
          y: evt.clientY - contentPos.y
        });
      }, 17));

      content.addEventListener('mouseout', function(evt) {
        that.fire('mouseout');
      });
    },
    _setMinMaxScale: function() {
      var viewport = this.getSeriesMinMax(),
          width = this.get('width', this),
          height = this.get('height'),
          diffX = viewport.maxX - viewport.minX,
          diffY = viewport.maxY - viewport.minY,
          scaleX = width / diffX,
          scaleY = height / diffY;

      this.minX = viewport.minX;
      this.minY = viewport.minY;
      this.maxX = viewport.maxX;
      this.maxY = viewport.maxY;
      this.scaleX = scaleX;
      this.scaleY = scaleY;
    }
  });
})();