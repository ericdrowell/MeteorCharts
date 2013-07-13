var DEFAULT_DARK = {
  background: 'black',
  width: 900,
  height: 450,
  text: {
    fill: '#ccc',
    fontSize: 16
  },
  title: {
    text: {
      fill: '#ccc',
      fontSize: 24
    }
  },
  legend: {
    text: {
      fill: '#ccc',
      fontSize: 20
    },
    spacing: 20
  },
  xAxis: {
    maxNumberOfLabels: 10,
    lines: {
      stroke: '#555',
      strokeWidth: 2
    }
  },
  yAxis: {
    maxNumberOfLabels: 8,
    lines: {
      stroke: '#555',
      strokeWidth: 2
    }
  },
  data: [
    {
      stroke: '#00f3fc',
      dashArray: [0.001, 10],
      lineCap: 'round',
      lineJoin: 'round',
      strokeWidth: 4
    },
    {
      stroke: '#fcf900'
    },
    {
      stroke: '#fc009a'
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
    fill: 'white',
    opacity: 0.3
  }
};