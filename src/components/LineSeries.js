(function() {
  MeteorChart.Component.extend('LineSeries', {
    init: function() {
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');

      // add canvas to the content container
      this.content.appendChild(this.canvas);

      this._bind();
    },
    render: function() {
      var data = this.data(),
          series = data.series,
          unit = data.unit || {},
          len = series.length,
          context = this.context,
          n, line, points, i, pointsLen, viewport;

      // recalculate range and scale
      viewport = MeteorChart.Util.getSeriesMinMax(series);
      this.minX = viewport.minX;
      this.minY = viewport.minY;
      this.maxX = viewport.maxX;
      this.maxY = viewport.maxY;
      this._setScale();

      // update formatters
      this.formatterX = new MeteorChart.Formatters[unit.x || 'Number'](this.minX, this.minY);
      this.formatterY = new MeteorChart.Formatters[unit.y || 'Number'](this.maxX, this.maxY);

      // render
      context.clearRect(0, 0, this.width(), this.height());
      this.canvas.width = this.width();
      this.canvas.height = this.height();
      
      for (n=0; n<len; n++) {
        points = series[n].points;
        pointsLen = points.length;

        context.save();
        context.translate(0, this.height());
        context.scale(this.scaleX, this.scaleY * -1);
        context.translate(this.minX * -1, this.minY * -1);
        context.beginPath();
        context.moveTo(points[0], points[1]);

        for (i = 2; i<pointsLen; i+=2) {
          context.lineTo(points[i], points[i+1]);
        }

        context.restore();
        context.strokeStyle = this.getDataColor(n);
        context.lineWidth = 2;
        context.stroke();
      } 
    },
    dataToChart: function(pos) {
      return {
        x: (pos.x - this.minX) * this.scaleX + this.x(),
        y: this.height() - ((pos.y - this.minY) * this.scaleY) + this.y()
      }; 
    },
    chartToDataX: function(x) {
      return ((x - this.x()) / this.scaleX) + this.minX;
    },
    chartToDataY:function(y) {
      return this.minY - ((y - this.y() - this.height()) / this.scaleY);
    },
    chartToData: function(pos) {
      return {
        x: this.chartToDataX(pos.x),
        y: this.chartToDataY(pos.y)
      };
    },
    getNearestPointX: function(x) {
      var dataX = this.chartToDataX(x),
          data = this.data(),
          series = data.series,
          len = series.length,
          shortestDistance = Infinity,
          nearestPoint = null,
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

          chartDistance = dataX - point.x;

          if (chartDistance < shortestDistance) {
            nearestPoint = point;
            nearestPoint.title = title;
            shortestDistance = chartDistance;
          }
        }
      }

      return nearestPoint;
    },
    _bind: function() {
      var that = this,
          content = this.content,
          contentPos;

      content.addEventListener('mousemove', MeteorChart.Util._throttle(function(evt) {
        contentPos = MeteorChart.Dom.getElementPosition(content);

        that.fire('pointermove', {
          x: evt.clientX - contentPos.x,
          y: evt.clientY - contentPos.y
        });
      }, 17));
    },
    _setScale: function() {
      var x = this.x(),
          y = this.y(),
          width = this.width(),
          height = this.height(),
          minX = this.minX,
          maxX = this.maxX,
          minY = this.minY,
          maxY = this.maxY,
          diffX = maxX - minX,
          diffY = maxY - minY,
          scaleX = width / diffX,
          scaleY = height / diffY;

      this.scaleX = scaleX;
      this.scaleY = scaleY;
    }
  });
})();