/*
 * Testing view/eventsView.js
 */

define(['jquery','qunit','view/eventsView'], function($,qunit,EventsView){
		
	/*
	 * global object to EventsView
	 */
//var eventsView = new EventsView();
	/*
	 * testing functions
	 */
	module( "EventsView Module" );
		test( "first_test_func", function() {
			var result = eventsView.first_test_func(2,2);
			equal( result, 4, "2 square equals 4" );
		});
//		test("parseTimestampToDate", function(){
//			var result = eventsView.parseTimestampToDate(1355958000);
//			equal( result, '2012-12-20 0:0', "1355958000 is 2012-12-20 0:0" );
//		});
        //TODO: add test to this function
//		test('parseDataToTimestamp', function(){
//			var result = eventsView.parseDataToTimestamp('2012-12-20 0:0');
//			equal( result, 13559580000, "2012-12-20 0:0 is 1355958000" );
//		})

		
		
})