(function() {
  var HASH = '#',
      EMPTY_STRING = '',
      COMMA = ', ';

  MeteorChart.Util = {
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
            if (Kinetic.Util._isFunction(def)) {
              return def.call(this);
            }
            else {
              return def;
            }
          }
          else if (Kinetic.Util._isFunction(val)) {
            return val.call(this);
          }
          else {
            return val;
          }   
        }
      };
    },
    hexToRgba: function(hex, alpha) {
        hex = hex.replace(HASH, EMPTY_STRING);

        if (alpha === undefined) {
          alpha = 1;
        }

        var bigint = parseInt(hex, 16),
            r = (bigint >> 16) & 255,
            g = (bigint >> 8) & 255,
            b = bigint & 255,
            a = alpha;

        return 'rgba(' + r + COMMA + g + COMMA + b + COMMA + a + ')';
    },
    getPointsMinMax: function(points) {
      var minX = Infinity,
          minY = Infinity,
          maxX = 0,
          maxY = 0,
          len = points.length,
          n, x, y;

      for (n=0; n<len; n+=2) {
        point = points[n];
        x = points[n];
        y = points[n+1];
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      } 

      return {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      };
    },
    getSeriesMinMax: function(series) {
      var minX = Infinity,
          minY = Infinity,
          maxX = 0,
          maxY = 0,
          len = series.length,
          n, viewport;

      for (n=0; n<len; n++) {
        viewport = this.getPointsMinMax(series[n].points);
        minX = Math.min(minX, viewport.minX);
        minY = Math.min(minY, viewport.minY);
        maxX = Math.max(maxX, viewport.maxX);
        maxY = Math.max(maxY, viewport.maxY);
      } 

      return {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      };
    }
  };

  // add methods to MeteorChart class. 
  MeteorChart.Util.addMethod(MeteorChart, 'width', 0);
  MeteorChart.Util.addMethod(MeteorChart, 'height', 0);
  MeteorChart.Util.addMethod(MeteorChart, 'data');
  MeteorChart.Util.addMethod(MeteorChart, 'layout');
  MeteorChart.Util.addMethod(MeteorChart, 'theme');
  MeteorChart.Util.addMethod(MeteorChart, 'padding', 0);
  MeteorChart.Util.addMethod(MeteorChart, 'options');
})();