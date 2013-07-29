var HEADLANDS_LIGHT_THIN = {
  background: 'white',
  width: 900,
  height: 250,
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
  data: [
    {
      stroke: 'blue'
    },
    {
      stroke: 'orange'
    },
    {
      stroke: 'green'
    }
  ],
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
    fill: 'black',
    opacity: 0.1,
    type: 'range'
  }
};