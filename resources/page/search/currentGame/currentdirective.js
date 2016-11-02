myApp.directive('currentGame', function(SearchResource){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.search = function () {
			SearchResource.get({username : $scope.searchinput}).$promise.then(function(data){
			//console.log(data)
			$scope.teamdata = data.teamdata;
			$scope.banChampionName = data.banChampionName;
			$scope.championKey1 = data.championKey1
			$scope.championKey2 = data.championKey2
			$scope.summonerSpell1 = data.summonerSpell1
			$scope.summonerSpell2 = data.summonerSpell2
			$scope.summonerSpell3 = data.summonerSpell3
			$scope.summonerSpell4 = data.summonerSpell4
			$scope.icon1 = data.icon_list1
			$scope.icon2 = data.icon_list2
			$scope.name1 = data.summonerName_list1
			$scope.name2 = data.summonerName_list2
			$scope.mastery1 = data.mastery1
			$scope.mastery2 = data.mastery2
			console.log(data);
		 } , function(err){console.log(err)});
	}

		},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});