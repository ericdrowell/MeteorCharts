(function() {
  var RED = '#882405',
      GREEN = '#598465',
      LIGHT_YELLOW = '#feeda9',
      ORANGE = '#f5b04e',
      BURNT_ORANGE = '#a95234';

  MeteorChart.Themes.Firenze = {
    primary: RED,
    secondary: LIGHT_YELLOW,
    ternary: MeteorChart.Util.hexToRgba(LIGHT_YELLOW, 0.3),
    font: {
      family: 'Arial',
      size: 12
    },
    data: [ORANGE]
  };
})();