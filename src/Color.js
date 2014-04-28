(function() {
  MeteorChart.Color = {
    colorToHex: function(color) {
      return color.replace('#', '0x');
    },
    hexToRgba: function(hex, alpha) {
      hex = hex.replace('#', '');

      if (alpha === undefined) {
        alpha = 1;
      }

      var bigint = parseInt(hex, 16),
          r = (bigint >> 16) & 255,
          g = (bigint >> 8) & 255,
          b = bigint & 255,
          a = alpha;

      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    },
    getDataColor: function(colors, n) {
      return colors[n % colors.length];
    },
    getDataHex: function(colors, n) {
      return this.colorToHex(this.getDataColor(colors, n));
    }
  }
})();