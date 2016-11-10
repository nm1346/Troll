myApp.controller('searchCtrl',function($scope,$routeParams){
	$scope.layout={
		s1:{
			s0:false,
			s1:false
		}
	};
	$scope.$emit("CoverOff",{});
	$scope.$emit("loadingOff",{});
	$scope.option={
	    navigation: false,
	    scrollingSpeed: 700,
	    loopBottom:true,
	    responsiveWidth: 600,
	    controlArrows:false, 
	    verticalCentered: true,
	    continuousVertical: false,

	    afterLoad: function(anchorLink, index){ 
	            var loadedSection = $(this);
	            //using index
	            if(index == 3){ 
	                console.log("test");    //full-page 섹션옮긴후 발동 메소드
	            }
	    },
	    afterSlideLoad:function(anchor,sectionindex,slideindex){
	    	if(slideindex == 1 && sectionindex==1){
	    		$scope.layout.s1.s1 = true;
	    		
	        }
	        $scope.$apply();
	    },
	    onSlideLeave: function(anchororLink, index, slideIndex, direction, nextSlideIndex,sectionindex){
	    	if(slideIndex == 1 || sectionindex==1){
	    		$scope.$emit("CoverOff",{});
	    		$scope.layout.s1.s1 = false;
	    		
	    	}
	    	
	    }
	};
	
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