define(['backbone',
	    'underscore',
	    'model/commentM'],function(Backbone,_,CommentM ){
	
     var CommentC = Backbone.Collection.extend({
        model: CommentM,
        initialize: function(){
			
        }
    });
                            
    return  CommentC;
});