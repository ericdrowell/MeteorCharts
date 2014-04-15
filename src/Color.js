(function() {
  MeteorChart.Color = {
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
    } 
  }
})();