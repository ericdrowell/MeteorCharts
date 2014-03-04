(function() {
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
    brighten: function(hex, lum) {
      var rgb = "#", c, i;

      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, '');
      if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
      }
      lum = lum || 0;

      // convert to decimal and change luminosity
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
      }

      return rgb;
    }
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