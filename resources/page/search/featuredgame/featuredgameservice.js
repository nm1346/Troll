myApp.factory('FeaturedResource',function(TrollRestUrl,$resource){
	return $resource(TrollRestUrl+"featuredgames",{}, {get:{method:"GET",isArray:false}});
})