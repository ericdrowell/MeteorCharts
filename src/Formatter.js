(function() {
  MeteorCharts.Formatter = function(min, max, maxCount, granularityMap) {
    this.min = min;
    this.max = max;
    this.maxCount = maxCount;
  };

  MeteorCharts.Formatter.prototype = {
    getIncrement: function() {
      var range = this.max - this.min,
          increments = this.increments(),
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

      return increment;
    },
    getLongestValue: function() {
      return Math.max(
        Math.abs(this.max), 
        Math.abs(this.min)
      );
    }
  };

})();