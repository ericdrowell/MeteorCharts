(function() {
  var select = document.createElement('select'),
      themes = ['CoteAzur', 'Light', 'Lollapalooza'],
      len = themes.length,
      n, opt;

  select.style.position = 'fixed';
  select.style.top = 10;
  select.style.right = 10;
  select.onchange = function() {
    var val = select.options[select.selectedIndex].value;
    chart.theme = val;

  };

  for (n=0; n<len; n++) {
    opt = document.createElement('option');
    opt.value = opt.innerHTML = themes[n];
    select.appendChild(opt);
  }

  document.body.appendChild(select);

})();