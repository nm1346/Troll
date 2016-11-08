myApp.controller('searchCtrl',function(
	$scope,$routeParams,CurrentGameResource,currentGameData){
	$scope.$emit("CoverOff",{});
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
	    	if(slideindex == 1 &&sectionindex==1){
	    		$scope.$emit("CoverOn",{});
	            CurrentGameResource.get({summonerName2 : $routeParams.summonerName}).$promise.then(function(data){
	            	currentGameData.set(data)
				},function(error){
					console.log(error);
				});

	        }

	    },
	    onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
	    	if(slideIndex == 1 ||index==1){
	    		$scope.$emit("CoverOff",{});
	    	}
	    }
	};
});