(function() {
  Meteor.Seconds = function(min, max, maxNumberOfLabels) {
    Meteor.Unit.call(this, min, max, maxNumberOfLabels);
  };

  Meteor.Seconds.prototype = {
    shortFormatter: function(seconds) {
      var date = new Date(seconds * 1000),
          max = this.max;

      // seconds in second
      if (max < 1) {
        console.log('second');
        return date.format('ss');
      }
      // seconds in minute
      else if (max < 60) {
        console.log('minute');
        return date.format('ss');
      }
      // seconds in hour
      else if (max < 3600) {
        console.log('hour');
        return date.format('MM:ss');
      }
      // seconds in day
      else if (max < 86400) {
        console.log('day');
        return date.format('hh:MM');
      }
      // seconds in month
      else if (max < 2628000) {
        console.log('month');
        return date.format('dd hh'); 
      }
      // seconds in year
      else { 
        console.log('year');
        return date.format('y'); 
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