(function() {
  var WHITE = 'white',
      GRAY = '#555555',
      BLUE = '#3c84d5',
      GREEN = '#99b42a',
      RED = '#841f18',
      DARK_BLUE = '#102439';

  MeteorChart.Themes.HiCharts = {
    background: WHITE,
    primary: GRAY,
    secondary: MeteorChart.Color.hexToRgba(GRAY, 0.2),
    fontFamily: 'Arial',
    fontSize: 12,
    padding: 20,
    data: [BLUE, GREEN, RED, DARK_BLUE]
  };
})();