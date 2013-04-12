define(['backbone',
	    'underscore',
	   'model/eventM'/*,'libs/backbone-mysql'*/],function(Backbone,_,EventM /* backbonemysql*/){
	
     var EventC = Backbone.Collection.extend({
        model: EventM,
        url: 'js/json/data.json',
       // localStorage: new Backbone.LocalStorage("slides"),
        comparator: function(item){
            return item.get('timestamp')
        },
        initialize: function(){
		
        }
    });
                            
    return  EventC;
});