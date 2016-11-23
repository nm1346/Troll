myApp.directive('match', function(matchResource,matchData,$filter,$interval){
   // Runs during compile
   return {
      scope:{}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        $scope.summoner=matchData.getsummoner();
        $scope.match=matchData.getmatch();

        /*라인 타이틀을 위한 라인 구하기*/
        $scope.lane = matchData.getlane($scope.match,$scope.summoner);
        /*타이틀 초기값*/
        $scope.dt='경기분석';
        /*타이틀 변경*/
        $scope.selectdt=function(data){
          $scope.dt=data;
        };
        $scope.selecttdt=function(data1,data2,data3){
          $scope.dt=$scope.summoner.leagueData.tier +','+ $scope.lane.lane + ' 기준';
        };

        $scope.$emit("loadingOff",{});
      },
      /*Element로 사용*/
      restrict: 'E',
      /*templateUrl 해당 부분을 경로의 뷰로 변경*/
      templateUrl: '/resources/page/search/match/match.html',
      link: function($scope, iElm, iAttrs, controller) {
      }
    };
  });

