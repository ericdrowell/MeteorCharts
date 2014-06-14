(function() {
  MeteorChart.Component.extend('GridLines', {
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
          key, offset;

      if (data) {
        this.canvas.width = this.get('width');
        this.canvas.height = this.get('height');
        context.clearRect(0, 0, width, height);
        context.strokeStyle = this.chart.theme.secondary;

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
      }
    }
  });
})();