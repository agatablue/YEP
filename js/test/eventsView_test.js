/*
 * Testing view/eventsView.js
 */

define(['jquery','qunit','view/eventsView'], function($,qunit,EventsView){
  	/*
	 * global object to EventsView
	 */
      var eventsView = new EventsView();
	/*
	 * testing functions
	 */
	module( "EventsView Module" );
		test( "first_test_func", function() {
			var result = eventsView.first_test_func(2,2);
			equal( result, 4, "2 square equals 4" );
		});


		
		
})