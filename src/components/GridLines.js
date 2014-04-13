(function() {
  MeteorChart.Component.extend('GridLines', {
    init: function() {
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');

      // add canvas to the content container
      this.content.appendChild(this.canvas);
    },
    render: function() {
      var theme = this.chart.theme,
          font = theme.font,
          orientation = this.options.orientation || 'horizontal',
          data = this.data(),
          len = data.length,
          lineWidth = this.options.lineWidth,
          context = this.context,
          width = this.width(),
          height = this.height(),
          n, offset;

      context.clearRect(0, 0, width, height);
      context.strokeStyle = MeteorChart.Util.hexToRgba(this.chart.theme.secondary, 0.2);

      for (n=0; n<len; n++) {
        offset = data[n];
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
    },
    resize: function() {
      this.canvas.width = this.width();
      this.canvas.height = this.height();
    }
  });
})();