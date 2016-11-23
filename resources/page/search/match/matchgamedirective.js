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

        /**/
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
            text: 'Budget vs spending',
            style: {color:'white'},
            x: -80
          },

          pane: {
            size: '80%',
          },

          xAxis: {
            categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
            'Information Technology', 'Administration'],
            color:'white',
            tickmarkPlacement: 'on',
            lineWidth: 0,
            gridLineColor: 'white',

          },

          yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
          },

          tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
          },

          legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
          },

          series: [{
            name: 'Allocated Budget',
            data: [43000, 19000, 60000, 35000, 17000, 10000],
            pointPlacement: 'on'
          }, {
            name: 'Actual Spending',
            data: [50000, 39000, 42000, 31000, 26000, 14000],
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
        /**/


      },
      restrict: 'E',
      templateUrl: '/resources/page/search/match/matchgame.html',
      link: function($scope, iElm, iAttrs, controller) {
      }
    };
  });
