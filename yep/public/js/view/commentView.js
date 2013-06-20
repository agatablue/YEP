define(['jquery',
    'backbone',
    'underscore','collection/commentC' ],function($,Backbone,_, CommentC){
        var CommentView = Backbone.View.extend({
            tagName:  "li",
            // Cache the template function for a single item.
            template: _.template($('#commentTemplate').html()),
		 
            events: {
		
            },
            initialize: function(){
            },
            
            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
		
        });
        return  CommentView;
    });