(function() {
  var SECONDS_IN_MINUTE = 60,
      SECONDS_IN_HOUR = 3600,
      SECONDS_IN_DAY = 86400,
      SECONDS_IN_MONTH = 2628000,
      SECONDS_IN_YEAR = 31500000,

  mn;

  MeteorCharts.Date = function(min, max, maxNumberOfLabels) {
    MeteorCharts.Formatter.call(this, min, max, maxNumberOfLabels);
    this.base = 60;
  };

  MeteorCharts.Date.prototype = {
    formatShort: function(seconds) {
      var range = this.range,
          date = new Date(seconds * 1000);

      if (range < SECONDS_IN_MINUTE) {
        return date.format('MM:sstt'); // seconds
      }
      else if (range < SECONDS_IN_HOUR) {
        return date.format('h:MMtt'); // minute
      }
      else if (range < SECONDS_IN_DAY) {
        return date.format('ddd htt'); // hour
      }
      else if (range < SECONDS_IN_MONTH) {
        return date.format('mmm dd'); // day
      }
      else if (range < SECONDS_IN_YEAR) {
        return date.format('mmm yyyy');  // month
      }
      else {
        return date.format('yyyy'); // year
      }
    },
    start: function(ts) {
      mn = moment(ts * 1000).startOf('month');
      return mn.format('X');
    },
    next: function() {
      mn.add('month', 2);
      return mn.format('X');
    }
  };

  MeteorCharts.Util.extend(MeteorCharts.Date, MeteorCharts.Formatter);
})();