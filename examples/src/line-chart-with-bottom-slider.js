CHARTS.push({
  id: 'line-chart-with-bottom-slider',
  name: 'Line Chart with Bottom Slider',
  config: {
    layout: 'L4_D',
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
      },
      {
        slot: 3,
        type: 'Slider',
        id: 'slider',
        style: {
          handleWidth: 40,
          handleHeight: 10
        }
      }
    ]
  }
}); 

