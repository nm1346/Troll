myApp.factory('FeaturedResource',function(TrollRestUrl,$resource){
	return $resource(TrollRestUrl+"featuredgames/:encryptionKey/:gameId",{
		encryptionKey:"@encryptionKey",
		gameId:"@gameId"
	},{
		get:{method:"GET",isArray:false}
	});
})
