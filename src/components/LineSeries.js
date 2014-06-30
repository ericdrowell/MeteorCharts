(function() {
  MeteorChart.Component.extend('LineSeries', {
    defaults: {
      style: {
        nodeType: 'none',
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
      var data = this.get('data'),
          series = data,
          len = series.length,
          context = this.context,
          style = this.get('style'),
          nodeType = style.nodeType, 
          padding = this.chart.theme.padding,
          canvasWidth = this.get('width') + (padding * 2),
          canvasHeight = this.get('height') + (padding * 2),
          n, line, points, i, pointsLen, viewport;

      this._setScale();

      // render
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
      this.canvas.style.marginLeft = '-' + padding + 'px';
      this.canvas.style.marginTop = '-' + padding + 'px';

      context.save();
      context.translate(padding, padding);

      for (n=0; n<len; n++) {
        points = series[n].points;
        pointsLen = points.length;

        context.save();
        context.translate(this.get('width') / 2, this.get('height') / 2);
        context.scale(this.scaleX, this.scaleY * -1);
        context.translate(this.get('viewport').minX * -1, this.get('viewport').minY * -1);
        context.translate(this.get('width') / (this.scaleX * -2), this.get('height') / (this.scaleY * -2));


        context.beginPath();
        context.moveTo(points[0], points[1]);
        for (i = 2; i<pointsLen; i+=2) {
          context.lineTo(points[i], points[i+1]);
        }

        context.restore();
        context.strokeStyle = this.getDataColor(n);
        context.lineWidth = style.lineWidth;
        context.stroke();
      } 

      context.restore();
    },
    shift: function(num) {
      if (num === undefined) {
        num = 1;
      }

      for (var n=0; n<num; n++) {
        this.get('data').shift();
      }
    },
    push: function(ser) {
      if (MeteorChart.Util._isArray(ser)) {
        for (var n=0; n<ser.length; n++) {
          this.push(ser[n]);
        }
      }
      else {
        this.get('data').push(ser);
      }
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
      return (x - this.get('viewport').minX) * this.scaleX;
    },
    dataToChartY: function(y) {
      return this.get('height') - ((y - this.get('viewport').minY) * this.scaleY);
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
      return ((x - this.get('x')) / this.scaleX) + this.get('viewport').minX;
    },
    chartToDataY:function(y) {
      return this.get('viewport').minY - (((y - this.get('y')) - this.get('height')) / this.scaleY);
    },

    getSeriesNearestPointX: function(n, x) {
      var dataX = this.chartToDataX(x),
          data = this.get('data'),
          series = data,
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
          series = data,
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
    _setScale: function() {
      var viewport = this.get('viewport'),
          width = this.get('width'),
          height = this.get('height'),
          diffX = viewport.maxX - viewport.minX,
          diffY = viewport.maxY - viewport.minY,
          scaleX = width / diffX,
          scaleY = height / diffY;

      this.scaleX = scaleX;
      this.scaleY = scaleY;
    }
  });
})();