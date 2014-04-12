(function() {
  MeteorChart.Event = {
    on: function(obj) {
      var type = obj.type,
          name = obj.name,
          id = obj.id;

      if (name) {

      }
        
    },
    fire: function(obj) {
      var type = obj.type,
          name = obj.name,
          id = obj.id;
    },
    _events: {}
  };
})();

/*


_events: {
  click: [
    {
      handler: function(){...}
    },
    {
      id: 'xAxis',
      handler: function(){...} 
    }
  ],
  pointerMove: [
    {
      handler: function(){...}
    }
  ]  
}

Event.fire({
  type: 'click'
});

Event.fire({
  type: 'click',
  id: 'xAxis'
});

Event.on({
  type: 'click'
}, function(evt) {
  var type = evt.type,
      name = evt.name,
      id = evt.id
  // do stuff
});

Event.on({
  componentId: 'xAxis'
}, function() {...});

Event.on({
  type: 'click',
  id: 'xAxis'
}, function() {...});

*/