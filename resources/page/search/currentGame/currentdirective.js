myApp.directive('currentGame', function($interval,CurrentGameResource,$routeParams){
   // Runs during compile
   return {
      scope: {}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        $scope.$emit("CoverOn",{});
        $scope.$emit("loadingOn",{});
        CurrentGameResource.get({summonerName2 : $routeParams.summonerName}).$promise.then(function(data){        
          $scope.$emit("loadingOff",{});
          var c = 0;
          $scope.data = data

          console.log(data)
          //시간을 받아와서 인터벌함수로 1초씩 더해서 시간갱신
          $scope.inter = $interval(function () {
            if(Object.keys($scope.data).length!=0&&$scope.data.success!=false){
              var o = new Date($scope.data.gameInfo.gameStartTime)
              var n = new Date()
              var r = n.getTime() - o.getTime()
              var r2 = new Date(r)
              $scope.time = Math.floor(r / 1000 / 60) + ':' + r2.getSeconds()
              if(r2.getSeconds() < 10){
                $scope.time = Math.floor(r / 1000 / 60) + ':0' + r2.getSeconds()
              }
              if(Math.floor(r / 1000 / 60) > 1000){
                if(c == 0){
                  $scope.time = '시간을 받아오는중.'
                  c++
                }else if (c == 1) {
                  $scope.time = '시간을 받아오는중..'
                  c++
                }else if (c == 2) {
                  $scope.time = '시간을 받아오는중...'
                  c = 0
                }
                
              }
            }


          }, 1000);
        },function(error){
         $scope.$emit("loadingOff",{});

       });
        // 뒤로가기
        $scope.back=function(){
          $scope.$emit("searchViewChange",0);
        }



      },

       restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      //template: 'asdasd',
      templateUrl: '/resources/page/search/currentGame/currentGame.html',
      link: function($scope, iElm, iAttrs, controller) {
        // 다른페이지로 옮겼을때 인터벌함수 취소
        iElm.on("$destroy",function(){
          $interval.cancel($scope.inter)
        })
      }
    };
  });

