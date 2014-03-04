(function() {
  var select = document.createElement('select'),
      themes = [],
      key, len, n, opt;

  for (key in MeteorChart.Themes) {
    themes.push(key);
  }

  len = themes.length;
  select.style.position = 'fixed';
  select.style.top = 10;
  select.style.right = 10;
  select.onchange = function() {
    var val = select.options[select.selectedIndex].value;
    chart.destroy();
    config.theme = MeteorChart.Themes[val];
    chart = new MeteorChart(config);
  };

  for (n=0; n<len; n++) {
    opt = document.createElement('option');
    opt.value = opt.innerHTML = themes[n];

    if (themes[n] === 'CoteAzur') {
      opt.selected = 'selected';
    }

    select.appendChild(opt);
  }

  document.body.appendChild(select);

})();