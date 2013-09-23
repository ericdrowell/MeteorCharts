var DEFAULT_LIGHT = {
  backgroundColor: 'white',
  width: 900,
  height: 450,
  text: {
    fill: '#333',
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
    lines: 'none'
  },
  yAxis: {
    maxNumberOfLabels: 8,
    lines: {
      stroke: '#ccc'
    }
  },
  series: [
    {
      stroke: 'red',
    },
    {
      stroke: 'blue',
    },
    {
      stroke: 'green'
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
  zoom: {
    type: 'box',
    selection: {
      fill: 'black',
      opacity: 0.1
    }
  }
};