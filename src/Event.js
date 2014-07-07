(function() {
  MeteorChart.Event = {
    on: function(id, str, func) {
      var _events = MeteorChart.Event._events;

      if (!_events[str]) {
        _events[str] = [];
      }

      _events[str].push({
        id: id,
        handler: func
      });      
    },
    fire: function(id, str, obj) {
      var events = MeteorChart.Event._events[str],
          len, n, evt;

      if (events) {
        len = events.length;
        for (n=0; n<len; n++) {
          evt = events[n];
          if (MeteorChart.Event._shouldExecuteHandler(evt, id)) {
            evt.handler.call(this, obj);
          }
        }
      }
    },
    _shouldExecuteHandler: function(event, id) {
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