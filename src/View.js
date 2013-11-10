(function() {
  MeteorCharts.View = function(chart) {
    this.overrides = {};
    this.chart = chart;
  };

  MeteorCharts.View.DEFAULT = {
    backgroundColor: 'black',
    width: 900,
    height: 450,
    padding: 10,
    spacing: 10,
    title: {
      text: {
        fill: '#ccc',
        fontSize: 20
      }
    },
    legend: {
      text: {
        fill: '#ccc',
        fontSize: 18
      },
      spacing: 20
    },
    xAxis: {
      min: 'auto',
      max: 'auto',
      text: {
        fill: '#ccc',
        fontSize: 14
      },
      gridLines: {
        stroke: '#555',
        strokeWidth: 2
      },
      formatter: 'Date' // can be Number or Date
    },
    yAxis: {
      min: 'auto',
      max: 'auto',
      text: {
        fill: '#ccc',
        fontSize: 14
      },
      gridLines: {
        stroke: '#555',
        strokeWidth: 2
      },
      formatter: 'Number' // can be Number or Date
    },
    series: [
      {
        stroke: '#afe225', // light green
        strokeWidth: 2,
        lineJoin: 'round'
      },
      {
        stroke: '#76d0ff', // light blue
        strokeWidth: 2,
        lineJoin: 'round'
      },
      {
        stroke: '#fc009a', // pink
        strokeWidth: 2,
        lineJoin: 'round'
      },
      {
        stroke: '#ffff00', // yellow
        strokeWidth: 2,
        lineJoin: 'round'
      },
      {
        stroke: '#d200ff', // light purple
        strokeWidth: 2,
        lineJoin: 'round'
      },
      {
        stroke: '#ff9000', // orange
        strokeWidth: 2,
        lineJoin: 'round'
      },
      {
        stroke: '#00fcff', // turquoise
        strokeWidth: 2,
        lineJoin: 'round'
      }
    ],
    tooltip: {
      title: {
        fill: '#444',
        fontSize: 14,
        fontStyle: 'italic'
      },
      content: {
        fill: 'black',
        fontSize: 14,
        fontStyle: 'bold'
      },
      rect: {
        fill: '#e8e8e8',
        lineJoin: 'round',
        strokeWidth: 4,
        padding: 8
      },
      node: {
        stroke: '#e8e8e8',
        radius: 5,
        strokeWidth: 2
      },
      connector: {
        strokeWidth: 4,
        opacity: 0.4,
        points: [0, 0, 0, 0],
        dashArray: [10, 8]
      }
    },  
    zoom: {
      type: 'box', // can be box or range
      selection: {
        fill: 'white',
        opacity: 0.3
      }
    }
  };

  MeteorCharts.View.prototype = {
    /**
    * @example get('legend', 'text', 'fontSize');
    */
    get: function() {
      var arr = Array.prototype.slice.call(arguments),
          util = MeteorCharts.Util,
          get = util.get,
          def = MeteorCharts.View.DEFAULT,
          view = this.chart.view,
          overrides = this.overrides;

      return util.merge(
        get(def, arr),
        get(view, arr),
        get(overrides, arr)
      );
    },
    /**
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