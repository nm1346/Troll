myApp.directive('match', function(matchResource,matchData,$filter,$interval){
   // Runs during compile
   return {
      scope:{}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        $scope.summoner=matchData.getsummoner();
        $scope.match=matchData.getmatch();
        $scope.lane = matchData.getlane($scope.match,$scope.summoner);
        $scope.dt='경기분석';
        $scope.selectdt=function(data){
          $scope.dt=data;
        };
        $scope.selecttdt=function(data1,data2,data3){
          $scope.dt=$scope.summoner.leagueData.tier +','+ $scope.lane.lane + ' 기준';
        };

        

        $scope.$emit("loadingOff",{});

      },
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      //template: 'asdasd',
      templateUrl: '/resources/page/search/match/match.html',
      link: function($scope, iElm, iAttrs, controller) {

      }
    };
  });

