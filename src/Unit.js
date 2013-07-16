(function() {
  Meteor.Unit = function(min, max, maxNumberOfLabels, granularityMap) {
    this.min = min;
    this.max = max;
    this.maxNumberOfLabels = maxNumberOfLabels;
  };

  Meteor.Unit.prototype = {
    getIncrement: function() {
      var range = this.max - this.min,
          increments = this.increments(),
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

      return increment;
    }
  };

})();