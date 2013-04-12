define(['jquery',
    'backbone',
    'underscore','collection/eventC' ],function($,Backbone,_,EventC){
        var EventView = Backbone.View.extend({
            /*
		* contener for single event
		*/
            tagName: "article",
            /*
		* class name for contener for single event
		*/
            className: "event-container",
            /*
		* template from index.html for single event
		*/
            template: _.template($('#eventTemplate').html()),
            /*
		* template from index.html for edit single event
		*/
            editTemplate: _.template($("#eventEditTemplate").html()),
	
            /*
		* delegating events
		*/		
            events: {
                "click button.edit": "editEvent",
                "click button.save": "saveEdit",
                "click button.cancel": "cancelEdit",
                "click button.delete": "deleteEvent"
            },
            /*
		* render single event
		*/			
            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            /*
		* switch to edit mode
		*/	
            editEvent: function () {
                this.$el.html(this.editTemplate(this.model.toJSON()));
            },
            /*
		*  deleteEvent do 2 things: 
		*			1. In this view remove event from model 
		*			2. call showCurrent function in MasterView
		*/
            deleteEvent: function (){
                //remove model
                this.model.destroy();
                //remove view from page
                this.remove();
            },
            /*
		*  Cancel edit mode
		*/
            cancelEdit: function () {
                this.render();
            },
            /*
		* save change event
		* TODO: repair this function
		*/
            saveEdit: function (e) {
                e.preventDefault();
                var formData = {},
                prev = this.model.previousAttributes();
                //get form data
                $(e.target).closest("form").find(":input").not("button").each(function () {
                    var el = $(this);
                    formData[el.attr("class")] = el.val();
                });
                //update model
                this.model.set(formData);
                //render view
                this.render();
            //update collection and file 

            }, 
            first_test_func: function(val1, val2){
                return val1 * val2;
            }
        });
        return  EventView;
    });