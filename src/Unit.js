(function() {
  Meteor.Unit = function(range, maxNumberOfLabels, granularityMap) {
    this.range = range;
    this.maxNumberOfLabels = maxNumberOfLabels;
    this.granularityMap = granularityMap;
    this.setGranularity();
  };

  Meteor.Unit.prototype = {
    getIncrement: function() {
      var increment = this.granularityMap[this.granularity],
          smallestIncrement = Math.round(this.range / this.maxNumberOfLabels / increment) * increment;

      if (this.range / this.maxNumberOfLabels > smallestIncrement) {
        console.log('problem')
      }

      return smallestIncrement;
    }
  };

})();