(function() {
  MeteorChart.Component.extend('LineSeries', {
    defaults: {
      zoomX: 1,
      zoomY: 1
    },
    init: function() {
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');

      this.content.style.overflow = 'hidden';
      this.content.appendChild(this.canvas);

      this._bind();
    },
    _render: function() {
      var data = this.get('data'),
          series = data.series,
          unit = data.unit || {},
          len = series.length,
          context = this.context,
          zoomX = this.get('zoomX'),
          zoomY = this.get('zoomY'),
          n, line, points, i, pointsLen, viewport;

      //MeteorChart.log('render ' + this.id)

      this._setMinMaxScale();

      // render
      context.clearRect(0, 0, this.get('width'), this.get('height'));
      this.canvas.width = this.get('width');
      this.canvas.height = this.get('height');

      for (n=0; n<len; n++) {
        points = series[n].points;
        pointsLen = points.length;

        context.save();

        context.translate(this.get('width') / 2, this.get('height') / 2);
        context.scale(this.scaleX, this.scaleY * -1);
        context.scale(zoomX, zoomY);
        // commenting the line below fixes zoom
        context.translate(this.minX * -1, this.minY * -1);
        context.translate(this.get('width') / (this.scaleX * -2), this.get('height') / (this.scaleY * -2));

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
        this.get('data').series.shift();
      }
    },
    push: function(ser) {
      if (MeteorChart.Util._isArray(ser)) {
        for (var n=0; n<ser.length; n++) {
          this.push(ser[n]);
        }
      }
      else {
        this.get('data').series.push(ser);
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
    getMinMax: function() {
      var series = this.get('data').series,
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
    getViewportMinMaxX: function() {
      return {
        min: this.getViewportMinX(),
        max: this.getViewportMaxX()
      }
    },
    getViewportMinMaxY: function() {
      return {
        min: this.getViewportMinY(),
        max: this.getViewportMaxY()
      }
    },
    getViewportMinX: function() {
      var zoomX = this.get('zoomX'),
          minMax = this.getMinMax(),
          minX = minMax.minX,
          maxX = minMax.maxX,
          range = maxX - minX,
          viewportRange = range / zoomX;

      return minX + ((range - viewportRange) / 2);
    },
    getViewportMinY: function() {
      var zoomY = this.get('zoomY'),
          minMax = this.getMinMax(),
          minY = minMax.minY,
          maxY = minMax.maxY,
          range = maxY - minY,
          viewportRange = range / zoomY;

      return minY + ((range - viewportRange) / 2);
    },
    getViewportMaxX: function() {
      var zoomX = this.get('zoomX'),
          minMax = this.getMinMax(),
          minX = minMax.minX,
          maxX = minMax.maxX,
          range = maxX - minX,
          viewportRange = range / zoomX;

      return minX + viewportRange + ((range - viewportRange) / 2);
    },
    getViewportMaxY: function() {
      var zoomY = this.get('zoomY'),
          minMax = this.getMinMax(),
          minY = minMax.minY,
          maxY = minMax.maxY,
          range = maxY - minY,
          viewportRange = range / zoomY;

      return minY + viewportRange + ((range - viewportRange) / 2);
    },

    /*
     * convert data to chart coords
     */
    dataToChart: function(x, y) {
      return {
        x: this.dataToChartX(x),
        y: this.dataToChartY(y)
      }; 
    },
    dataToChartX: function(x) {
      return (x - this.minX) * this.scaleX;
    },
    dataToChartY: function(y) {
      return this.get('height') - ((y - this.minY) * this.scaleY);
    },

    /*
     * convert chart to data coords
     */
    chartToData: function(x, y) {
      return {
        x: this.chartToDataX(x),
        y: this.chartToDataY(y)
      };
    },
    chartToDataX: function(x) {
      return ((x - this.get('x')) / this.scaleX) + this.minX;
    },
    chartToDataY:function(y) {
      return this.minY - (((y - this.get('y')) - this.get('height')) / this.scaleY);
    },

    getSeriesNearestPointX: function(n, x) {
      var dataX = this.chartToDataX(x),
          data = this.get('data'),
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
          data = this.get('data'),
          series = data.series,
          len = series.length,
          shortestDistance = Infinity,
          nearestPoint = null,
          squaredDistanceBetweenPoints = MeteorChart.Util.squaredDistanceBetweenPoints,
          n, i, ser, points, point, pointsLen, title, chartDistance;

      //console.log(dataPos.y)
   
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

    },
    _setMinMaxScale: function() {
      var viewport = this.getMinMax(),
          width = this.get('width'),
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