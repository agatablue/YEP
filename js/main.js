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
//      ,
//      gmaps: {
//            deps: ['jquery']
//       },
//       main:{
//            deps: ['jquery','gmaps']
//        }
  },

  paths: {
        jquery:					'libs/jquery',
		jqueryui:				'libs/datepicker/jquery-ui-datepicker.min',
		underscore:				'libs/underscore',
        backbone:				'libs/backbone',
        'backbone.localStorage': 'libs/backbone.localStorage',
        fancybox:                'libs/fancybox/jquery.fancybox',
//        gmaps:                    'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false',
		
        //testing
		qunit:					'test/libs/qunit-1.10.0'
    }
});

/*
 * init eventsView and testing
 */
require(['view/eventsView'], function(EventsView){
    var events = new EventsView;
});
