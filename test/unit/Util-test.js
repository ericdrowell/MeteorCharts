var assert = require('assert');
var MeteorCharts = require('../../dist/meteorcharts-dev');

suite('Util', function(){
  var util;

  setup(function(){
    util = MeteorCharts.Util;
  });

  // =======================================
  // get()
  // =======================================
  suite('get()', function(){
    test('1 level', function(){
      assert.equal(util.get({
        foo: 123
      }, ['foo']), 123);
    });

    test('2 levels', function(){
      assert.equal(util.get({
        foo: {
          bar: 123
        }
      }, ['foo', 'bar']), 123);
    });

    test('3 levels', function(){
      assert.equal(util.get({
        foo: {
          bar: {
            far: 123
          }
        }
      }, ['foo', 'bar', 'far']), 123);
    });

    test('1 level not found', function(){
      assert.equal(util.get({
        foo: 123
      }, ['nothere']), undefined);
    });

    test('2 levels not found', function(){
      assert.equal(util.get({
        foo: {
          bar: 123
        }
      }, ['foo', 'nothere']), undefined);
    });
  });
});