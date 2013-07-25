var DEFAULT_LIGHT = {
  background: 'white',
  width: 900,
  height: 450,
  text: {
    fill: '#888',
    fontSize: 16
  },
  title: {
    text: {
      fontSize: 24
    }
  },
  legend: {
    text: {
      fontSize: 20
    },
    spacing: 20
  },
  xAxis: {
    maxNumberOfLabels: 10,
    lines: {}
  },
  yAxis: {
    maxNumberOfLabels: 8,
    lines: {
      stroke: '#ddd',
      strokeWidth: 2
    }
  },
  data: [
    {
      stroke: '#afe225' // light green
    },
    {
      stroke: '#76d0ff' // light blue
    },
    {
      stroke: '#fc009a' // pink
    }
  ],
  tooltip: {
    text: {
      fill: 'black',
      fontSize: 16,
      padding: 2
    },
    tag: {
      fill: '#e8e8e8'
    }
  },
  select: {
    fill: 'black',
    opacity: 0.1
  }
};