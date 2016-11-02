//fullPage에 대한 옵션설정 및 삽입
myApp.service('OptionInject', function(){
  var _this = this;
  _this.mainOptions = {
    navigation: true,
    sectionsColor:['','#888'],
    navigationPosition: 'right',
    scrollingSpeed: 700,
    navigationTooltips:["asd","asd"],
    loopBottom:true,
    afterLoad: function(anchorLink, index){
            var loadedSection = $(this);

            //using index
            if(index == 3){
                console.log("test");
            }
        }
  }
});