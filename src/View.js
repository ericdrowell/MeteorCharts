(function() {
  var DEFAULT = {
    backgroundColor: 'black',
    width: 900,
    height: 450,
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
      }
    },
    yAxis: {
      min: 'auto',
      max: 'auto',
      maxNumberOfLabels: 8,
      lines: {
        stroke: '#555',
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
      fill: 'white',
      opacity: 0.3
    }
  };

  MeteorCharts.View = function(config) {
    this.config = config || {};
  };

  MeteorCharts.View.prototype = {
    /*
    * @example get('tooltip', 'text', 'fill');
    */
    get: function() {
      var config = this.config,
          len = arguments.length,
          n, obj;

      // try to access config attr
      obj = config;
      for (n=0; n<len; n++) {
        obj = obj[arguments[n]];
        if (obj === undefined) {
          break;
        }
      }

      if (n === len) {
        return obj;
      }

      // try to access default attr
      obj = DEFAULT;
      for (n=0; n<len; n++) {
        obj = obj[arguments[n]];
        if (obj === undefined) {
          break;
        }
      }

      if (n === len) {
        return obj;
      }
      // invalid attr path
      else {
        return null;
      }
    },
    getDataStyle: function(n) {
      var data = this.get('data'),
          len = data.length;

      return data[n % len];
    },
  };
})();