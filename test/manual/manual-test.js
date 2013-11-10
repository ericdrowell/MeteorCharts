suite('Manual', function(){

  // =======================================

  test('3 series', function(){
    var lineChart = new MeteorCharts.Line({
      container: addContainer(),
      model: MOCK_MODEL_THREE_SERIES
    });
  });

  test('2 series', function(){
    var lineChart = new MeteorCharts.Line({
      container: addContainer(),
      model: MOCK_MODEL_TWO_SERIES/*,
      view: {
        backgroundColor: 'f6f2ef',
        text: {
          fill: '#222'
        },
        xAxis: {
          gridLines: {
            stroke: 'transparent'
          }
        },
        yAxis: {
          gridLines: {
            stroke: '#999'
          }
        },
        series: [
          {
            stroke: '#7caacb', // light blue
            strokeWidth: 2,
            lineJoin: 'round'
          },
          {
            stroke: '#fc009a', // pink
            strokeWidth: 2,
            lineJoin: 'round'
          }
        ]
      }*/
    });
  });

  test.only('Grapher', function(){
    function Grapher(config) {
      var minX = config.minX,
          minY = config.minY,
          maxX = config.maxX,
          maxY = config.maxY,
          increment = config.increment,
          equations = config.equations,
          len = equations.length,
          series = [],
          n, x, equation, currentSeries, func, y;

      for (n=0; n<len; n++) {
        equation = equations[n];
        func = equation.func;
        currentSeries = {
          title: equation.title,
          points: []
        };

        for (x=minX; x<=maxX; x+=increment) {
          y = Math.round(func(x) * 100) / 100;
          if (y>=minY && y<=maxY) {
            currentSeries.points.push({
              x: x,
              y: y
            });
          }
        }

        series.push(currentSeries);
      }

      return series;
    }

    var series = Grapher({
      minX: 0,
      minY: 0,
      maxX: 100,
      maxY: 6000,
      increment: 1,
      equations: [
        {
          title: 'O(n!)',
          func: function(x) {
            var rval=1;
            for (var i = 2; i <= x; i++) {
              rval = rval * i;
            }
            return rval;
          }
        },

        {
          title: 'O(2^n)',
          func: function(x) {
            return Math.pow(2, x);
          }
        },
   
        {
          title: 'O(n^2)',
          func: function(x) {
            return x * x;
          }
        },

        {
          title: 'O(n log(n))',
          func: function(x) {
            return x * Math.log(x);
          }
        },

        {
          title: 'O(n)',
          func: function(x) {
            return x;
          }
        },

        {
          title: 'O(log(n))',
          func: function(x) {
            return Math.log(x);
          }
        },

        {
          title: 'O(1)',
          func: function(x) {
            return 1;
          }
        }
      ]
    });

    //console.log(series)

    var lineChart = new MeteorCharts.Line({
      container: addContainer(),
      view: {
        xAxis: {
          formatter: 'Number',
          min: 0,
          max: 100
        },
        yAxis: {
          min: 0,
          max: 1024
        }
      },
      model: {
        title: 'Big-O Complexity Chart',
        series: series
      }
    });
  });

});