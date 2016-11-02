myApp.factory('summonerandrecent', function(){
	var searchdata={};
	return {
		get:function(){
			return searchdata;
		},
		set:function(data){
			for (var member in searchdata) delete searchdata[member];
			angular.extend(searchdata,data);
		},
	};
})