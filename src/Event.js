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
          events = this._events[event],
          len, n, event;

      if (events) {
        len = events.length;
        for (n=0; n<len; n++) {
          event = events[n];
          if (this._shouldExecuteHandler(event, type, id)) {
            event.handler(obj);
          }
        }
      }
    },
    map: function(eventObj, func, chart, id) {
      var cachedEvt = {};

      this.on(eventObj, function(evt) {
        cachedEvt = evt;
        chart.components[id]._render();
      });

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