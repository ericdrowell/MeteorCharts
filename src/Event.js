(function() {
  MeteorChart.Event = {
    on: function(obj, func) {
      var event = obj.event;

      if (!this._events[event]) {
        this._events[event] = [];
      }

      this._events[event].push({
        type: obj.type,
        id: obj.id,
        handler: func
      });
        
    },
    fire: function(obj) {
      var event = obj.event,
          type = obj.type,
          id = obj.id,
          events = MeteorChart.Event._events[event],
          len, n, event;

      if (events) {
        len = events.length;
        for (n=0; n<len; n++) {
          event = events[n];
          if (MeteorChart.Event._shouldExecuteHandler(event, type, id)) {
            event.handler(obj);
          }
        }
      }
    },
    map: function(eventArr, func) {
      var that = this,
          cachedEvt = {},
          n, len;

      // convert eventArr into an array if it's not an array
      if (!MeteorChart.Util._isArray(eventArr)) {
        eventArr = [eventArr];
      }

      for (n=0, len=eventArr.length; n<len; n++) {
        that.on(eventArr[n], function(evt) {
          cachedEvt = MeteorChart.Util.merge(cachedEvt, evt);
          MeteorChart.render();
        });
      }

      return function() {
        return func(cachedEvt);
      };
    },
    _shouldExecuteHandler: function(event, type, id) {
      // type check
      if (event.type && event.type !== type) {
        return false;
      }

      // id check
      if (event.id && event.id !== id) {
        return false;
      }

      // everything is okay, return true
      return true;
    },
    _events: {}
  };
})();