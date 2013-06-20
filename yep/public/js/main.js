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
		jqueryui:				'libs/datepicker/jquery-ui-datepicker.min',
		underscore:				'libs/underscore',
        backbone:				'libs/backbone',
        'backbone.localStorage': 'libs/backbone.localStorage',
        fancybox:                'libs/fancybox/jquery.fancybox',
        dpd:                     '../dpd',
		
        //testing
		qunit:					'test/libs/qunit-1.10.0'
    }
});

/*
 * init eventsView and testing
 */
require(['view/eventsView', 'dpd'], function(EventsView){
    var events = new EventsView;
});
