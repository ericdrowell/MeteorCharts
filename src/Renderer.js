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
  MeteorChart.Renderer = {
    handlers: {},
    waiting: false,
    queue: function(id, func) {
      var that = this;

      this.handlers[id] = func;

      if (!this.waiting) {
        setTimeout(function() {
          that.loop();
          that.waiting = false;
        }, 10);
        this.waiting = true;
      }
    },
    loop: function() {
      var that = MeteorChart.Renderer,
          handlers = that.handlers,
          arr = [], 
          key, n, len;

      for (key in handlers) {
        arr.push({
          id: key,
          handler: handlers[key]
        });
      }

      len = arr.length;

      if (MeteorChart.batchRender && len) {
        arr[0].handler();
        delete that.handlers[arr[0].id];
      }
      else {
        // cleanup the handlers hash
        for (n=0; n<len; n++) {
          arr[n].handler();
          delete that.handlers[arr[n].id];
        }
      }

      if (len) {
        requestAnimFrame(that.loop);
      }
    }
  };
})();