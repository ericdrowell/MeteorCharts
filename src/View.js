(function() {
  var DEFAULT = {
    backgroundColor: 'black',
    width: 900,
    height: 450,
    padding: 10,
    spacing: 10,
    text: {
      fill: '#ccc',
      fontSize: 16
    },
    title: {
      text: {
        fontSize: 24
      }
    },
    legend: {
      layout: 'top',
      text: {
        fontSize: 20
      },
      spacing: 20
    },
    xAxis: {
      min: 'auto',
      max: 'auto',
      maxNumberOfLabels: 10,
      lines: {
        stroke: '#555',
        strokeWidth: 2
      },
      formatter: 'Seconds'
    },
    yAxis: {
      min: 'auto',
      max: 'auto',
      maxNumberOfLabels: 8,
      lines: {
        stroke: '#555',
        strokeWidth: 2
      },
      formatter: 'Numbers'
    },
    series: [
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
    zoom: {
      type: 'box',
      selection: {
        fill: 'white',
        opacity: 0.3
      }
    }
  };

  MeteorCharts.View = function(chart) {
    this.chart = chart;
  };

  MeteorCharts.View.prototype = {
    get: function() {
      var arr = Array.prototype.slice.call(arguments),
          util = MeteorCharts.Util,
          get = util.get,
          view = this.chart.view,
          len = arr.length,
          lastIndex = len - 1;

      return util.merge(
        get(DEFAULT, [arr[lastIndex]]),
        get(DEFAULT, arr),
        get(view, [arr[lastIndex]]),
        get(view, arr)
      );
    },
    /*
    * @example set('legend', 'text', 'fontSize', 16);
    */
    set: function() {
      var view = this.chart.view,
          a0 = arguments[0],
          a1 = arguments[1],
          a2, a3;

      switch (arguments.length) {
        case 2: 
          view[a0] = a1;
          break;
        case 3: 
          a2 = arguments[2];
          if (view[a0] === undefined) {
            view[a0] = {};
          }
          view[a0][a1] = a2;
          break;
        case 4:
          a2 = arguments[2];
          a3 = arguments[3];
          if (view[a0] === undefined) {
            view[a0] = {};
          }
          if (view[a0][a1] === undefined) {
            view[a0][a1] = {};
          }
          view[a0][a1][a2] = a3;
          break; 
      }

    },
    getSeriesStyle: function(n) {
      var series = this.get('series'),
          len = series.length;

      return series[n % len];
    },
  };
})();