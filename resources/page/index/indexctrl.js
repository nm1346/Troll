myApp.controller('indexCtrl', function($scope){
	var video;
	$scope.videoOn=true;
	$scope.click=function(){
		video.muted=true;
		video.muted=false;
	}
	$scope.$watch("videoOn",function(newval,oldval){
		if(newval==oldval)return;
		newval="true"
		video=document.getElementById("myVideo");

	});

});
