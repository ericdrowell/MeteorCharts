(function() {
  var RED = '#9d3132',
      ORANGE = '#cd7d39',
      DARK_BLUE = '#0a2634',
      LIGHT_YELLOW = '#efe5c0',
      WHITE = '#ffffff';

  MeteorChart.Themes.Lollapalooza = {
    background: DARK_BLUE,
    primary: LIGHT_YELLOW,
    secondary: MeteorChart.Color.hexToRgba(LIGHT_YELLOW, 0.2),
    font: {
      family: 'Arial',
      size: 12
    },
    data: [RED, ORANGE]
  };
})();