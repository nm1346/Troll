myApp.directive('match', function(matchResource,matchData,$filter,$interval){
   // Runs during compile
   return {
      scope:{}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        //console.log(matchData.getmatch());
        //console.log(matchData.getsummoner());
        $scope.dt='경기분석';
        $scope.selectdt=function(data){
          $scope.dt=data;
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

