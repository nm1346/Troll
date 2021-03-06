myApp.directive('summonerData', function(SearchResource,summoner,$routeParams,BoardData,$location,$http,itemResource,SpellResource,
	recentchampResource,BoardResource,matchResource,matchData, $interval,$timeout,$cookies){
	return {
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		 controller: function($scope, $element, $attrs, $transclude) {
		 	$scope.$emit("loadingOn",{});
		 	$scope.$emit('searchPageStart', {loading : true , error : false});
		 	itemResource.get({}).$promise.then(function (data) {
		 		summoner.setitem(data);
		 		$scope.itemdata = summoner.getitem();
		 	},function (err) {
		 		console.log('item 불러오기 err :  ',err);
		 	})
		 	SpellResource.get({}).$promise.then(function (data) {
		 		summoner.setspell(data);
		 		$scope.spelldata = summoner.getspell();
		 	},function (err) {
		 		console.log('spell 불러오기 err :  ',err);
		 	});
		 	if (Object.keys(summoner.get()).length === 0) {
		 		SearchResource.get({summonerName : $routeParams.summonerName}).$promise.then(function (data) {
		 			if (Boolean(Number(data.success))){
		 				$scope.success = data.success;
		 				summoner.set(data);
		 				summoner.addsummonerdata($scope, summoner);
		 				BoardResource.get({id:data.leagueData.id,board_category:"category"}).$promise.then(function(data){
		 					if(data.success){
		 						$scope.boardCategory=data;
		 					}
		 					$scope.$emit('searchPageSuccess', {loading : false , error : false});
		 					$scope.$emit("loadingOff",{});
		 				},function(error){
		 					$scope.$emit('searchPageSuccess', {loading : false , error : false});
		 					$scope.$emit("loadingOff",{});
		 				});

		 			}else{
		 				$scope.success = data.success;
		 				$scope.errorcode = data.errorcode;
		 				if ($scope.errorcode == 404) {
		 					$scope.errormsg = "존재하지않는 소환사명 다시검색해주세요.";
		 				}else if($scope.errorcode == 400){
		 					$scope.errormsg = "잘못된 접근입니다.";
		 				}else if($scope.errorcode === 429){
		 					$scope.errormsg = "요청이 많아 처리가 지연되고 있습니다. 잠시 후에 다시시도해주세요.";
		 				}
		 				Materialize.toast($scope.errormsg, 4000);
		 				$timeout(function () {
		 					$scope.cookieList=[];
							if(angular.isDefined($cookies.get("searchList"))){
							angular.extend($scope.cookieList,angular.fromJson($cookies.get("searchList")));
							console.log($routeParams.summonerName);
							$scope.cookieList.splice($scope.cookieList.indexOf($routeParams.summonerName),1)
							$cookies.putObject("searchList",$scope.cookieList);
							}
							$location.path("/");
		 				}, 500);
		 				$scope.$emit('searchPageSuccess', {loading : false , error : false});
		 				$scope.$emit("loadingOff",{});
		 			}
		 		},function (error) {
		 			$scope.error = error;
		 			console.log('에러',error);
		 		});
		 	}else{
		 		if ($routeParams.summonerName !== summoner.get().summonerData.name) {
		 			SearchResource.get({summonerName : $routeParams.summonerName}).$promise.then(function (data) {
		 				if (Boolean(Number(data.success))){
		 					$scope.success = data.success;
		 					summoner.set(data);
		 					summoner.addsummonerdata($scope, summoner);
		 					BoardResource.get({id:data.leagueData.id,board_category:"category"}).$promise.then(function(data){
		 						if(data.success){
		 							$scope.boardCategory=data;
		 						}
		 						$scope.$emit('searchPageSuccess', {loading : false , error : false});
		 						$scope.$emit("loadingOff",{});
		 					},function(error){
		 						$scope.$emit('searchPageSuccess', {loading : false , error : false});
		 						$scope.$emit("loadingOff",{});
		 					});
		 				}else{
		 					$scope.success = data.success;
		 					$scope.errorcode = data.errorcode;
		 					if ($scope.errorcode == 404) {
		 					$scope.errormsg = "존재하지않는 소환사명입니다. 다시검색해주세요.";
		 					}else if($scope.errorcode == 400){
		 					$scope.errormsg = "잘못된 접근입니다.";
		 					}else if($scope.errorcode === 429){
		 					$scope.errormsg = "요청이 많아 처리가 지연되고 있습니다. 잠시 후에 다시시도해주세요.";
		 					}
		 					$timeout(function () {
		 					$scope.cookieList=[];
							if(angular.isDefined($cookies.get("searchList"))){
							angular.extend($scope.cookieList,angular.fromJson($cookies.get("searchList")));
							console.log($routeParams.summonerName);
							$scope.cookieList.splice($scope.cookieList.indexOf($routeParams.summonerName),1)
							$cookies.putObject("searchList",$scope.cookieList);
							}
		 					$location.path("/");
		 					}, 500);
		 					Materialize.toast($scope.errormsg, 4000);
		 					$scope.$emit('searchPageSuccess', {loading : false , error : false});
		 					$scope.$emit("loadingOff",{});
		 				}
		 			},function (error) {
		 				console.log('에러',error);
		 			});
		 		}else{
		 			$scope.success = "1";
		 			summoner.addsummonerdata($scope, summoner);
		 			$scope.$emit('searchPageSuccess', {loading : false , error : false});
		 			$scope.$emit("loadingOff",{});
		 		}
		 	}
		 	$scope.mostindex = "";
		 	$scope.researchsummoner = function (summonerName) {
		 		$location.path('/'+summonerName);
		 	}
		 	$scope.match= function(matchId){
            //alert(matchId);
            //match로 전달 후 페이지 시작
            $scope.$emit("CoverOn",{});
            $scope.$emit("loadingOn",{});
            matchResource.get({matchId : matchId}).$promise.then(function(data){
            	matchData.setmatch(data);
            	matchData.setsummoner(summoner.get());
            	$scope.$emit("searchViewChange",3);
            },function(error){
            	$scope.$emit("loadingOff",{});
            });
        };
    },
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/summoner/summonerdata.html',
		link: function($scope, iElm, iAttrs, controller) {
        var cou = 0;
       	var promise;
        var roop = function () {
        	if ($scope.mostindex !== "" ) {
        	if (cou == 0) {
        		$scope.chartdata = [{label : '픽률' ,value : $scope.mostchamplist[$scope.mostindex].chartdata[0].value ,suffix: "%" , color : 'black' , colorComplement : 'rgba(0,0,0,0.1)' }]
        		$scope.options = {thickness: 10, mode: "gauge", total: 100};
       		}
       		if (cou == 1) {
        		$scope.chartdata = [{label : 'KDA' ,value : $scope.mostchamplist[$scope.mostindex].kda , color : 'black' , colorComplement : 'rgba(0,0,0,0.1)' }]
        		$scope.options = {thickness: 10, mode: "gauge", total: Math.ceil($scope.kdaavg)};
       		}
       		if (cou == 2) {
        		$scope.chartdata = [{label : 'Score' ,value : $scope.mostchamplist[$scope.mostindex].score , color : 'black' , colorComplement : 'rgba(0,0,0,0.1)' }]
        		$scope.options = {thickness: 10, mode: "gauge", total: Math.ceil($scope.scoreavg)};
       		}
       		if (cou == 3) {
        		$scope.chartdata = [{label : '승률' ,value : $scope.mostchamplist[$scope.mostindex].index.winlate ,suffix: "%", color : 'black' , colorComplement : 'rgba(0,0,0,0.1)' }]
        		$scope.options = {thickness: 10, mode: "gauge", total: 100};
       		}
				cou++;
			}
			if (cou > 3) {
        	 cou = 0;
        	}
		}
		$scope.start = function () {
			$scope.stop();
			promise = $interval(roop , 3000);
		}
		$scope.stop = function () {
			$interval.cancel(promise);
		}
		$scope.$watch("mostindex",function () {
			cou = 0;
			roop();
			$scope.start();
		})
		$scope.$on('$destroy', function() {
      		$scope.stop();
    	});
		}
	};
});


