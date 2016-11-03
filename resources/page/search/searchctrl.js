	myApp.controller('searchCtrl',function($scope,OptionInject){
	console.log("생성됨 indexctrl");
	$scope.search={
		loading:false,
		error:false
	};
	$scope.$on("searchPageStart",function(event,data){
		console.log(data.loading , data.error);
		$scope.search.loading=data.loading;
		$scope.search.error=data.error;
	});

	$scope.$on("searchPageError",function(event,data){
		$scope.search.error=true;
		$scope.search.errorCode=data.errorCode;
		$scope.search.errorMessage=data.errorMessage;
	});
	$scope.$on("searchPageSuccess",function(event,data){
		$scope.search.loading=data.loading;
		$scope.search.error=data.error;
	});
});