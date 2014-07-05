(function() {
  var ATTR_WHITELIST = [
    'x',
    'y',
    'width',
    'height',
    'orientation',
    'visible',
    'style',
    'data',
    'viewport'
  ];

  MeteorChart.Attrs = {
    fire: function(event, obj) {
      var that = this;
      MeteorChart.Event.fire.call(this, MeteorChart.Util._extend({
          event: event,
          type: this.type,
          id: this.id
        },
        obj)
      );
    },
    set: function(attr, val) {
      if (val !== undefined) {
        this.attrs[attr] = val;
      }
    },
    get: function(attr) {
      var val = this.attrs[attr],
          def = this.defaults[attr],
          ret;

      // if val is undefined, use default
      if ((val === undefined || val === null) && def !== undefined) {
        val = def;
      }

      // if val is a function then execute it to obtain the val
      if (MeteorChart.Util._isFunction(val)) {
        ret = val.call(this);
      }
      else {
        ret = val;
      }

      // if ret is an object, fill in missing keys from default object
      if (MeteorChart.Util._isObject(ret)) {
        ret = MeteorChart.Util._defaults(ret, def);
      }

      // auto round x, y, width, and height values because these should
      // resolve to integer pixels
      if (attr === 'x' 
       || attr === 'y'
       || attr === 'width'
       || attr === 'height') {
        ret = Math.round(ret);
      }

      return ret;
    }
  };

  (function() {
    var len = ATTR_WHITELIST.length,
        n, attr;

    for (n=0; n<len; n++) {
      (function(attr) {
        MeteorChart.Attrs[attr] = function() {
          if (arguments.length) {
            return this.set.call(this, attr, arguments[0]);
          }
          else {
            return this.get(attr);
          }
        }  
      })(ATTR_WHITELIST[n])
    }
  })();

  MeteorChart.prototype = MeteorChart.Util._extend(MeteorChart.prototype, MeteorChart.Attrs);
  MeteorChart.Component.prototype = MeteorChart.Util._extend(MeteorChart.Component.prototype, MeteorChart.Attrs);
  
})();