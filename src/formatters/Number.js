(function() {
  MeteorChart.Number = function() {
    MeteorChart.Formatter.apply(this, arguments);
    this.base = 10;
    this.increment = this.getIncrement();
  };

  MeteorChart.Number.prototype = {
    short: function(num) {
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
    long: function(num) {
      return this.addCommas(num);
    },
    start: function() {
      var num = this.min,
          increment = this.increment;
      this.number = num + Math.abs(num % this.increment);
      return this.number;
    },
    next: function() {
      this.number += this.increment;
      return this.number;
    },
  };

  Kinetic.Util.extend(MeteorChart.Number, MeteorChart.Formatter);
})();