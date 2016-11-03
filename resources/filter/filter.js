myApp.filter('kdafilter',function () {
	return function (stats) {
		var kda= (stats.assists + stats.championsKilled) / stats.numDeaths;
		return kda.toFixed(2) + ':1' ;
	}	
});