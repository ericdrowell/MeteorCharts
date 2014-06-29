var count = 0;

// we'll need the THEMES and CHARTS globals
phantom.page.injectJs('examples/dist/all-charts.js');

function addCharts(theme) {
  for (var n=0; n<CHARTS.length; n++) {
    (function(_n) {
      // create page
      var page = require('webpage').create()
      var chart = CHARTS[_n].id;

      // define page size
      page.viewportSize = {
        width: 445,
        height: 250
      };

      // define screenshot image size
      page.clipRect = { 
        top: 0, 
        left: 0, 
        width: 445, 
        height: 250 
      }; 

      var url = 'http://localhost:1337/examples/chart.html?chart=' + chart + '&theme=' + theme;

      console.log('open: ' + url);
      page.open(url, function (status) {
        
        window.setTimeout(function () {
            console.log('render: ' + url);
            page.render('chart-images/chart-' + count + '.png');
            page.close();
            // exit phantom when all permutations have been resolved
            if (++count >= THEMES.length * CHARTS.length) {
              phantom.exit();
            }
        }, 1000);
      });
    })(n);
  }
}

for (var i=0; i<THEMES.length; i++) {
  (function(_i) {
    setTimeout(function() {
      addCharts(THEMES[_i]);
    }, 3000 * _i);
  })(i);  
}





