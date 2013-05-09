/*
 * Testing view/eventView.js
 */

define(['jquery','qunit','view/eventView'], function($,qunit,EventView){
		
	/*
	 * global object to EventsView
	 */
	var eventView = new EventView();
	/*
	 * testing functions
	 */
	module( "EventView Module" );
		test( "first_test_func", function() {
			var result = eventView.first_test_func(2,2);
			equal( result, 4, "2 square equals 4" );
		});

		
		
})