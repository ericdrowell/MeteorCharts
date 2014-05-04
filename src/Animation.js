// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function() {
  MeteorChart.Animation = {
    handlers: {},
    waiting: false,
    queue: function(componentId, func) {
      var that = this;

      this.handlers[componentId] = func;

      if (!this.waiting) {
        setTimeout(function() {
          that.loop();
          that.waiting = false;
        }, 10);
        this.waiting = true;
      }
    },
    loop: function() {
      var that = MeteorChart.Animation,
          handlers = that.handlers,
          arr = [], 
          key, n, len;

      for (key in handlers) {
        arr.push({
          id: key,
          handler: handlers[key]
        });
      }

      // cleanup the handlers hash
      for (n=0, len=arr.length; n<len; n++) {
        arr[n].handler();
        delete that.handlers[arr[n].id];
      }

      if (len) {
        requestAnimFrame(that.loop);
      }
    }
  };
})();