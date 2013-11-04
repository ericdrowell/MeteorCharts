(function() {
  MeteorCharts.Util = {
    merge: function(){
      var len = arguments.length,
          arr = Array.prototype.slice.call(arguments),
          n, attr, ret, val;

      if (this.containsObjects(arr)) {
        ret = {};
        for (n=0; n<len; n++) {
          val = arguments[n];
          for (attr in val) { ret[attr] = val[attr]; }
        }
      }
      else {
        for (n=len-1; n>=0; n--) {
          val = arguments[n];
          if (val !== undefined) {
            ret = val;
            break;
          }
        }
      }

      return ret;
    },
    extend: function(c1, c2) {
      for(var key in c2.prototype) {
        if(!( key in c1.prototype) && key !== 'init') {
          c1.prototype[key] = c2.prototype[key];
        }
      }
    },
    isObject: function(obj) {
      return (!!obj && obj.constructor == Object);
    },
    containsObjects: function(arr) {
      var len = arr.length,
          n, val;

      for (n=0; n<len; n++) {
        val = arr[n];
        if (val !== undefined && !this.isObject(val)) {
          return false;
        }
      }
      return true;
    },
    get: function(obj, arr) {
      var len = arr.length,
          n;

      for (n=0; n<len; n++) {
        obj = obj[arr[n]];
        if (obj === undefined) {
          break;
        }
      }

      if (n === len) {
        return obj;
      }
      else {
        return undefined;
      }
    },
    getDistance: function(p1, p2) {
      return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
    }
  };
})();