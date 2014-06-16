var chart = new MeteorChart({
  container: 'container',
  width: 200,
  height: 50,

  theme: MeteorChart.Themes.CoteAzur,
  layout: MeteorChart.Layouts.L1,

  style: {
    padding: 10
  },

  components: [
    {
      slot: 0,
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
    }
  ]
});