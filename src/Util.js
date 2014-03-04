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
            return def;
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
  };

  // add methods to MeteorChart class. 
  MeteorChart.Util.addMethod(MeteorChart, 'width', 0);
  MeteorChart.Util.addMethod(MeteorChart, 'height', 0);
  MeteorChart.Util.addMethod(MeteorChart, 'layout');
  MeteorChart.Util.addMethod(MeteorChart, 'theme');
  MeteorChart.Util.addMethod(MeteorChart, 'padding', 0);
  MeteorChart.Util.addMethod(MeteorChart, 'data', {});
  MeteorChart.Util.addMethod(MeteorChart, 'options');
})();