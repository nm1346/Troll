myApp.filter('kdafilter',function () {
	return function (stats) {
		var kda= (stats.assists + stats.championsKilled) / stats.numDeaths;
		return kda.toFixed(2) + ':1' ;
	}	
});

myApp.filter('victoryfilter',function () {
	return function (boolean) {
		if (boolean) {return '승리';
		}else {return '패배';}
	}	
});

myApp.filter('teamcolorfilter',function () {
	return function (teamId) {
		if (teamId == '100') {return 'blue';
		}else {return 'red';}
	}	
});