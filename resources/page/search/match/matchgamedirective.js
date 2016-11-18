myApp.directive('game', function(matchResource,matchData,$filter,$interval){
   // Runs during compile
   return {
      scope:{}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        $scope.summoner=matchData.getsummoner();
        $scope.match=matchData.getmatch();
        console.log($scope.match);
        var matchdata = matchData.getmatch();
        var avgdata = matchData.avg(matchdata);
      },


      restrict: 'E',
      templateUrl: '/resources/page/search/match/matchgame.html',
      link: function($scope, iElm, iAttrs, controller) {
      }
    };
  });
