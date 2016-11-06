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
		if (teamId == '100') {return 'blue';
		}else {return 'red';}
	}
});