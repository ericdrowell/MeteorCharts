(function() {
  MeteorChart.Component.extend('Slider', {
    init: function() {
      var showTrack = this.style.showTrack;

      // default
      if (showTrack === undefined) {
        showTrack = true;
      }

      if (showTrack) {
        this.track = MeteorChart.Dom.createElement('div');
        this.track.style.position = 'absolute';
        this.content.appendChild(this.track);
      }
      
      this.handle = MeteorChart.Dom.createElement('span');
      this.handle.style.display = 'inline-block';
      this.handle.style.position = 'absolute';
      this.content.appendChild(this.handle);

      this.set('offset', 0);
      this.set('value', 0);

      this._bind();
    },
    _render: function() {
      var handle = this.handle,
          track = this.track,
          style = this.style,
          theme = this.chart.theme,
          handleWidth = style.handleWidth,
          handleHeight = style.handleHeight,
          trackSize = 1,
          showTrack = style.showTrack;

      // default
      if (showTrack === undefined) {
        showTrack = true;
      }

      // handle
      handle.style.width = handleWidth;
      handle.style.height = handleHeight;
      handle.style.backgroundColor = style.handleFill || theme.secondary;
      MeteorChart.Dom.setBorderRadius(handle, Math.min(handleWidth, handleHeight) / 2);

      // track
      if (showTrack) {
        track.style.backgroundColor = theme.secondary, 0.1;
      }

      if (style.orientation === 'vertical') {
        handle.style.top = this.height() - handleHeight;
        handle.style.left = 0;

        if (showTrack) {
          this.track.style.width = trackSize;
          this.track.style.height = this.height();
          this.track.style.left = (this.width() - trackSize) / 2;
        }
      }
      else {
        handle.style.top = 0;
        handle.style.left = 0;

        if (showTrack) {
          this.track.style.width = this.width();
          this.track.style.height = trackSize;
          this.track.style.top = (this.height() - trackSize) / 2;
        }
      }

      
      
      
    },
    getValue: function() {
      return this.value;
    },
    getOffset: function() {
      return this.offset;
    },
    _bind: function() {
      var that = this,
          handle = this.handle,
          chartContent = this.chart.content,
          orientation = this.style.orientation || 'horizontal',
          style = this.style,
          handleWidth = style.handleWidth,
          handleHeight = style.handleHeight,
          startOffsetPos = null,
          startPointerPos = null;

      // start drag & drop
      handle.addEventListener('mousedown', function(evt) {
        // prevent browser from trying to select stuff when dragging
        evt.preventDefault();

        if (orientation === 'horizontal') {
          startOffsetPos = MeteorChart.Dom.getNumber(handle.style.left);
          startPointerPos = evt.clientX;
        }
        else {
          startOffsetPos = MeteorChart.Dom.getNumber(handle.style.top);
          startPointerPos = evt.clientY;
        }

        that.fire('dragstart');
      }); 

      // drag
      document.body.addEventListener('mousemove', MeteorChart.Util._throttle(function(evt) {
        var diff, newOffset, value;

        if (startOffsetPos !== null) {
          

          if (orientation === 'horizontal') {
            diff = that.width() - that.style.handleWidth;
            pointerPos = evt.clientX;
            newOffset = pointerPos - startPointerPos + startOffsetPos;
            if (newOffset < 0) {
              newOffset = 0;
            }
            else if (newOffset > diff) {
              newOffset = diff;
            }
            handle.style.left = newOffset;
          }
          else {
            diff = that.height() - that.style.handleHeight;
            pointerPos = evt.clientY;
            newOffset = pointerPos - startPointerPos + startOffsetPos;
            if (newOffset < 0) {
              newOffset = 0;
            }
            else if (newOffset > diff) {
              newOffset = diff;
            }
            handle.style.top = newOffset;    
          }

          value = newOffset / (orientation === 'horizontal' ? (that.width() - handleWidth) : (that.height() - handleHeight));

          that.set('offset', newOffset);
          that.set('value', value);

          that.fire('dragmove', {
            offset: newOffset,
            value: value
          });
        }
      }, 17));
 
      // end drag & drop
      document.body.addEventListener('mouseup', function(evt) {
        startOffsetPos = null;
        startPointerPos = null;

        that.fire('dragend');
      }); 

      // cursors
      handle.addEventListener('mouseover', function(evt) {
        handle.style.cursor = 'pointer';
      }); 
      handle.addEventListener('mouseout', function(evt) {
        handle.style.cursor = 'default';
      });

    }
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Slider, 'width', function() {
    return this.style.handleWidth;
  });

  MeteorChart.Util.addMethod(MeteorChart.Components.Slider, 'height', function() {
    return this.style.handleHeight;
  });

})();