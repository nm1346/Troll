/*URL을 통해 Ajax 처리*/
myApp.factory('matchResource',function($resource,TrollRestUrl){
	return $resource(TrollRestUrl+"match/:matchId", {matchId:"@matchId"},{
		get:{method:"GET"}
	});
});

/*Ajax 처리된 데이터 구하기*/
myApp.factory('matchData', function(){
	var matchdata={};
	var summonerdata={};
	return {
		/*경기정보*/
		getmatch:function(){
			return matchdata;
		},
		setmatch:function(data){
			for (var member in matchdata) delete matchdata[member];
				angular.extend(matchdata,data);
		},
		/*소환사 정보*/
		getsummoner:function(){
			return summonerdata;
		},
		setsummoner:function(data){
			for (var member in summonerdata) delete summonerdata[member];
				angular.extend(summonerdata,data);
		},
		/*경기 평균값*/
		avg:function(data){
			var gameavg = {kill : 0, assist : 0, dealt : 0, death : 0, taken : 0, wardplace : 0, wardkill : 0, tower : 0, neutralMinion : 0, uneutralMinion : 0, aneutralMinion : 0, minion : 0, gold : 0 }
			for (var i = 0; i < data.match.length; i++) {
				gameavg.kill +=data.match[i].kills;
				gameavg.assist +=data.match[i].assists
				gameavg.dealt +=data.match[i].totalDamageDealt;
				gameavg.death +=data.match[i].deaths;
				gameavg.taken +=data.match[i].totalDamageTaken;
				gameavg.wardplace +=data.match[i].wardsPlaced;
				gameavg.wardkill +=data.match[i].wardsKilled;
				gameavg.tower +=data.match[i].towerkills;
				gameavg.neutralMinion +=data.match[i].neutralMinionsKilled;
				gameavg.uneutralMinion +=data.match[i].neutralMinionsKilledTeamjungle;
				gameavg.aneutralMinion +=data.match[i].neutralMinionsKilledEnemyjungle;
				gameavg.minion +=data.match[i].minionskilled;
				gameavg.gold +=data.match[i].goldEarned;
			}
			gameavg.kill = gameavg.kill / data.match.length;
			gameavg.assist = gameavg.assist / data.match.length;
			gameavg.dealt = Math.round(gameavg.dealt / data.match.length);
			gameavg.death = gameavg.death / data.match.length;
			gameavg.taken = Math.round(gameavg.taken / data.match.length);
			gameavg.wardplace = gameavg.wardplace / data.match.length;
			gameavg.wardkill = gameavg.wardkill / data.match.length;
			gameavg.tower = gameavg.tower / data.match.length;
			gameavg.neutralMinion = gameavg.neutralMinion / data.match.length;
			gameavg.uneutralMinion = gameavg.uneutralMinion / data.match.length;
			gameavg.aneutralMinion = gameavg.aneutralMinion / data.match.length;
			gameavg.minion = gameavg.minion / data.match.length;
			gameavg.gold = Math.round(gameavg.gold / data.match.length);
			return gameavg;
		},
		/*타이틀을 위한 라인 한글 처리*/
		getlane:function(data1,data2){
			var lane = {lane : 0, lane1 : 0}
			for (var i = 0; i < data1.match.length; i++) {
				if(data1.match[i].summonerId == data2.summonerData.id){
					lane.lane1 = data1.match[i].lane;
					if(data1.match[i].lane == 'DUO'){
						lane.lane = '서폿';
					}					
					if(data1.match[i].lane == 'TOP'){
						lane.lane = '탑';
					}
					if(data1.match[i].lane == 'MIDDLE'){
						lane.lane = '미드';
					}
					if(data1.match[i].lane == 'JUNGLE'){
						lane.lane = '정글';
					}
					if(data1.match[i].lane == 'DUO_CARRY'){
						lane.lane = '원딜';
					}
					if(data1.match[i].lane == 'DUO_SUPPORT'){
						lane.lane = '서폿';
					}
				}
			}
			return lane;
		}
	};
})