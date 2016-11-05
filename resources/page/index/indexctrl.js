myApp.controller('indexCtrl', function($scope){
	
	
	$scope.searchLayout={
		loading:false
	};
	$scope.$on("searchStart",function(){
		$scope.searchLayout.loading=true;
	});

});
