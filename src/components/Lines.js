(function() {
  MeteorChart.Component.extend('Lines', {
    defaults: {
      style: {
        lineWidth: 2
      }
    },
    init: function() {
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');

      this.content.appendChild(this.canvas);
    },
    _render: function() {
      var data = this.get('data'),
          dataLen = data.length,
          context = this.context,
          style = this.get('style'),
          padding = this.chart.theme.padding,
          canvasWidth = this.get('width') + (padding * 2),
          canvasHeight = this.get('height') + (padding * 2),
          scale = this._getScale(),
          scaleX = scale.x,
          scaleY = scale.y,
          viewport = this.get('viewport'),
          width = this.get('width'),
          height = this.get('height'),
          n, line, points, i, pointsLen;

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

        context.save();
        context.translate(0, height);
        context.scale(scaleX, scaleY * -1);
        context.translate(viewport.minX * -1, viewport.minY * -1);
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
    }
  });
})();