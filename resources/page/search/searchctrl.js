myApp.controller('searchCtrl',function($scope,$routeParams){
	$scope.option={
	    navigation: false,
	    navigationPosition: 'right',
	    scrollingSpeed: 700,
	    loopBottom:true,
	    responsiveWidth: 600,
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
});