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
    }
  });

  MeteorChart.Components.Scatter.prototype = MeteorChart.Util._extend(MeteorChart.Components.Scatter.prototype, MeteorChart.Data.Points);
})();