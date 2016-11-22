myApp.directive('game', function(matchResource,matchData,$filter,$interval){
   // Runs during compile
   return {
      scope:{}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        $scope.summoner=matchData.getsummoner();
        $scope.match=matchData.getmatch();
        console.log($scope.match);
        var matchdata = matchData.getmatch();
        $scope.avgdata = matchData.avg(matchdata);
        console.log($scope.avgdata);
        for (var i = 0; i < matchdata.match.length; i++) {
          if(matchdata.match[i].summonerId == $scope.summoner.summonerData.id){
            $scope.user = matchdata.match[i];
          }
        };


        $scope.rank = [];
        for (var i = 0; i < matchdata.match.length; i++) {
          $scope.rank[i] = {
                            'user':matchdata.match[i].summonerName,
                            'champion':matchdata.match[i].championNameE,
                            'kill':Math.round((matchdata.match[i].kills/$scope.avgdata.kill * 10) + 1)*5,
                            'asiist':Math.round((matchdata.match[i].assists/$scope.avgdata.assist * 10) + 1)*5,
                            'death':Math.round((matchdata.match[i].deaths/$scope.avgdata.death * 10) + 1)*5,
                            'deal':Math.round((matchdata.match[i].totalDamageDealt/$scope.avgdata.dealt * 10) + 1)*3,
                            'taken':Math.round((matchdata.match[i].totalDamageTaken/$scope.avgdata.taken * 10) + 1)*3,
                            'gold':Math.round((matchdata.match[i].goldEarned/$scope.avgdata.gold * 10) + 1),
                            'css':Math.round((matchdata.match[i].minionskilled/$scope.avgdata.minion * 10) + 1)+
                                  Math.round((matchdata.match[i].neutralMinionsKilled/$scope.avgdata.neutralMinion * 10) + 1),
                            'a':Math.round((matchdata.match[i].kills/$scope.avgdata.kill * 10) + 1)*5+
                                Math.round((matchdata.match[i].assists/$scope.avgdata.assist * 10) + 1)*5+
                                Math.round((matchdata.match[i].totalDamageDealt/$scope.avgdata.dealt * 10) + 1)*3,
                            'b':Math.round((matchdata.match[i].totalDamageTaken/$scope.avgdata.taken * 10) + 1)/
                                Math.round((matchdata.match[i].deaths/$scope.avgdata.death * 10) + 1),
                            'c':Math.round((matchdata.match[i].goldEarned/$scope.avgdata.gold * 10) + 1)+
                                Math.round((matchdata.match[i].minionskilled/$scope.avgdata.minion * 10) + 1)+
                                Math.round((matchdata.match[i].neutralMinionsKilled/$scope.avgdata.neutralMinion * 10) + 1),
                            'd':Math.round((matchdata.match[i].goldEarned/$scope.avgdata.gold * 10) + 1)+
                                Math.round((matchdata.match[i].minionskilled/$scope.avgdata.minion * 10) + 1),
                            'e':Math.round(((matchdata.match[i].minionskilled+matchdata.match[i].neutralMinionsKilled)/
                                          ($scope.avgdata.minion+$scope.avgdata.neutralMinion) * 10) + 1),
                            'f':Math.round((matchdata.match[i].wardsPlaced/$scope.avgdata.wardplace * 10) + 1)+
                                Math.round((matchdata.match[i].wardsKilled/$scope.avgdata.wardkill * 10) + 1),    
                            'total':Math.round((matchdata.match[i].kills/$scope.avgdata.kill * 10) + 1)*5+
                                    Math.round((matchdata.match[i].assists/$scope.avgdata.assist * 10) + 1)*5-
                                    Math.round((matchdata.match[i].deaths/$scope.avgdata.death * 10) + 1)*5+
                                    Math.round((matchdata.match[i].totalDamageDealt/$scope.avgdata.dealt * 10) + 1)*3-
                                    Math.round((matchdata.match[i].totalDamageTaken/$scope.avgdata.taken * 10) + 1)*3+
                                    Math.round((matchdata.match[i].goldEarned/$scope.avgdata.gold * 10) + 1)+
                                    Math.round((matchdata.match[i].minionskilled/$scope.avgdata.minion * 10) + 1)+
                                    Math.round((matchdata.match[i].neutralMinionsKilled/$scope.avgdata.neutralMinion * 10) + 1)
                            };
        }
        console.log($scope.rank);



      },
      restrict: 'E',
      templateUrl: '/resources/page/search/match/matchgame.html',
      link: function($scope, iElm, iAttrs, controller) {
      }
    };
  });
