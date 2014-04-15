(function() {
  var RED = '#882405',
      GREEN = '#598465',
      LIGHT_YELLOW = '#feeda9',
      ORANGE = '#f5b04e',
      BURNT_ORANGE = '#a95234';

  MeteorChart.Themes.Firenze = {
    background: RED,
    primary: LIGHT_YELLOW,
    secondary: MeteorChart.Color.hexToRgba(LIGHT_YELLOW, 0.2),
    font: {
      family: 'Arial',
      size: 12
    },
    data: [ORANGE]
  };
})();