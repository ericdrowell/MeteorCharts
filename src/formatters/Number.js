(function() {
  MeteorChart.Formatters.Number = {
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
      return MeteorChart.Util.addCommas(num);
    }
  };
})();