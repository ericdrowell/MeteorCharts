var chart = new MeteorChart({
  container: 'container',
  width: 445,
  height: 250,

  theme: MeteorChart.Themes.CoteAzur,
  layout: MeteorChart.Layouts.L4_A,

  components: [
    {
      slot: 0,
      type: 'Axis',
      id: 'yAxis',
      data: function() {
        return [0, 20, 40, 60, 80, 100]
      }
    },
    {
      slot: 1,
      type: 'BarSeries',
      id: 'barSeries',
      viewport: {
        min: 0,
        max: 100
      },
      data: [
        {
          title: 'Califonia',
          bars: [
            {
              title: 'Republicans',
              value: 5
            },
            {
              title: 'Democrats',
              value: 95
            }
          ]
        },
        {
          title: 'New York',
          bars: [
            {
              title: 'Republicans',
              value: 15
            },
            {
              title: 'Democrats',
              value: 85
            }
          ]
        },
        {
          title: 'Colorado',
          bars: [
            {
              title: 'Republicans',
              value: 25
            },
            {
              title: 'Democrats',
              value: 75
            }
          ]
        },
        {
          title: 'Florida',
          bars: [
            {
              title: 'Republicans',
              value: 45
            },
            {
              title: 'Democrats',
              value: 55
            }
          ]
        },
        {
          title: 'Texas',
          bars: [
            {
              title: 'Republicans',
              value: 85
            },
            {
              title: 'Democrats',
              value: 15
            }
          ]
        }
      ],
      style: function() {
        return {
          barWidth: (this.get('width') / 10) - 10
        };
      }
    },
    {
      slot: 2,
      type: 'Axis',
      id: 'xAxis',
      data: function() {
        return ['California', 'New York', 'Colorado', 'Florida', 'Texas']
      },
      style: function() {
        return {
          padding: this.chart.components.barSeries.get('style').barWidth
        };
      }
    }
  ]
});