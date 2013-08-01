(function() {
  MeteorCharts.Seconds = function(min, max, maxNumberOfLabels) {
    MeteorCharts.Unit.call(this, min, max, maxNumberOfLabels);
  };

  MeteorCharts.Seconds.prototype = {
    formatShort: function(seconds) {
      var polarity = seconds < 0 ? '-' : '',
          newSeconds = Math.abs(seconds),
          date = new Date(newSeconds * 1000),
          max = Math.abs(this.max),
          str = '';

      // seconds in minute
      if (max < 60) {
        str = date.format('UTC:ss"s"');
      }
      // seconds in hour
      else if (max < 3600) {
        str = date.format('UTC:MM:ss"m"');
      }
      // seconds in day
      else if (max < 86400) {
        str = date.format('UTC:HH:MM"h"');
      }
      // seconds in month
      else if (max < 2628000) {
        str = date.format('UTC:d"d" H"h"'); 
      }
      // seconds in year
      else { 
        str = date.format('UTC:m"m" d"d"'); 
      }

      return polarity + str;
    },
    increments: function() {
      return [
        0,
        1, // 1 second
        2,
        5,
        10, 
        15, 
        30,
        60, // 1 minute
        90, 
        60 * 2,
        60 * 5,
        60 * 10,
        60 * 15,
        60 * 20,
        60 * 30, 
        60 * 60, // 1 hour
      ]
    }
  };

  MeteorCharts.Util.extend(MeteorCharts.Seconds, MeteorCharts.Unit);
})();