suite('Manual', function(){

  // =======================================

  test('3 series', function(){
    var lineChart = new MeteorCharts.Line({
      container: addContainer(),
      model: MOCK_MODEL_THREE_SERIES
    });
  });

  test.only('2 series', function(){
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

});