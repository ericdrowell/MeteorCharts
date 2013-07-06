(function() {
	var SECONDS_IN_YEAR = 31536000,
      SECONDS_IN_MONTH = 2628000,
      SECONDS_IN_DAY = 86400,
      SECONDS_IN_HOUR = 3600,
      SECONDS_IN_MINUTE = 60,
      GRANULARITY_TO_SECONDS = [
        SECONDS_IN_YEAR, 
        SECONDS_IN_MONTH, 
        SECONDS_IN_DAY, 
        SECONDS_IN_HOUR, 
        SECONDS_IN_MINUTE
      ],
      GRANULARITIES = {
        YEAR: 0,
        MONTH: 1,
        DAY: 2,
        HOUR: 3,
        MINUTE: 4,
        SECOND: 5 
      };

  Meteor.Timestamp = function() {
    this.setGranularity();
  };

  Meteor.Timestamp.prototype = {
    setGranularity: function(smallestIncrement) {
      var granularity = GRANULARITIES.SECOND;

      if (smallestIncrement > SECONDS_IN_MINUTE) {
        granularity = GRANULARITIES.MINUTE;
      }
      if (smallestIncrement > SECONDS_IN_HOUR) {
        granularity = GRANULARITIES.HOUR;
      }
      if (smallestIncrement > SECONDS_IN_DAY) {
        granularity = GRANULARITIES.DAY;
      }
      if (smallestIncrement > SECONDS_IN_MONTH) {
        granularity = GRANULARITIES.MONTH;
      }
      if (smallestIncrement > SECONDS_IN_YEAR) {
        granularity = GRANULARITIES.YEAR;
      }

      this.granularity = granularity;
    },
    getIncrement: function() {
      return GRANULARITY_TO_SECONDS[this.granularity];
    },
    getFormattedShort: function(time) {
      var date = new Date(time);
      switch(this.granularity) {
        case 0: return date.format('yyyy'); // year
        case 1: return date.format('yy mmm');  // month
        case 2: return date.format('mmm dd'); // day
        case 3: return date.format('ddd htt'); // hours
        case 4: return date.format('h:MMtt'); // minute
        default: return date.format('MM:sstt'); // seconds
      }
    }
  };
})();