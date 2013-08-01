(function() {
  MeteorCharts.Util = {
    merge: function(){
      var len = arguments.length,
          retObj = {},
          n, obj, attr;

      for (n=0; n<len; n++) {
        obj = arguments[n];
        for (attr in obj) { retObj[attr] = obj[attr]; }
      }
      return retObj;
    },
    extend: function(c1, c2) {
      for(var key in c2.prototype) {
        if(!( key in c1.prototype) && key !== 'init') {
          c1.prototype[key] = c2.prototype[key];
        }
      }
    }
  };
})();