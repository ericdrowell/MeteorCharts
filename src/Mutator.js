(function() {
  MeteorChart.Mutator = function() {
    this.attrs = {};
    this.defaults = {};
  };

  MeteorChart.Mutator.prototype = {
    set: function(attr, val) {
      if (val !== undefined) {
        this.attrs[attr] = val;
      }
    },
    get: function(attr) {
      var chart = this.chart,
          val = this.attrs[attr];

      // default
      if ((val === undefined || val === null) && this.defaults[attr] !== undefined) {
        val = this.defaults[attr];
      }

      if (MeteorChart.Util._isFunction(val)) {
        return val.call(this);
      }
      else {
        return val;
      }
    }
  };
})();