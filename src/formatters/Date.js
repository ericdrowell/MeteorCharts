(function() {
  var SECONDS_IN_MINUTE = 60,
      SECONDS_IN_HOUR = 3600,
      SECONDS_IN_DAY = 86400,
      SECONDS_IN_MONTH = 2628000,
      SECONDS_IN_YEAR = 31500000;

  var UNIT_MAP = {};
  UNIT_MAP[1] = 'second';
  UNIT_MAP[SECONDS_IN_MINUTE] = 'minute';
  UNIT_MAP[SECONDS_IN_HOUR] = 'hour';
  UNIT_MAP[SECONDS_IN_DAY] = 'day';
  UNIT_MAP[SECONDS_IN_MONTH] = 'month';
  UNIT_MAP[SECONDS_IN_YEAR] = 'year';

  MeteorChart.Formatters.Date = function() {
    MeteorChart.Formatter.apply(this, arguments);
    this.incrementMultiplier = 1;
    this._setIncrementMultiplier();
  };

  MeteorChart.Formatters.Date.prototype = {
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
      this.mn = moment.utc(this.min * 1000).endOf(UNIT_MAP[this.increment]);
      return this.mn.unix();
    },
    next: function() {
      this.mn.add(UNIT_MAP[this.increment], this.incrementMultiplier);
      return this.mn.unix();
    },
    _setIncrement: function() {
      var range = this.range,
          inc;

      if (range < SECONDS_IN_MINUTE) {
        inc = 1; // seconds
      }
      else if (range < SECONDS_IN_HOUR) {
        inc = SECONDS_IN_MINUTE; // minute
      }
      else if (range < SECONDS_IN_DAY) {
        inc = SECONDS_IN_HOUR; // hour
      }
      else if (range < SECONDS_IN_MONTH) {
        inc = SECONDS_IN_DAY; // day
      }
      else if (range < SECONDS_IN_YEAR) {
        inc = SECONDS_IN_MONTH;  // month
      }
      else {
        inc = SECONDS_IN_YEAR; // year
      }

      this.increment = inc;
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

  Kinetic.Util.extend(MeteorChart.Formatters.Date, MeteorChart.Formatter);
})();