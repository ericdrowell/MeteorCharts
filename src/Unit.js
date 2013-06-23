(function() {
  // constants
  ROUNDED_INCREMENTS = [
    0,
    1,
    2,
    5,
    10, 
    15, // 5
    30,
    60,
    90, 
    60 * 2,
    60 * 3, // 10
    60 * 5,
    60 * 10,
    60 * 15,
    60 * 20,
    60 * 30, // 15
    60 * 60
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
          returnIncrement, n;

      // return largest increment that obeys the max number of labels rule
      for (n=0; n<roundedIncrementsLength; n++) {
      	returnIncrement = ROUNDED_INCREMENTS[n];
      	if (returnIncrement >= range / maxNumberOfLabels) {
          return returnIncrement
      	}
      }

      return returnIncrement;
    }
  };

})();