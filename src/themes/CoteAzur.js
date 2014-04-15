(function() {
  var RED = '#eb5233',
      GREEN = '#419091',
      LIGHT_YELLOW = '#fffefb',
      DARK_BLUE = '#31353d';

  MeteorChart.Themes.CoteAzur = {
    background: LIGHT_YELLOW,
    primary: DARK_BLUE,
    secondary: MeteorChart.Color.hexToRgba(DARK_BLUE, 0.2),
    font: {
      family: 'Arial',
      size: 12
    },
    data: [RED, GREEN]
  };
})();