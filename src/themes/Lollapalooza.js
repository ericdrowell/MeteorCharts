(function() {
  var RED = '#9d3132',
      ORANGE = '#cd7d39',
      DARK_BLUE = '#0a2634',
      LIGHT_YELLOW = '#efe5c0';

  MeteorChart.Themes.Lollapalooza = {
    background: {
      primary: DARK_BLUE,
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
      fonts: {
        small: {
          fontFamily: 'Arial',
          fontSize: 12,
          fill: DARK_BLUE
        },
        medium: {
          fontFamily: 'Arial',
          fontSize: 15,
          fill: DARK_BLUE
        },
        large: {
          fontFamily: 'Arial',
          fontSize: 30,
          fill: DARK_BLUE
        }
      }
    },
    // red, orange
    data: [RED, ORANGE]
  };
})();