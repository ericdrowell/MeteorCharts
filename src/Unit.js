(function() {
  // constants
  ROUNDED_INCREMENTS = [
    0,
    1,
    2,
    5,
    10,
    15,
    30,
    60
  ],
  
  // cached variables
  roundedIncrementsLength = ROUNDED_INCREMENTS.length;

  Meteor.Unit = function(range, maxNumberOfLabels, granularityMap) {
    this.range = range;
    this.maxNumberOfLabels = maxNumberOfLabels;
    this.granularityMap = granularityMap;
    this.setGranularity();
  };

  Meteor.Unit.prototype = {
    getIncrement: function() {
      var increment = this.granularityMap[this.granularity],
          range = this.range,
          maxNumberOfLabels = this.maxNumberOfLabels,
          smallestIncrement = range / maxNumberOfLabels;
          smallestIncrementAdj = Math.round(smallestIncrement / increment) * increment;
          returnIncrement = smallestIncrementAdj,
          n;

      for (n=0; n<roundedIncrementsLength; n++) {
      	returnIncrement = smallestIncrementAdj + ROUNDED_INCREMENTS[n];
      	if (smallestIncrement <= returnIncrement) {
          return returnIncrement
      	}
      }

      return smallestIncrementAdj;
    }
  };

})();