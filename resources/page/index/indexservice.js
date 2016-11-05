myApp.factory('mediaElement', function(){
	var media={
		video:{
			element:{},
			setting:{
				on:true
			}
		},
		music:{
			element:{},
			setting:{
				on:true
			}
		}
	};
	return {
		getMedia:function(){
			return media;
		},
		setVideo:function(elm){
			for(var member in media.video.element) delete media.video.element[member];
			angular.extend(media.video.element,elm);
		},
		setVideoSetting:function(setting){
			for(var member in media.video.setting) delete media.video.setting[member];
			angular.extend(media.video.setting,setting);
		},
		setMusic:function(elm){
			for(var member in media.music.element) delete media.music.element[member];
			angular.extend(media.music.element,elm);
		},
		setMusicSetting:function(setting){
			for(var member in media.music.setting) delete media.music.setting[member];
			angular.extend(media.music.setting,setting);
		}

	};
});