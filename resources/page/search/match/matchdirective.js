myApp.directive('match', function(matchResource,matchData,$filter,$interval){
   // Runs during compile
   return {
      scope:{}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        //console.log(matchData.getmatch());
        //console.log(matchData.getsummoner());
        $scope.summoner=matchData.getsummoner();
        $scope.match=matchData.getmatch();
        console.log($scope.match);
        console.log($scope.summoner);
        for (var i = 0; i < 10; i++) {
          if ($scope.match.match[i].summonerName == $scope.summoner.name) {
            $scope.teamId = $scope.match.match[i].teamId;
          }
        }

        $scope.$emit("loadingOff",{});
      },
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      //template: 'asdasd',
      templateUrl: '/resources/page/search/match/match.html',
      link: function($scope, iElm, iAttrs, controller) {

      }
    };
  });

