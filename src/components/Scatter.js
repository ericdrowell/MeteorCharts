(function() {
  MeteorChart.Component.extend('Scatter', {
    defaults: {
      style: {
        nodeShape: 'circle',
        filled: true,
        nodeSize: 10,
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
          width = this.get('width'),
          height = this.get('height'),
          scale = this._getScale(),
          scaleX = scale.x,
          scaleY = scale.y,
          viewport = this.get('viewport'),
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
          style = this.get('style'),
          nodeShape = style.nodeShape,
          filled = style.filled,
          lineWidth = style.lineWidth,
          nodeSize = style.nodeSize,
          backgroundColor = this.chart.theme.background;
          width = this.get('width'),
          height = this.get('height'),
          scale = this._getScale(),
          scaleX = scale.x,
          scaleY = scale.y,
          viewport = this.get('viewport'),
          _x = x * scaleX,
          _y = y * scaleY;

      context.save();
      context.translate(0, height);
      context.scale(1, -1);
      context.beginPath();
      
      if (nodeShape === 'circle') {
        context.arc(_x, _y, nodeSize / 2, 0, Math.PI * 2, false);

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
})();