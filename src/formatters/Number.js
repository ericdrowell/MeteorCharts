(function() {
  function addCommas(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }

  MeteorCharts.Number = function() {
    MeteorCharts.Formatter.apply(this, arguments);
    this.base = 10;
    this.increment = this.getIncrement();
  };

  MeteorCharts.Number.prototype = {
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
      return addCommas(num);
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

  MeteorCharts.Util.extend(MeteorCharts.Number, MeteorCharts.Formatter);
})();