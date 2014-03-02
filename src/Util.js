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