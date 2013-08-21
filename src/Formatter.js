(function() {
  var baseIncrements = [
    1,
    2,
    3,
    5,
    10,
    15,
    30,
    50
  ];

  MeteorCharts.Formatter = function(min, max, maxCount) {
    this.min = min;
    this.max = max;
    this.range = this.max - this.min;
    this.maxCount = maxCount;
  };

  MeteorCharts.Formatter.prototype = {
    getIncrement: function() {
      var range = this.range,
          increments = this._getIncrements(),
          len = increments.length,
          maxCount = this.maxCount,
          increment, n;

      // return largest increment that obeys the max number of labels rule
      for (n=0; n<len; n++) {
        increment = increments[n];

        if (increment >= range / maxCount) {
          return increment
        }
      }

      // if we can't determine an increment, then return the range
      return range;
    },
    _getIncrements: function() {
      var arr = [],
      base = this.base,
      len = baseIncrements.length,
      n, i;

      for (n=0; n<7; n++) {
        for (i=0; i<len; i++) {
          arr.push(baseIncrements[i] * Math.pow(base, n));
        }
      }

      return arr;
    },
    getLongestValue: function() {
      return Math.max(
        Math.abs(this.max), 
        Math.abs(this.min)
      );
    }
  };

})();