(function() {
  var RED = '#833218',
      GREEN = '#598465',
      LIGHT_YELLOW = '#feeda9',
      ORANGE = '#f5b04e',
      BURNT_ORANGE = '#a95234';

  MeteorChart.Themes.Firenze = {
    background: {
      primary: RED,
      fonts: {
        small: {
          fontFamily: 'Arial',
          fontSize: 12,
          fill: LIGHT_YELLOW
        },
        medium: {
          fontFamily: 'Arial',
          fontSize: 15,
          fill: LIGHT_YELLOW
        },
        large: {
          fontFamily: 'Arial',
          fontSize: 30,
          fill: LIGHT_YELLOW
        }
      }
    },
    foreground: {
      primary: LIGHT_YELLOW,
      secondary: 'black',
      fonts: {
        small: {
          fontFamily: 'Arial',
          fontSize: 12,
          fill: RED
        },
        medium: {
          fontFamily: 'Arial',
          fontSize: 15,
          fill: RED
        },
        large: {
          fontFamily: 'Arial',
          fontSize: 30,
          fill: RED
        }
      }
    },
    data: [GREEN, ORANGE]
  };
})();