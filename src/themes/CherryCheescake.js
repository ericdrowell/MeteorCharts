(function() {
  var RED = '#a9302e',
      DARK_RED = '#461f1e',
      LIGHT_YELLOW = '#f5e19b',
      CREME = '#fcf9e2',
      LIGHT_BROWN = '#9f732f';

  MeteorChart.Themes.CherryCheescake = {
    background: CREME,
    primary: LIGHT_BROWN,
    secondary: MeteorChart.Color.hexToRgba(LIGHT_BROWN, 0.2),
    font: {
      family: 'Arial',
      size: 12
    },
    data: [RED]
  };
})();