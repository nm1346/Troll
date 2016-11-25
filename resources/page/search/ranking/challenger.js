myApp.directive('challengerRank', function($interval,ChallengerResource,$routeParams){
   // Runs during compile
   return {
      scope: {}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        $scope.$emit("CoverOn",{});
        $scope.$emit("loadingOn",{});
        ChallengerResource.get().$promise.then(function(data){        
          $scope.$emit("loadingOff",{});
          $scope.data = data
          console.log(data)
        },function(error){
         $scope.$emit("loadingOff",{});

       });




      },

      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      //template: 'asdasd',
      templateUrl: '/resources/page/search/ranking/challenger.html',
      link: function($scope, iElm, iAttrs, controller) {

      }
    };
  });

