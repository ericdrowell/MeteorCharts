(function() {
  var SECONDS_IN_MINUTE = 60,
      SECONDS_IN_HOUR = 3600,
      SECONDS_IN_DAY = 86400,
      SECONDS_IN_MONTH = 2628000,
      SECONDS_IN_YEAR = 31500000;

  MeteorChart.Date = function() {
    MeteorChart.Formatter.apply(this, arguments);
    this.increment = this.getIncrement();
    this.incrementMultiplier = 1;
    this._setIncrementMultiplier();
  };

  MeteorChart.Date.prototype = {
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
    },
    start: function() {
      this.mn = moment.utc(this.min * 1000).endOf(this.increment);
      return this.mn.unix();
    },
    next: function() {
      this.mn.add(this.increment, this.incrementMultiplier);
      return this.mn.unix();
    },
    getIncrement: function() {
      var range = this.range;
      if (range < SECONDS_IN_MINUTE) {
        return 'second'; // seconds
      }
      else if (range < SECONDS_IN_HOUR) {
        return 'minute'; // minute
      }
      else if (range < SECONDS_IN_DAY) {
        return 'hour'; // hour
      }
      else if (range < SECONDS_IN_MONTH) {
        return 'day'; // day
      }
      else if (range < SECONDS_IN_YEAR) {
        return 'month';  // month
      }
      else {
        return 'year'; // year
      }
    },
    _setIncrementMultiplier: function() {
      var numIncrements = 0;

      this.each(function() {
        numIncrements++;
      });

      if (numIncrements > this.maxNumberOfLabels) {
        this.incrementMultiplier++;
        this._setIncrementMultiplier();
      }
    }
  };

  Kinetic.Util.extend(MeteorChart.Date, MeteorChart.Formatter);
})();