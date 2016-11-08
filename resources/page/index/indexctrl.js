myApp.controller('indexCtrl', function($scope){
	
	$scope.$emit("coverOn",{});
	$scope.searchLayout={
		loading:false
	};
	$scope.$on("searchStart",function(){
		$scope.searchLayout.loading=true;
	});

});
