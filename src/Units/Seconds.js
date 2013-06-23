(function() {
  Meteor.Seconds = function(range, maxNumberOfLabels) {
    Meteor.Unit.call(this, range, maxNumberOfLabels);
  };

  Meteor.Seconds.prototype = {
    shortFormatter: function(seconds) {
      var date = new Date(seconds * 1000);

      // seconds in second
      if (seconds < 1) {
        return date.format('MM:ss');
      }
      // seconds in minute
      else if (seconds < 60) {
        return date.format('MM:ss');
      }
      // seconds in hour
      else if (seconds < 3600) {
        return date.format('MM:ss');
      }
      // seconds in day
      else if (seconds < 86400) {
        return date.format('MM:ss');
      }
      // seconds in month
      else if (seconds < 2628000) {
        return date.format('MM:ss'); 
      }
      // seconds in year
      else { 
        return date.format('MM:ss'); 
      }
    },
    increments: function() {
      return [
        0,
        1, // 1 second
        2,
        5,
        10, 
        15, // [5]
        30,
        60, // 1 minute
        90, 
        60 * 2,
        60 * 3, // [10]
        60 * 5,
        60 * 10,
        60 * 15,
        60 * 20,
        60 * 30, // [15]
        60 * 60, // 1 hour
      ]
    }
  };

  Meteor.Util.extend(Meteor.Seconds, Meteor.Unit);
})();