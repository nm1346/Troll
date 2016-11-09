myApp.filter('kdafilter',function () {
	return function (stats) {
		var kda= (stats.assists + stats.championsKilled) / stats.numDeaths;
		return kda.toFixed(2) + ':1' ;
	}
});
myApp.filter('kdatxtcolorfilter',function () {
	return function (stats) {
		var kda= (stats.assists + stats.championsKilled) / stats.numDeaths;
		if (kda < 1) {
			return 'kdared'
		}else if(kda >= 3){
			return 'kdablue'
		}else{
			return ''
		}
	}
});
myApp.filter('victoryfilter',function () {
	return function (boolean) {
		if (boolean) {return '승리';
		}else {return '패배';}
	}
});

myApp.filter('gametimefilter',function () {
	return function (gametime) {
		var minutes = parseInt(gametime / 60);
		var millisecond = gametime % 60;
		var hour = 0;
		if (minutes > 60) {
			return parseInt(minutes / 60) + '시간' + (minutes % 60) + '분';
		}
		return minutes + '분' + millisecond + '초';
	}
});
myApp.filter('victoryclassfilter',function () {
	return function (boolean) {
		if (boolean) {return 'win';
		}else {return 'lose';}
	}
});

myApp.filter('teamcolorfilter',function () {
	return function (teamId) {
		if (teamId == '100') {return 'blueteamborder';
		}else {return 'redteamborder';}
	}
});

myApp.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});
