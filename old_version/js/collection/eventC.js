define(['backbone',
	    'underscore',
	    'model/eventM', 'backbone.localStorage'],function(Backbone,_,EventM,LocalStorage ){
	
     return Backbone.Collection.extend({
        model: EventM,
        url: 'js/json/event.json',
        //localStorage: new Backbone.LocalStorage("myid"), // for testing purposes
        //localStorage: new Backbone.LocalStorage("testlS"),
       // localStorage: new Backbone.LocalStorage("slides"),
        comparator: function(item){
            return item.get('timestamp')
        },
        initialize: function(){
		
        }
    });
});