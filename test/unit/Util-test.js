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


  // =======================================
  // get()
  // =======================================
  suite('merge()', function(){

    // test merging objects
    test('x + y => xy', function(){
      var result = util.merge(
        {
          x: 1
        },
        {
          y: 2
        }
      );
      
      assert.equal(result.x, 1);
      assert.equal(result.y, 2);
    });

    test('xy + yz => xyz', function(){
      var result = util.merge(
        {
          x: 1,
          y: 2
        },
        {
          y: 3,
          z: 4
        }
      );
      
      assert.equal(result.x, 1);
      assert.equal(result.y, 3);
      assert.equal(result.z, 4);
    });

    test('xyz + xyz => xyz', function(){
      var result = util.merge(
        {
          x: 1,
          y: 2,
          z: 3
        },
        {
          x: 4,
          y: 5,
          z: 6
        }
      );
      
      assert.equal(result.x, 4);
      assert.equal(result.y, 5);
      assert.equal(result.z, 6);
    });

    test('xy + undefined + xy => xy', function(){
      var result = util.merge(
        {
          x: 1,
          y: 2,
        },
        undefined,
        {
          x: 3,
          y: 4,
        }
      );
      
      assert.equal(result.x, 3);
      assert.equal(result.y, 4);
    });

    test('xy + {} + xy => xy', function(){
      var result = util.merge(
        {
          x: 1,
          y: 2,
        },
        {},
        {
          x: 3,
          y: 4,
        }
      );
      
      assert.equal(result.x, 3);
      assert.equal(result.y, 4);
    });

    test('test deeply nested objects', function(){
      var result = util.merge(
        {
          x: {
            y: {
              z: 1
            },
            a: 2
          }
        },
        {
          b: {
            c: 3
          }
        }
      );
      
      assert.equal(result.x.y.z, 1);
      assert.equal(result.x.a, 2);
      assert.equal(result.b.c, 3);
    });

    // test merging numbers
    test('1 + 2 => 2', function(){
      var result = util.merge(1, 2);
      
      assert.equal(result, 2);
    });

    test('1 + 2 + 3 => 3', function(){
      var result = util.merge(1, 2, 3);
      
      assert.equal(result, 3);
    });

    test('1 + 2 + 0 => 0', function(){
      var result = util.merge(1, 2, 0);
      
      assert.equal(result, 0);
    });

    test('1 + 0 + 2 => 2', function(){
      var result = util.merge(1, 0, 2);
      
      assert.equal(result, 2);
    });

    test('1 + 2 + undefined => 2', function(){
      var result = util.merge(1, 2, undefined);
      
      assert.equal(result, 2);
    });
  });



});