(function() {
  var SECONDS_IN_MINUTE = 60,
      SECONDS_IN_HOUR = 3600,
      SECONDS_IN_DAY = 86400,
      SECONDS_IN_MONTH = 2628000,
      SECONDS_IN_YEAR = 31500000;

  MeteorCharts.Seconds = function(min, max, maxNumberOfLabels) {
    MeteorCharts.Formatter.call(this, min, max, maxNumberOfLabels);
    this.base = 60
  };

  MeteorCharts.Seconds.prototype = {
    formatShort: function(seconds) {
      var polarity = seconds < 0 ? '-' : '',
          newSeconds = Math.abs(seconds),
          date = new Date(newSeconds * 1000),
          str = '',
          longestValue = this.getLongestValue();

      if (longestValue < SECONDS_IN_MINUTE) {
        str = date.format('UTC:ss"s"');
      }
      else if (longestValue < SECONDS_IN_HOUR) {
        str = date.format('UTC:MM:ss"m"');
      }
      else if (longestValue < SECONDS_IN_DAY) {
        str = date.format('UTC:HH:MM"h"');
      }
      else if (longestValue < SECONDS_IN_MONTH) {
        str = date.format('UTC:d"d" H"h"'); 
      }
      else { 
        str = date.format('UTC:m"m" d"d"'); 
      }

      return polarity + str;
    }
  };

  MeteorCharts.Util.extend(MeteorCharts.Seconds, MeteorCharts.Formatter);
})();