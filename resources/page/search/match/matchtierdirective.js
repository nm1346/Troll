
myApp.directive('tier', function(matchResource,matchData,$filter,$interval){
   // Runs during compile
   return {
      scope:{}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        $scope.summoner=matchData.getsummoner();
        $scope.match=matchData.getmatch();
        var matchdata = matchData.getmatch();
        var avgdata = matchData.avg(matchdata);
        var tavgdata = $scope.match.avg
        $scope.lane = matchData.getlane($scope.match,$scope.summoner);

        for (var i = 0; i < matchdata.match.length; i++) {
          if(matchdata.match[i].summonerId == $scope.summoner.summonerData.id){
            $scope.user = matchdata.match[i];
          }
        }

        /*평균값 중 소환사의 티어와 라인에 맞는 값 구하기*/
        for (var i = 0; i < $scope.match.avg.length; i++) {
          /*마스터와 챌린저는 동일*/
          if($scope.summoner.leagueData.tier == 'MASTER'){
            if($scope.lane.lane1 == $scope.match.avg[i].lane && 'CHALLENGER' == $scope.match.avg[i].tier.toUpperCase()){
              $scope.tavgdata =  ($scope.match.avg[i]);
            }
          }
          if($scope.lane.lane1 == 'DUO'){
            $scope.lane.lane1 = 'DUO_SUPPORT';
          }
          if($scope.lane.lane1 == $scope.match.avg[i].lane && $scope.summoner.leagueData.tier == $scope.match.avg[i].tier.toUpperCase()){
            $scope.tavgdata =  ($scope.match.avg[i]);
          }

        }

        /*평균구하기*/
        $scope.tavgdata.kills = Math.round($scope.tavgdata.kills*10) / 10;
        $scope.tavgdata.assists = Math.round($scope.tavgdata.assists*10) / 10;
        $scope.tavgdata.totalDamageDealt = Math.round($scope.tavgdata.totalDamageDealt*10) / 10;
        $scope.tavgdata.deaths = Math.round($scope.tavgdata.deaths*10) / 10;
        $scope.tavgdata.totalDamageTaken = Math.round($scope.tavgdata.totalDamageTaken*10) / 10;
        $scope.tavgdata.minionskilled = Math.round($scope.tavgdata.minionskilled*10) / 10;
        $scope.tavgdata.neutralMinionsKilled = Math.round($scope.tavgdata.neutralMinionsKilled*10) / 10;
        $scope.tavgdata.neutralMinionsKilledEnemyjungle = Math.round($scope.tavgdata.neutralMinionsKilledEnemyjungle*10) / 10;
        $scope.tavgdata.neutralMinionsKilledTeamjungle = Math.round($scope.tavgdata.neutralMinionsKilledTeamjungle*10) / 10;
        $scope.tavgdata.wardsKilled = Math.round($scope.tavgdata.wardsKilled*10) / 10;
        $scope.tavgdata.wardsPlaced = Math.round($scope.tavgdata.wardsPlaced*10) / 10;
        $scope.tavgdata.towerkills = Math.round($scope.tavgdata.towerkills*10) / 10;
        $scope.tavgdata.goldEarned = Math.round($scope.tavgdata.goldEarned);
      },
      restrict: 'E',
      templateUrl: '/resources/page/search/match/matchtier.html',
      link: function($scope, iElm, iAttrs, controller) {

      }
    };
  });
