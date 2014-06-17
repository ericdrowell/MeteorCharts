var chart = new MeteorChart({
  container: 'container',
  width: 500,
  height: 290,

  theme: MeteorChart.Themes.CoteAzur,
  layout: MeteorChart.Layouts.L5,

  // set components data and styles
  components: [
    {
      slot: 0,
      type: 'Legend',
      id: 'legend',
      align: 'right',
      data: function() {
        return this.chart.components.lineSeries.get('data'); 
      }
    },
    {
      slot: 1,
      type: 'Axis',
      id: 'yAxis',
      data: function() {
        return [-100, 0, 100, 200];
      }
    },
    {
      slot: 2,
      type: 'LineSeries',
      id: 'lineSeries',
      viewport: {
        minX: -100,
        maxX: 300,
        minY: -100,
        maxY: 200,
      },
      data: [
        {
          title: 'Series 1',
          points: [
            -100, -100,
            100, 100,
            200, 50
          ]
        },
        {
          title: 'Series 2',
          points: [
            0, 100,
            100, 200,
            200, 150,
            300, 200
          ]
        }
      ]
    },
    {
      slot: 3,
      type: 'Axis',
      id: 'xAxis',
      data: function() {
        return [-100, 0, 100, 200, 300];
      }
    }
  ]
});