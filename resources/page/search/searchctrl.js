myApp.controller('searchCtrl',function($scope){
	$scope.option={
	    navigation: false,
	    navigationPosition: 'right',
	    scrollingSpeed: 700,
	    loopBottom:true,
	    responsiveWidth: 600,
	    verticalCentered : false,
	    afterLoad: function(anchorLink, index){ 
	            var loadedSection = $(this);
	            //using index
	            if(index == 3){ 
	                console.log("test");    //full-page 섹션옮긴후 발동 메소드
	            }
	    },
	    afterSlideLoad:function(anchor,sectionindex,slideindex){
	    	if(slideindex == 1 &&sectionindex==1){ 
	            console.log("test");    //full-page 슬라이드 옮긴후 발동되는 메소드
	        }
	    }
	};
	console.log("생성됨 indexctrl");
	$scope.search={
		loading:false,
		error:false
	};
	$scope.$on("searchPageStart",function(event,data){
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
		$scope.$broadcast('pageonview', {});
	});
});