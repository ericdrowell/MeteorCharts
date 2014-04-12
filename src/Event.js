(function() {
  MeteorChart.Event = {
    on: function(obj, func) {
      var type = obj.type;

      if (!this._events[type]) {
        this._events[type] = [];
      }

      this._events[type].push({
        name: obj.name,
        id: obj.id,
        handler: func
      });
        
    },
    fire: function(obj) {
      var type = obj.type,
          name = obj.name,
          id = obj.id,
          events = this._events[type],
          len, n, event;

      if (events) {
        len = events.length;
        for (n=0; n<len; n++) {
          event = events[n];
          if (this._shouldExecuteHandler(event, name, id)) {
            event.handler();
          }
        }
      }
    },
    _shouldExecuteHandler: function(event, name, id) {
      // name check
      if (name && event.name !== name) {
        return false;
      }

      // id check
      if (id && event.id !== id) {
        return false;
      }

      // everything is okay, return true
      return true;
    },
    _events: {}
  };
})();