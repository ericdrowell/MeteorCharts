(function() {
  MeteorCharts.Number = function(min, max, maxNumberOfLabels) {
    MeteorCharts.Formatter.call(this, min, max, maxNumberOfLabels);
    this.base = 10;
    this.increment = this.getIncrement(max - min);
  };

  MeteorCharts.Number.prototype = {
    formatShort: function(num) {
      var longestValue = this.getLongestValue();

      if (longestValue < 10) {
        return Math.round(num);
      }
      else if (longestValue < 1000) {
        return (Math.round(num * 10)/10);
      }
      // thousands
      else if (longestValue < 1000000) {
        return (Math.round(num / 1000 * 10)/10) + 'k';
      }
      // millions
      else if (longestValue < 1000000000) {
        return (Math.round(num / 1000000 * 10)/10) + 'M';
      }
      // billions
      else {
        return (Math.round(num / 1000000000 * 10)/10) + 'B';
      }
    },
    start: function(num) {
      var increment = this.increment;
      this.number = num + Math.abs(num % this.increment);
      return this.number;
    },
    next: function() {
      this.number += this.increment;
      return this.number;
    },
  };

  MeteorCharts.Util.extend(MeteorCharts.Number, MeteorCharts.Formatter);
})();