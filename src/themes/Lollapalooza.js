(function() {
  var RED = '#9d3132',
      ORANGE = '#cd7d39',
      DARK_BLUE = '#0a2634',
      LIGHT_YELLOW = '#efe5c0',
      WHITE = '#ffffff';

  MeteorChart.Themes.Lollapalooza = {
    primary: DARK_BLUE,
    secondary: LIGHT_YELLOW,
    ternary: MeteorChart.Util.hexToRgba(WHITE, 0.3),
    font: {
      family: 'Arial',
      size: 12
    },
    data: [RED, ORANGE]
  };
})();