myApp.directive('tier', function($filter,$interval){
   // Runs during compile
   return {
      scope:{}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
      },
      restrict: 'E',
      templateUrl: '/resources/page/search/match/matchtier.html',
      link: function($scope, iElm, iAttrs, controller) {

      }
    };
  });
