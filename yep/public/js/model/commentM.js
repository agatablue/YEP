 //model
 
 define(["jquery", "backbone"], function($, Backbone) {
    var CommentM = Backbone.Model.extend({
        defaults: {
			title: "empty comment...",
			author: "Agata",
			content: "głupoty.."
        },
		initialize: function() {
//			console.log('model coment')
		}
    });
    return CommentM;
});
