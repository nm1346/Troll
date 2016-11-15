myApp.directive('base', function(matchResource,matchData,$filter,$interval){
   // Runs during compile
   return {
      scope:{}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        $scope.summoner=matchData.getsummoner();
        $scope.match=matchData.getmatch();
        console.log($scope.match);
        console.log($scope.summoner);
        for (var i = 0; i < 10; i++) {
          if ($scope.match.match[i].summonerName == $scope.summoner.name) {
            $scope.teamId = $scope.match.match[i].teamId;
          }
        };

        $scope.uteamkill=0;
        $scope.uteamdeath=0;
        $scope.uteamassist=0;
        $scope.uteambaron=0;
        $scope.uteamdragon=0;
        $scope.uteamturret=0;
        $scope.ateamkill=0;
        $scope.ateamdeath=0;
        $scope.ateamassist=0;
        $scope.ateambaron=0;
        $scope.ateamdragon=0;
        $scope.ateamturret=0;
        for (var i = 0; i < 10; i++) {
          if ($scope.match.match[i].teamId == $scope.teamId) {
            $scope.uteamkill+=$scope.match.match[i].kills;
            $scope.uteamdeath+=$scope.match.match[i].deaths;
            $scope.uteamassist+=$scope.match.match[i].assists;
            $scope.uteambaron+=$scope.match.match[i].baronkills;
            $scope.uteamdragon+=$scope.match.match[i].dragonkills;
            $scope.uteamturret+=$scope.match.match[i].towerkills;
          }else{
            $scope.ateamkill+=$scope.match.match[i].kills;
            $scope.ateamdeath+=$scope.match.match[i].deaths;
            $scope.ateamassist+=$scope.match.match[i].assists;
            $scope.ateambaron+=$scope.match.match[i].baronkills;
            $scope.ateamdragon+=$scope.match.match[i].dragonkills;
            $scope.ateamturret+=$scope.match.match[i].towerkills;
          }
        }

      },
      restrict: 'E',
      templateUrl: '/resources/page/search/match/matchbase.html',
      link: function($scope, iElm, iAttrs, controller) {

      }
    };
  });
