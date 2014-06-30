(function() {
  var ArrayProto = Array.prototype,
      slice = ArrayProto.slice,
      nativeForEach = ArrayProto.forEach;

  MeteorChart.Util = {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    replace: function(str, tokens) {
      var key;
      for (key in tokens) {
        str = str.replace('{' + key + '}', tokens[key]);
      }
      return str;
    },
    addMethod: function(constructor, attr, def) {
      constructor.prototype[attr] = function() {
        var val;

        // setter
        if (arguments.length) {
          this.attrs[attr] = arguments[0];

          // chainable
          return this;
        }
        // getter
        else {
          val = this.attrs[attr];

          if (val === undefined) {
            if (MeteorChart.Util._isFunction(def)) {
              return def.call(this);
            }
            else {
              return def;
            }
          }
          else if (MeteorChart.Util._isFunction(val)) {
            return val.call(this);
          }
          else {
            return val;
          }
        }
      };
    },
    isEqual: function(a, b) {

      var aType = Object.prototype.toString.call(a),
          len;

      if (aType === '[object Object]') {
        for (var key in a) {
          if (!this.isEqual(a[key], b[key])) {
            return false;
          }
        }
        return true;
      }
      else if (aType === '[object Array]') {
        len = a.length;

        // for large arrays, use sampling to approximate equality
        // TODO: for now, the sampling "algo" just looks at the first element
        // and the last element.  This should eventually bit a bit more
        // robust to reduce false positives
        if (len > 5) {
          if (!this.isEqual(a[0], b[0])) {
            return false;
          }
          if (!this.isEqual(a[len-1], b[len-1])) {
            return false;
          }
        }
        // for smaller arrays, compare every single element for 100% accuracy
        else {
          for (var n=0; n<len; n++) {
            if (!this.isEqual(a[n], b[n])) {
              return false;
            }
          }
        }

        return true;
      }
      else {
        return a === b
      }

    },
    squaredDistanceBetweenPoints: function(p1, p2) {
      var diffX = p2.x - p1.x,
          diffY = p2.y - p1.y;
      return (diffX*diffX) + (diffY*diffY);
    },
    getLongerValue: function(a, b) {
      return Math.max(
        Math.abs(a),
        Math.abs(b)
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
    },
    _getScale: function(val, scaleFactor) {
      if (!scaleFactor) {
        scaleFactor = 1;
      }

      // more than 0
      if (scaleFactor > 0) {
        return val * scaleFactor;
      }
      // less than 0
      else {
        return val / (-1 * scaleFactor);
      }
    },
    /*
     * cherry-picked utilities from underscore.js
     */
    _isElement: function(obj) {
      return !!(obj && obj.nodeType == 1);
    },
    _isFunction: function(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    _isObject: function(obj) {
      return (!!obj && obj.constructor == Object);
    },
    _isArray: function(obj) {
      return Object.prototype.toString.call(obj) == '[object Array]';
    },
    _isNumber: function(obj) {
      return Object.prototype.toString.call(obj) == '[object Number]';
    },
    _isString: function(obj) {
      return Object.prototype.toString.call(obj) == '[object String]';
    },
    // The cornerstone, an `each` implementation, aka `forEach`.
    // Handles objects with the built-in `forEach`, arrays, and raw objects.
    // Delegates to **ECMAScript 5**'s native `forEach` if available.
    _each: function(obj, iterator, context) {
      if (obj == null) return obj;
      if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
      } else if (obj.length === +obj.length) {
        for (var i = 0, length = obj.length; i < length; i++) {
          if (iterator.call(context, obj[i], i, obj) === breaker) return;
        }
      } else {
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
          if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
        }
      }
      return obj;
    },
    // Fill in a given object with default properties.
    _defaults: function(obj) {
      this._each(slice.call(arguments, 1), function(source) {
        if (source) {
          for (var prop in source) {
            if (obj[prop] === void 0) obj[prop] = source[prop];
          }
        }
      });
      return obj;
    },
    // Create a (shallow-cloned) duplicate of an object.
    _clone: function(obj) {
      if (!this._isObject(obj)) return obj;
      return this._isArray(obj) ? obj.slice() : this._extend({}, obj);
    },
    // Extend a given object with all the properties in passed-in object(s).
    // _extend: function(obj) {
    //   this._each(slice.call(arguments, 1), function(source) {
    //     if (source) {
    //       for (var prop in source) {
    //         obj[prop] = source[prop];
    //       }
    //     }
    //   });
    //   return obj;
    // },
    _extend: function(c1, c2) {
      var key, obj = {};

      // first, clone c1
      for(key in c1) {
        obj[key] = c1[key]; 
      }

      // next, interate through keys of c2 and add them to obj
      for(key in c2) {
        // if there's a conflict...
        if((key in c1) && this._isObject(c2[key])) {
          obj[key] = this._extend(c1[key], c2[key]);
        }
        else {
          obj[key] = c2[key];
        }
      }

      return obj;
    },
    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time. Normally, the throttled function will run
    // as much as it can, without ever going more than once per `wait` duration;
    // but if you'd like to disable the execution on the leading edge, pass
    // `{leading: false}`. To disable execution on the trailing edge, ditto.
    _throttle: function(func, wait, options) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      options || (options = {});
      var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
      };
      return function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    }
  };
})();