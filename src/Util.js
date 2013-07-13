(function() {
  Meteor.Util = {
    // third obj overrides second obj, and
    // second obj overrides first obj
    merge: function(obj1,obj2,obj3){
      var retObj = {}; 
      for (var attrname in obj1) { retObj[attrname] = obj1[attrname]; }
      for (var attrname in obj2) { retObj[attrname] = obj2[attrname]; }
      if (obj3) {
        for (var attrname in obj3) { retObj[attrname] = obj3[attrname]; }
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