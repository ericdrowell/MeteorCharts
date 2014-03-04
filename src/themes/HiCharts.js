(function() {
  var WHITE = 'white',
      GRAY = '#555555',
      BLUE = '#3c84d5',
      GREEN = '#99b42a',
      RED = '#841f18',
      DARK_BLUE = '#102439';

  MeteorChart.Themes.HiCharts = {
    primary: WHITE,
    secondary: GRAY,
    ternary: MeteorChart.Util.hexToRgba(GRAY, 0.15),
    font: {
      family: 'Arial',
      size: 12
    },
    data: [BLUE, GREEN, RED, DARK_BLUE]
  };
})();