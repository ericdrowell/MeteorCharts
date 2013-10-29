suite('Manual', function(){

  // =======================================

  test.only('3 series', function(){
    var lineChart = new MeteorCharts.Line({
      container: addContainer(),
      model: MOCK_MODEL_THREE_SERIES
    });
  });

});