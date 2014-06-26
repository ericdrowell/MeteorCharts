(function() {
  MeteorChart.Component.extend('GridLines', {
    defaults: {
      style: {
        lineWidth: 2
      }
    },
    init: function() {
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');

      // add canvas to the content container
      this.content.appendChild(this.canvas);
    },
    _render: function() {
      var theme = this.chart.theme,
          font = theme.font,
          orientation = this.get('orientation') || 'horizontal',
          data = this.get('data'),
          lineWidth = this.get('style').lineWidth,
          context = this.context,
          width = this.get('width'),
          height = this.get('height'),
          padding = theme.padding,
          canvasWidth = width + (padding * 2),
          canvasHeight = height + (padding * 2),
          key, offset;

      if (data) {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvas.style.marginLeft = '-' + padding + 'px';
        this.canvas.style.marginTop = '-' + padding + 'px';

        context.save();
        context.translate(padding, padding);
        context.clearRect(0, 0, width, height);
        context.strokeStyle = this.chart.theme.secondary;
        context.lineWidth = lineWidth;
        context.lineCap = 'round';

        for (key in data) {
          offset = data[key].offset;
          context.beginPath();
          
          if (orientation === 'horizontal') {
            context.moveTo(0, offset);
            context.lineTo(width, offset);
            context.stroke();
          }
          else {
            // vertical
            context.moveTo(offset, 0);
            context.lineTo(offset, height);
            context.stroke();
          } 
        }

        context.restore();
      }
    }
  });
})();