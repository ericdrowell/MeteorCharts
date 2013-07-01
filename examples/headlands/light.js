var HEADLANDS_LIGHT = {
  background: 'white',
  width: 900,
  height: 400,
  text: {
    fill: '#585858',
    fontSize: 16
  },
  title: {
    text: {
      fill: '#585858',
      fontSize: 24
    }
  },
  legend: {
    text: {
      fill: '#585858',
      fontSize: 20
    },
    rect: {
      size: 12,
      cornerRadius: 2
    },
    spacing: 20
  },
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
  },
  select: {
    // light blue
    fill: '#87c8ff',
    opacity: 0.3,
    // dark blue
    stroke: '#2d7dc0',
    strokeWidth: 2
  }
};