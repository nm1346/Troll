// 공용데이터 사용용 service


//fullPage에 대한 옵션설정 및 삽입용 서비스
myApp.service('OptionInject', function(){
  var _this = this;
  _this.mainOptions = {
    navigation: false,
    navigationPosition: 'right',
    scrollingSpeed: 700,
    loopBottom:true,
    responsiveWidth: 600,
    afterLoad: function(anchorLink, index){ 
            var loadedSection = $(this);

            //using index
            if(index == 3){ 
                console.log("test");    //full-page 3페이지로 옮길시 발동되는 메소드
            }
        }
  }
});
