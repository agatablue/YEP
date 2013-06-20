(function ($) {

var comments = [
{
    title: "nowy komentarz...",
    author: "Agata",
    content: "głupoty.."
},
{
    title: "empty comment...",
    author: "Agata2",
    content: "głupoty.."
}
		
]

define(['jquery',
    'backbone',
    'underscore', 
    'collection/commentC', 
    'view/commentView', 
    'model/commentM' ],function($,Backbone,_,CommentC, CommentView, CommentM){
	
        var CommentsView = Backbone.View.extend({
            el: $(".comment_panel"),
				
            // Delegated events for creating new items, and clearing completed ones.
            events: {
                "click .add_comment":  "createOnEnter"
            },
            initialize: function() {
                this.input    = this.$("#new-commment");
                this.collection = new CommentC(comments);
                this.render();
            },
            render: function () {
               var that = this;
                    _.each(this.collection.models, function (item) {
                        that.renderComment(item);
                    }, this);
            },
	    renderComment: function(commentModel) {
                var singleView = new CommentView({
                    model: commentModel
                });
                this.$("#comments-list").append(singleView.render().el);
            },

            // If you hit return in the main input field, and there is text to save,
            // create new **Todo** model persisting it to *localStorage*.
            createOnEnter: function() {
            }
	
        });
        return  CommentsView;
    });
    
} (jQuery));