{
          newTarget: function(evt) {
            var tooltip = this.chart.components.tooltip;

            tooltip.x(this.x() + evt.x);
            tooltip.y(this.y() + evt.y - 5);
            tooltip.data({
              title: evt.title,
              content: 'x=' + evt.dataX + ', y=' + evt.dataY
            });
            tooltip.render();
          },
          mouseover: function(evt) {
            this.chart.components.tooltip.show();
          },
          mouseout: function(evt) {
            this.chart.components.tooltip.hide();
          }
        }