CHARTS.push({
  id: 'line-chart-with-right-legend',
  name: 'Line Chart with Right Legend',
  config: {
    layout: 'L4_B',
    components: [
      {
        slot: 3,
        type: 'Legend',
        id: 'legend',
        orientation: 'vertical',
        data: function() {
          return this.chart.components.lineSeries.getTitles();
        }
      }, 
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
        type: 'Lines',
        id: 'lineSeries',
        viewport: {
          minX: -100,
          maxX: 300,
          minY: -100,
          maxY: 200,
        },
        data: @@LINE_DUAL_SERIES_DATA
      },
      {
        slot: 1,
        type: 'Scatter',
        id: 'scatter',
        viewport: function() {
          return this.chart.components.lineSeries.get('viewport');
        },
        data: function() {
          return this.chart.components.lineSeries.get('data');
        }
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