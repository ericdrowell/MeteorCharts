var Meteor = {};
(function() {      
  Meteor = {
    Charts: {},
    Skins: {},
    Util: {},
    extend: function(c1, c2) {
      for(var key in c2.prototype) {
        if(!( key in c1.prototype) && key !== 'init') {
          c1.prototype[key] = c2.prototype[key];
        }
      }
    }
  };
})();