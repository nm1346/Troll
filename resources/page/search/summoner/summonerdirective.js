myApp.directive('summonerData', function(matchResource,matchData,SearchResource,summoner,$routeParams,BoardData,$location,$http,itemResource,SpellResource,
   recentchampResource,BoardResource){
	return {
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		 controller: function($scope, $element, $attrs, $transclude) {
		 	/*$scope.$emit('searchPageStart',{});*/
		 	$scope.$emit("loadingOn",{});
		 	$scope.$emit('searchPageStart', {loading : true , error : false});
		 
     	
		 	$scope.$on('pageonview',function (data) {
		 		var totaldata = summoner.get();
		 		$scope.summonerdata = totaldata['summonerData'];
		 		$scope.leaguedata = totaldata['leagueData'];
		 		$scope.recentgame = totaldata['recentgamelist'];
		 		if (totaldata['most'].length > 0) {
		 		var mostchamplist = summoner.champscore(totaldata['most']);
		 		$scope.mostchamp = mostchamplist[0];
		 		$scope.wostchamp = mostchamplist[mostchamplist.length - 1];
		 		
		 		}
		 			if (angular.isObject(totaldata['leagueData'])){
		 				if (totaldata['leagueData'].entrylist[0].division === 'I') {
		 					$scope.tierurl = totaldata['leagueData'].tier.toLowerCase();
		 				}else{
		 					$scope.tierurl = totaldata['leagueData'].tier.toLowerCase() +'_'+totaldata['leagueData'].entrylist[0].division.toLowerCase();
		 				}
		 			}else{
		 				$scope.tierurl = "unlanked";
		 			}
		 		});
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

			$scope.avgcs =  function (stats) {
				console.log(stats.minionsKilled,stats.timePlayed);
				return (stats.minionsKilled / (stats.timePlayed / 60)).toFixed(2);
			}

      if (Object.keys(summoner.get()).length === 0) {
             SearchResource.get({summonerName : $routeParams.summonerName}).$promise.then(function (data) {
                if (Boolean(Number(data.success))){
                   summoner.set(data);
                   summoner.addsummonerdata($scope, summoner);
                   $scope.$emit('searchPageSuccess', {loading : false , error : false});
                   $scope.$emit("loadingOff",{});
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
                      $scope.$emit('searchPageSuccess', {loading : false , error : false});
                      $scope.$emit("loadingOff",{});
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
       },
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: '/resources/page/search/summoner/summonerdata.html',
      link: function($scope, iElm, iAttrs, controller) {
         $('#recentchampmodal').modal({
            dismissible:true,
            opacity:0,
            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
               var overlay = $('.modal-overlay');
            // remove it
            overlay.detach();
         },
      });

         $scope.getrecentchamp = function (summonerId) {
            console.log(summonerId);
            recentchampResource.get({summonerId : summonerId}).$promise.then(function (data) {
               console.log(data);
               for (var i = 0; i < data['champlist'].length; i++) {
                  data['champlist'][i].drag = true
               }
               $scope.recentchamplist = data['champlist'];
               console.log($scope.recentchamplist);
               $('#recentchampmodal').modal('open');
            },function (error) {   
               console.log(error);
            });
         }   
         $scope.startCallback = function(event, ui, title) {
            console.log('You started draggin: ' + title.title);
            $scope.draggedTitle = title.title;
         };

         $scope.stopCallback = function(event, ui) {
            console.log('Why did you stop draggin me?');
         };

         $scope.dragCallback = function(event, ui) {
            console.log('hey, look I`m flying');
         };

         $scope.dropCallback = function(event, ui) {
            console.log('hey, you dumped me :-(' , $scope.draggedTitle);
         };

         $scope.overCallback = function(event, ui) {
            console.log('Look, I`m over you');
         };

         $scope.outCallback = function(event, ui) {
            console.log('I`m not, hehe');
         };
      }
   };
		 },
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/summoner/summonerdata.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});


