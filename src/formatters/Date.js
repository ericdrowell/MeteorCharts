(function() {
  var SECONDS_IN_MINUTE = 60,
      SECONDS_IN_HOUR = 3600,
      SECONDS_IN_DAY = 86400,
      SECONDS_IN_MONTH = 2628000,
      SECONDS_IN_YEAR = 31500000;

  MeteorChart.Formatters.Date = {
    short: function(seconds) {
      var range = this.range,
          date = new moment(seconds * 1000);

      if (range < SECONDS_IN_HOUR) {
        return date.format('h:mma'); // minute
      }
      else if (range < SECONDS_IN_DAY) {
        return date.format('ddd ha'); // hour
      }
      else if (range < SECONDS_IN_MONTH) {
        return date.format('MMM D'); // day
      }
      else if (range < SECONDS_IN_YEAR) {
        return date.format('MMM YYYY');  // month
      }
      else {
        return date.format('YYYY'); // year
      }
    },
    long: function(seconds) {
      var date = date = new moment(seconds * 1000);
      return date.format('MMM D YYYY h:mma'); // day
    }
  };
})();