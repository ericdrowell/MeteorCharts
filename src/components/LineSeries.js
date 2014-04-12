(function() {
  MeteorChart.Component.extend('LineSeries', {
    init: function() {
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');

      // add canvas to the content container
      this.content.appendChild(this.canvas);
    },
    render: function() {
      var data = this.data(),
          unit = data.unit || {},
          len = data.length,
          context = this.context,
          n, line, points, i, pointsLen, viewport;

      // recalculate range and scale
      viewport = MeteorChart.Util.getSeriesMinMax(data);
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

      for (n=0; n<len; n++) {
        points = data[n].points;
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
    resizeContent: function() {
      this.canvas.width = this.width();
      this.canvas.height = this.height();
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