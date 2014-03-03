(function() {
  function chartToData(pos, line) {
    return {
      x: (pos.x / line.scaleX) + line.minX,
      y: line.minY - ((pos.y - line.height()) / line.scaleY)
    };
  }

  MeteorChart.Layouts.InteractiveLineChart = {
    init: function(chart) {
      var stage = chart.stage,
          tooltip = chart.components.tooltip,
          line = chart.components.line,
          relPos, dataPos;

      stage.on('contentMouseover contentMousemove', function() {
        var pos = stage.getPointerPosition();

        if (pos) {
          relPos = {
            x: pos.x - line.x(),
            y: pos.y - line.y()
          }

          // make sure the position is inside the line component
          if (relPos.x >=0 && relPos.x <= line.width() && relPos.y >=0 && relPos.y <= line.height()) {
            tooltip.visible(true);
            tooltip.x(pos.x);
            tooltip.y(pos.y);

            dataPos = chartToData(relPos, line);

            tooltip.data({
              title: 'foobar',
              content: line.formatterX.short(dataPos.x) + ',' + line.formatterY.short(dataPos.y)
            });

            tooltip.update();
            tooltip.batchDraw();
          }
          else {
            tooltip.visible(false);
            tooltip.update();
            tooltip.batchDraw();   
          }
        }
      });

      stage.on('contentMouseout', function() {
        tooltip.visible(false);
        tooltip.update();
        tooltip.batchDraw();
      });
    },
    components: [
      {
        id: 'line',
        type: 'Line',
        updateOn: ['xAxisHeightChange', 'yAxisWidthChange'],
        x: function() {
          return this.chart.components.yAxis.width() + this.chart.padding();
        },
        y: function() {
          return this.chart.padding();
        },
        width: function() {
          return this.chart.width() - this.chart.components.yAxis.width() - (this.chart.padding() * 2);
        },
        height: function() {
          return this.chart.height() - this.y() - (this.chart.padding() * 2) - this.chart.components.xAxis.height();
        }
      },
      {
        id: 'yAxis',
        type: 'Axis',
        updateOn: ['lineHeightChange'],
        x: function() {
          return this.chart.padding();
        },
        y: function() {
          return this.chart.padding();
        },
        width: function() {
          // bind axis width to line x position
          return 60;
        },
        height: function() {
          // bind axis height to line height
          return this.chart.components.line.height();
        },
        data: function() {
          // bind axis data to line min and max values
          var line = this.chart.components.line;
          return {
            min: line.minY,
            max: line.maxY,
            unit: line.data().unit.y
          }
        },
        options: {
          orientation: 'vertical'
        }
      },
      {
        id: 'xAxis',
        type: 'Axis',
        updateOn: ['lineXChange', 'lineYChange', 'lineWidthChange', 'lineHeightChange'],
        x: function() {
          // bind axis x position to line x position
          return this.chart.components.line.x();
        },
        y: function() {
          var line = this.chart.components.line;

          return line.y() + line.height() + this.chart.padding();
        },
        width: function() {
          // bind axis width to line width
          return this.chart.components.line.width();
        },
        height: function() {
          return this.chart.theme().background.fonts.medium.fontSize;
        },
        data: function() {
          // bind axis data to line min and max values
          var line = this.chart.components.line;

          return {
            min: line.minX,
            max: line.maxX,
            unit: line.data().unit.x
          }
        }
      },
      {
        id: 'tooltip',
        type: 'Tooltip'
      }
    ]
  };
})();