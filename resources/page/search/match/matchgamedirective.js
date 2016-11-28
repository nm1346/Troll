myApp.directive('game', function(matchResource,matchData,$filter,$interval){
   // Runs during compile
   return {
      scope:{}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        $scope.summoner=matchData.getsummoner();
        $scope.match=matchData.getmatch();
        var matchdata = matchData.getmatch();
        $scope.avgdata = matchData.avg(matchdata);

        /*게임 내에서 소환사 정보 구하기*/
        for (var i = 0; i < matchdata.match.length; i++) {
          if(matchdata.match[i].summonerId == $scope.summoner.summonerData.id){
            $scope.user = matchdata.match[i];
          }
        };

        /*분야별 수치 및 순위 구하기*/
        $scope.rank = [];
        for (var i = 0; i < matchdata.match.length; i++) {
          $scope.rank[i] = {
            /*소환사별 게임 데이터*/
            'user':matchdata.match[i].summonerName,
            'champion':matchdata.match[i].championNameE,
            'kill':Math.round((matchdata.match[i].kills/$scope.avgdata.kill * 10) + 1)*5,
            'asiist':Math.round((matchdata.match[i].assists/$scope.avgdata.assist * 10) + 1)*5,
            'death':Math.round((matchdata.match[i].deaths/$scope.avgdata.death * 10) + 1)*5,
            'deal':Math.round((matchdata.match[i].totalDamageDealt/$scope.avgdata.dealt * 10) + 1)*3,
            'taken':Math.round((matchdata.match[i].totalDamageTaken/$scope.avgdata.taken * 10) + 1)*3,
            'gold':Math.round((matchdata.match[i].goldEarned/$scope.avgdata.gold * 10) + 1),
            'css':Math.round((matchdata.match[i].minionskilled/$scope.avgdata.minion * 10) + 1)+
            Math.round((matchdata.match[i].neutralMinionsKilled/$scope.avgdata.neutralMinion * 10) + 1),
            /*분야별 점수*/
            'a':Math.round((matchdata.match[i].kills/$scope.avgdata.kill * 10) + 1)*5+
            Math.round((matchdata.match[i].assists/$scope.avgdata.assist * 10) + 1)*5+
            Math.round((matchdata.match[i].totalDamageDealt/$scope.avgdata.dealt * 10) + 1)*3,
            'b':Math.round((matchdata.match[i].totalDamageTaken/$scope.avgdata.taken * 10) + 1)/
            Math.round((matchdata.match[i].deaths/$scope.avgdata.death * 10) + 1),
            'c':Math.round((matchdata.match[i].goldEarned/$scope.avgdata.gold * 10) + 1)+
            Math.round((matchdata.match[i].minionskilled/$scope.avgdata.minion * 10) + 1)+
            Math.round((matchdata.match[i].neutralMinionsKilled/$scope.avgdata.neutralMinion * 10) + 1),
            'd':Math.round((matchdata.match[i].goldEarned/$scope.avgdata.gold * 10) + 1)+
            Math.round((matchdata.match[i].minionskilled/$scope.avgdata.minion * 10) + 1),
            'e':Math.round(((matchdata.match[i].minionskilled+matchdata.match[i].neutralMinionsKilled)/
              ($scope.avgdata.minion+$scope.avgdata.neutralMinion) * 10) + 1),
            'f':Math.round((matchdata.match[i].wardsPlaced/$scope.avgdata.wardplace * 10) + 1)+
            Math.round((matchdata.match[i].wardsKilled/$scope.avgdata.wardkill * 10) + 1),    
            'total':Math.round((matchdata.match[i].kills/$scope.avgdata.kill * 10) + 1)*5+
            Math.round((matchdata.match[i].assists/$scope.avgdata.assist * 10) + 1)*5-
            Math.round((matchdata.match[i].deaths/$scope.avgdata.death * 10) + 1)*5+
            Math.round((matchdata.match[i].totalDamageDealt/$scope.avgdata.dealt * 10) + 1)*3-
            Math.round((matchdata.match[i].totalDamageTaken/$scope.avgdata.taken * 10) + 1)*3+
            Math.round((matchdata.match[i].goldEarned/$scope.avgdata.gold * 10) + 1)+
            Math.round((matchdata.match[i].minionskilled/$scope.avgdata.minion * 10) + 1)+
            Math.round((matchdata.match[i].neutralMinionsKilled/$scope.avgdata.neutralMinion * 10) + 1)
          };
        }

        /*차트(분야별) 수치 %로 구하기*/
        var ua = Math.round(($scope.user.kills/$scope.avgdata.kill * 100) + 1)*0.35+
        Math.round(($scope.user.assists/$scope.avgdata.assist * 100) + 1)*0.35+
        Math.round(($scope.user.totalDamageDealt/$scope.avgdata.dealt * 100) + 1)*0.30;
        /*190이 넘어가면 차트 모양이 변경, 삼항연산자 사용*/
        ua = ua >= 190 ? 190 : ua;
        var ub = Math.round(($scope.user.towerkills/$scope.avgdata.tower * 100) + 1)*0.2+
        Math.round(($scope.user.minionskilled/$scope.avgdata.minion * 100) + 1)*0.4+
        Math.round(($scope.user.neutralMinionsKilled/$scope.avgdata.neutralMinion * 100) + 1)*0.4;
        ub = ub >= 190 ? 190 : ub;
        var uc = Math.round((($scope.user.totalDamageTaken/$scope.user.deaths)/($scope.avgdata.taken/$scope.avgdata.death) * 100) + 1);
        uc = uc >= 190 ? 190 : uc;
        var ud = Math.round(($scope.user.goldEarned/$scope.avgdata.gold * 10) + 1);
        ud = ud >= 190 ? 190 : ud;
        var ue =  Math.round((($scope.user.minionskilled+$scope.user.neutralMinionsKilled)/($scope.avgdata.minion+$scope.avgdata.neutralMinion) * 100) + 1);
        ue = ue >= 190 ? 190 : ue;
        var uf = Math.round(($scope.user.wardsPlaced/$scope.avgdata.wardplace * 10) + 1)*0.5+
        Math.round(($scope.user.wardsKilled/$scope.avgdata.wardkill * 10) + 1)*0.5;
        uf = uf >= 190 ? 190 : uf;

        /*차트*/
        Highcharts.chart('chart', {
          chart: {
            polar: true,
            backgroundColor:'rgba(0,0,0,0)',
            plotBorderWidth: null,
            margin: [0, 0, 0, 0],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0
          },
          title: {
            text: '',
            x: -80
          },

          pane: {
            size: '80%',
          },

          /*분야*/
          xAxis: {
            categories: ['공격기여', '운영능력', '수비기여', '골드획득',
            'CS', '시야싸움'],
            tickmarkPlacement: 'on',
            labels: {
              style: {
                color: 'white'
              }
            },
            lineWidth: 0,
            gridLineColor: 'white',
          },

          yAxis: {
            gridLineInterpolation: 'polygon',
            labels: {
              style: {
                color: 'white'
              }
            },
            lineWidth: 0,
            min: 0
          },

          tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
          },

          legend: {
            itemStyle: {
              color: 'white'
            },
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical',
          },

          series: [{
            /*평균*/
            name: '게임 평균',
            color: '#FFBC00',
            data: [100, 100, 100, 100, 100, 100],
            pointPlacement: 'on', 
          }, {
            /*소환사*/
            name: $scope.summoner.summonerData.name,
            color: '#0009FF',
            /*차트데이터*/
            data: [ua,ub,uc,ud,ue,uf],
            pointPlacement: 'on'
          }],
          exporting: {
            buttons: {
              contextButton: {
                enabled: false
              },
            }
          }

        });
      },
      restrict: 'E',
      templateUrl: '/resources/page/search/match/matchgame.html',
      link: function($scope, iElm, iAttrs, controller) {
      }
    };
  });
