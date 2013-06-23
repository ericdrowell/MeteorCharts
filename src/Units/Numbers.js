(function() {
	function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

  Meteor.Numbers = function(min, max, maxNumberOfLabels) {
    Meteor.Unit.call(this, min, max, maxNumberOfLabels);
  };

  Meteor.Numbers.prototype = {
    shortFormatter: function(num) {
    	var absNum = Math.abs(num);
      if (absNum < 1000) {
      	return numberWithCommas(num);
      }
      // thousands
      else if (absNum < 1000000) {
      	return numberWithCommas(Math.round(num / 1000)) + 'k';
      }
      // millions
      else if (absNum < 1000000000) {
      	return numberWithCommas(Math.round(num / 1000000)) + 'M';
      }
      // billions
      else {
      	return numberWithCommas(Math.round(num / 1000000000)) + 'B';
      }
    },
    increments: function() {
    	var arr = [
        1,
        2,
        3,
        5,
        10,
        20,
        25,
        50
    	], 
    	len = arr.length,
    	n, i;

      for (n=2; n<7; n++) {
        for (i=0; i<len; i++) {        
        	arr.push(arr[i] * Math.pow(10, n));
        }
    	}

      return arr;
    }
  };

  Meteor.Util.extend(Meteor.Numbers, Meteor.Unit);
})();