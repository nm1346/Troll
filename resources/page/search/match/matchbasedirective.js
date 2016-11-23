myApp.directive('base', function(matchResource,matchData,$filter,$interval,SpellResource,itemResource,MasteryResource){
   // Runs during compile
   return {
      scope:{}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        $scope.summoner=matchData.getsummoner();
        $scope.match=matchData.getmatch();

        SpellResource.get({}).$promise.then(function (data) {
             $scope.spelldata = data;
        },function (err) {
             console.log('item 불러오기 err :  ',err)
        });

        itemResource.get({}).$promise.then(function (data) {
             $scope.itemdata = data;
             console.log($scope.itemdata)
          },function (err) {
             console.log('item 불러오기 err :  ',err)
          });

        MasteryResource.get({}).$promise.then(function (data) {
             $scope.masterydata = data;
             console.log($scope.masterydata)
          },function (err) {
             console.log('item 불러오기 err :  ',err)
          });

        if($scope.match.match[0].summonerName != null){
          for (var i = 0; i < $scope.match.match.length; i++) {
            if ($scope.match.match[i].summonerName == $scope.summoner.summonerData.name) {
              $scope.teamId = $scope.match.match[i].teamId;
            }
          };

        }

        for (var i = 0; i < $scope.summoner.recentgamelist.length; i++) {
           if($scope.match.match[0].matchId == $scope.summoner.recentgamelist[i].gameId){
            if($scope.summoner.recentgamelist[i].rawstats.win == true){
              $scope.win = true;
            }
            if($scope.summoner.recentgamelist[i].rawstats.win != true){
              $scope.win = false;
            }
           }
        }

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
        for (var i = 0; i < $scope.match.match.length; i++) {
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
