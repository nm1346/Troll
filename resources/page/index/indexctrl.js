myApp.controller('indexCtrl', function($scope,$timeout,$location){
	var video;
	$scope.videoOn=true;
	$scope.mute=true;
	$scope.$watch("videoOn",function(newval,oldval){
		if(newval==oldval)return;
		video=document.getElementById("myVideo");
		if(newval==false){
			$scope.mute=false;
		}else{
			$scope.mute=true;
		}
	});
	$scope.$watch("mute",function(newval,oldval){
		if(newval==oldval)return;
		video=document.getElementById("myVideo");
		if(video!=null){
			if(newval==true){
				video.muted=false;
			}else{
				video.muted=true;
			}
		}
		
	});
	$scope.searchLayout={
		loading:false
	};
	$scope.search = function (summonerName) {

		if (summonerName == "" ||summonerName == null) {
			Materialize.toast('소환사의 아이디를 입력해주세요.', 4000)
			return;
		}
		$scope.searchLayout.loading=true;
		$timeout(function(){
			$location.path("/" +summonerName);
		},1000);	
	}

});
