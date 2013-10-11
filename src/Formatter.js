(function() {
  var baseIncrements = [
    1,
    2,
    5
  ];

  MeteorCharts.Formatter = function(min, max, maxNumberOfLabels) {
    this.min = min;
    this.max = max;
    this.range = this.max - this.min;
    this.maxNumberOfLabels = maxNumberOfLabels;
  };

  MeteorCharts.Formatter.prototype = {
    getIncrement: function() {
      var range = this.range,
          increments = this._getIncrements(),
          len = increments.length,
          maxNumberOfLabels = this.maxNumberOfLabels,
          increment, n;

      // return largest increment that obeys the max number of labels rule
      for (n=0; n<len; n++) {
        increment = increments[n];

        if (increment >= range / maxNumberOfLabels) {
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

      for (n=0; n<8; n++) {
        for (i=0; i<len; i++) {
          arr.push(baseIncrements[i] * Math.pow(base, n));
        }
      }

      return arr;
    },
    each: function(fun) {
      var n = this.start(),
          max = this.max;

      while (n < max) {
        fun(n);
        n = this.next();
      }
    },
    getLongestValue: function() {
      return Math.max(
        Math.abs(this.max), 
        Math.abs(this.min)
      );
    }
  };

})();