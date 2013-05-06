require.config({
  shim: {
      underscore: {
		  exports: '_'
	  },
      backbone: {
		  deps: ["libs/underscore", "libs/jquery"],
		  exports: "Backbone"
	  },
      'backbone.localStorage': {
          deps: ['backbone'],
          exports: 'Backbone'
      }
  },

  paths: {
        jquery:					'libs/jquery',
		jqueryui:				'libs/jquery-ui-1.9.1.custom',
		underscore:				'libs/underscore',
        backbone:				'libs/backbone',
       'backbone.localStorage': 'libs/backbone.localStorage',
        fancybox:                'libs/fancybox/jquery.fancybox',
		
        //testing
		qunit:					'test/libs/qunit-1.10.0',
        backbonemysql: 'libs/backbone-mysql'
    }
});

/*
 * init eventsView and testing
 */
require(['view/eventsView'], function(EventsView){
    var events = new EventsView;
});
