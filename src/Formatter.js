(function() {
  var baseIncrements = [
    1,
    2,
    5
  ];

  MeteorChart.Formatter = function(min, max, maxIncrements) {
    this.min = min;
    this.max = max;
    this.range = this.max - this.min;
    this.maxIncrements = maxIncrements;
    this._setIncrement();
  };

  MeteorChart.Formatter.prototype = {
    _setIncrement: function() {
      var range = this.range,
          increments = this._getIncrements(),
          len = increments.length,
          maxIncrements = this.maxIncrements,
          increment, n, inc;

      // return largest increment that obeys the max number of labels rule
      for (n=0; n<len; n++) {
        increment = increments[n];

        if (increment >= range / maxIncrements) {
          this.increment = increment;
          return true;
        }
      }

      // if we can't determine an increment, then return the range
      this.increment = range;
      return false;
    },
    _getIncrements: function() {
      var arr = [],
      base = this.base,
      len = baseIncrements.length,
      n, i;

      for (n=0; n<8; n++) {
        for (i=0; i<len; i++) {
          arr.push(baseIncrements[i] * Math.pow(base, n));
        }
      }

      return arr;
    },
    each: function(fun) {
      var n = this.start(),
          i = 0,
          max = this.max;

      while (n <= max) {
        fun(i++, n);
        n = this.next();
      }
    },
    getLongestValue: function() {
      return Math.max(
        Math.abs(this.max), 
        Math.abs(this.min)
      );
    },
    addCommas: function(nStr){
      nStr += '';
      var x = nStr.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
    }
  };

})();