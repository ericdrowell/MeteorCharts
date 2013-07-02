(function() {
  Meteor.Seconds = function(min, max, maxNumberOfLabels) {
    Meteor.Unit.call(this, min, max, maxNumberOfLabels);
  };

  Meteor.Seconds.prototype = {
    formatShort: function(seconds) {
      var date = new Date(seconds * 1000),
          max = this.max;

      // seconds in minute
      if (max < 60) {
        return date.format('UTC:ss');
      }
      // seconds in hour
      else if (max < 3600) {
        return date.format('UTC:MM:ss');
      }
      // seconds in day
      else if (max < 86400) {
        return date.format('UTC:HH:MM');
      }
      // seconds in month
      else if (max < 2628000) {
        return date.format('UTC:d"d" H"h"'); 
      }
      // seconds in year
      else { 
        return date.format('UTC:m"m" d"d"'); 
      }
    },
    increments: function() {
      return [
        0,
        1, // 1 second
        2,
        5,
        10, 
        15, 
        30,
        60, // 1 minute
        90, 
        60 * 2,
        60 * 5,
        60 * 10,
        60 * 15,
        60 * 20,
        60 * 30, 
        60 * 60, // 1 hour
      ]
    }
  };

  Meteor.Util.extend(Meteor.Seconds, Meteor.Unit);
})();