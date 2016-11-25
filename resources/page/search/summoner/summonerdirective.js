myApp.directive('summonerData', function(SearchResource,summoner,$routeParams,BoardData,$location,$http,itemResource,SpellResource,
	recentchampResource,BoardResource,matchResource,matchData){
	return {
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		 controller: function($scope, $element, $attrs, $transclude) {
		 	/*$scope.$emit('searchPageStart',{});*/
		 	$scope.$emit("loadingOn",{});
		 	$scope.$emit('searchPageStart', {loading : true , error : false});
		 	itemResource.get({}).$promise.then(function (data) {
		 		summoner.setitem(data);
		 		$scope.itemdata = summoner.getitem();
		 	},function (err) {
		 		console.log('item 불러오기 err :  ',err)
		 	})
		 	SpellResource.get({}).$promise.then(function (data) {
		 		summoner.setspell(data);
		 		$scope.spelldata = summoner.getspell();
		 	},function (err) {
		 		console.log('spell 불러오기 err :  ',err)
		 	});
		 	if (Object.keys(summoner.get()).length === 0) {
		 		SearchResource.get({summonerName : $routeParams.summonerName}).$promise.then(function (data) {
		 			if (Boolean(Number(data.success))){
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
		 				$scope.$emit('searchPageError', {errorCode : data.errorcode , errorMessage : data.errormsg});
		 				$scope.$emit("loadingOff",{});
		 			}
		 		},function (error) {
		 			console.log('에러',error);
		 		});
		 	}else{
		 		if ($routeParams.summonerName !== summoner.get().summonerData.name) {
		 			SearchResource.get({summonerName : $routeParams.summonerName}).$promise.then(function (data) {
		 				if (Boolean(Number(data.success))){
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
		 					$scope.$emit('searchPageError', {errorCode : data.errorcode , errorMessage : data.errormsg});
		 					$scope.$emit("loadingOff",{});
		 				}
		 			},function (error) {
		 				console.log('에러',error);
		 			});
		 		}else{
		 			summoner.addsummonerdata($scope, summoner);
		 			$scope.$emit('searchPageSuccess', {loading : false , error : false});
		 			$scope.$emit("loadingOff",{});
		 		}
		 	}
		 	$scope.mostindex = "";
		 	$scope.mostindexreset = function () {
		 		$scope.mostindex = "";
		 	}
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
			$scope.recentchamplist = [];
			$scope.getrecentchamp = function (summonerId) {
				recentchampResource.get({summonerId : summonerId}).$promise.then(function (data) {
					for (var i = 0; i < data['champlist'].length; i++) {
						data['champlist'][i].drag = true;
					}
					$('#recentchampmodal').modal({
						opacity:0,
					ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
						var overlay = $('.modal-overlay');
					// remove it
					overlay.detach();
				},
			});
					$scope.recentchamplist = data['champlist'];
					$('#recentchampmodal').modal('open');
				},function (error) {	
					champdata = error;
					console.log(error);
				});
			}	
			$scope.list2 = {};
			$scope.startCallback = function(dragdata, index) {
				console.log('You started draggin:');
			};

			$scope.stopCallback = function(event, ui) {
				console.log('Why did you stop draggin me?');
			};
			$scope.dropCallback = function(dragdata, eventele) {
				console.log('hey, you dumped me :-(');
				console.log(dragdata);
				var index = parseInt(eventele.draggable.context.attributes.value.value);
				console.log(eventele.draggable.context.attributes.value.value);
				$scope.recentchamplist.splice(index,1);
			};
			$scope.overCallback = function(event, ui) {
				console.log('Look, I`m over you');
			};
			$scope.outCallback = function(event, ui) {
				console.log('I`m not, hehe');
			};
		}
	};
});



