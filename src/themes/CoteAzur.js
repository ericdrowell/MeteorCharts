(function() {
  var RED = '#eb5233',
      GREEN = '#419091',
      LIGHT_YELLOW = '#fffefb',
      DARK_BLUE = '#31353d';

  MeteorChart.Themes.CoteAzur = {
    primary: LIGHT_YELLOW,
    secondary: DARK_BLUE,
    // negative values will darken the color
    ternary: MeteorChart.Util.brighten(LIGHT_YELLOW, -0.1),
    font: {
      family: 'Arial',
      size: 12
    },
    data: [RED, GREEN]
  };
})();