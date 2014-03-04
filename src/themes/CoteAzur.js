(function() {
  var RED = '#eb5233',
      GREEN = '#419091',
      LIGHT_YELLOW = '#fffefb',
      DARK_BLUE = '#31353d';

  MeteorChart.Themes.CoteAzur = {
    primary: LIGHT_YELLOW,
    secondary: DARK_BLUE,
    ternary: MeteorChart.Util.hexToRgba(DARK_BLUE, 0.2),
    font: {
      family: 'Arial',
      size: 12
    },
    data: [RED, GREEN]
  };
})();