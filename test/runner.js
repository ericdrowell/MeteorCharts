mocha.ui('tdd');
var assert = chai.assert,
    testContainer = document.getElementById('test-container'),
    origAssertEqual = assert.equal,
    origAssert = assert,
    origNotEqual = assert.notEqual,
    assertionCount = 0,
    assertions = document.createElement('em');

function init() {
  // assert extenders so that we can count assertions
  assert = function() {
    origAssert.apply(this, arguments);
    assertions.innerHTML = ++assertionCount;
  };
  assert.equal = function() {
    origAssertEqual.apply(this, arguments);
    assertions.innerHTML = ++assertionCount;
  };
  assert.notEqual = function() {
    origNotEqual.apply(this, arguments);
    assertions.innerHTML = ++assertionCount;
  };

  window.onload = function() {
    var mochaStats = document.getElementById('mocha-stats');

    if (mochaStats) {
      var li = document.createElement('li');
      var anchor = document.createElement('a');

      anchor.href = '#';
      anchor.innerHTML = 'assertions:';
      assertions.innerHTML = 0;

      li.appendChild(anchor);
      li.appendChild(assertions);
      mochaStats.appendChild(li);
    }
  }
}

function addContainer() {
  var container = document.createElement('div');
  testContainer.appendChild(container);
  return container;
}


beforeEach(function(){
    var title = document.createElement('h2'),
        test = this.currentTest;

    title.innerHTML = test.parent.title + ' - ' + test.title;
    title.className = 'test-title';
    testContainer.appendChild(title);

});

init();