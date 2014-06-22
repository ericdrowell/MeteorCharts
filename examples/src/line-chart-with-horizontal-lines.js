CHARTS.push({
  id: 'line-chart-with-horizontal-lines',
  name: 'Line Chart with Horizontal Lines',
  config: {
  layout: MeteorChart.Layouts.L4_A,
    components: [
      {
        slot: 0,
        type: 'Axis',
        id: 'yAxis',
        data: function() {
          return [-100, 0, 100, 200];
        }
      },
      {
        slot: 1,
        type: 'GridLines',
        id: 'horizontalGridLines',
        data: function() {
          return this.chart.components.yAxis.getLabelInfo();
        }
      },
      {
        slot: 1,
        type: 'LineSeries',
        id: 'lineSeries',
        viewport: {
          minX: -100,
          maxX: 300,
          minY: -100,
          maxY: 200,
        },
        data: DATA.LINE_SERIES
      },
      {
        slot: 2,
        type: 'Axis',
        id: 'xAxis',
        data: function() {
          return [-100, 0, 100, 200, 300];
        }
      }
    ]
  }
}); 
