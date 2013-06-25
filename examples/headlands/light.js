var HEADLANDS_LIGHT = {
  background: 'white',
  width: 900,
  height: 400,
  xAxis: {
    maxNumberOfLabels: 10,
    lines: {
      stroke: '#ccc',
      strokeWidth: 1,
      dashArray: [2, 2]
    }
  },
  yAxis: {
    maxNumberOfLabels: 8,
    lines: {
      stroke: '#ccc',
      strokeWidth: 1,
      dashArray: [2, 2]
    }
  },
  title: {
    text: {
      fill: '#585858',
      fontSize: 24
    }
  },
  text: {
    fill: '#585858',
    fontSize: 16
  },
  data: {
    lines: [
      'blue',
      'orange',
      'green'
    ]
  },
  tooltip: {
    text: {
      fill: 'white',
      fontSize: 16,
      padding: 5
    },
    tag: {
      fill: 'black'
    }
  }
};