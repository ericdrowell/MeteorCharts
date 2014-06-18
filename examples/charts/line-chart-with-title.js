var chart = new MeteorChart({
  container: 'container',
  width: 445,
  height: 250,

  theme: MeteorChart.Themes.Firenze,
  layout: MeteorChart.Layouts.L4_B,

  components: [
    {
      slot: 0,
      type: 'Title',
      id: 'title',
      data: 'Awesome Blossom Possum'
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
      data: LINE_SERIES_DATA
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
