define(['jquery', 'jqueryui', 
    'backbone',
    'underscore',
    'collection/eventC',
    'model/eventM',
    'view/eventView',
    'view/commentsView',
    'model/commentM',
    'fancybox'], function($, ui,  Backbone,_,EventC,EventM, EventView, CommentsView, CommentM){

        var EventsView = Backbone.View.extend({
        /*
	    * main DOM element 
	    */
            el: $(".contener"),
         /*
		 * delegating events
		 */
            events: {
                //when you want to see previous event
                "click .pos_left"       : "moveBack",
                //when you want to see next event
                "click .pos_right"      : "moveNext",
                //when you want to see closest event (menu)
                "click .closest_event"  : "showCurrent",
                //when you want to add event. Show form show you new window
                "click .showForm"       : "showForm"
            },
            /*
		     * init function
		    */
            initialize: function(){

                _.bindAll(this, 'render', 'renderLink',
                    'showCurrent', 'addEvent' );
                this.collection = new EventC();
                this.model =  EventM;
				
                var self = this;

                //fetching data from json file
				this.collection.fetch({
                    reset: true,
                    success: function (model, attributes) {
                        self.render();
                        //set conteners
                        self.setConteners();
                        self.showCurrent();
                    }
                });
                //after add do this two things: renderLink and showCurrent
                this.collection.on("add", this.renderLink, this);
                this.collection.on("add", this.showCurrent, this);
                this.collection.on("reset", this.render     , this); //change here

               //it isn't Backbone event, 'cos the element is no longer inside Backbone View's
               //keep handler on add event
                $(document).find('.save_form').on('click', this.addEvent);

                //view responsible for comment panel
                this.commentView = new CommentsView({
                    el: $(".comment_panel"), 
                    model: CommentM
                })

                //google map
                this.initializeGeocoder();
            },
        /*
        * setting html elements
        */
            setConteners: function(){
                 this.tooltip = $('.info_tooltip');
                 this.form = this.$el.find('.wrapper_add_form');
            },
        /*
		 * render single event and append it to the articles div
		 */	
            renderLink: function(model){
                //set dates for every event from collection
                _.each(this.collection.models, function (item) {
                    this.setDates(item);
                }, this);
                var view = new EventView({
                    model: model
                });
                this.$(".articles").append(view.render().el);
            },
         /*
		 * render all collection
		 */	
            render: function(){
                //render collection
                this.collection.each(this.renderLink);
                // my good convention :)
                return this; 
            },
          /*
		 * after render all event, set correct dates generate from timestamp
		 */
            setDates: function(item){
                var tmStamp =  item.get("timestamp"),
                //get object date
                dateObj = this.parseTimestampToDate(tmStamp);

                //set data object in template
                item.set({
                    month: dateObj.month
                    });
                item.set({
                    day: dateObj.day
                    });
                item.set({
                    year: dateObj.year
                    });
                item.set({
                    time: dateObj.time
                    });
            },
         /*
		 * parse TimeStampt to date
		 */
            parseTimestampToDate: function(tmStamp){
                var newDateObj = {},
                today = new Date(tmStamp*1000),
                hh = today.getHours(),
                minutes = today.getMinutes();

                newDateObj.year = today.getFullYear();
                newDateObj.day = today.getDate();
                newDateObj.month = today.getMonth()+1; //January is 0!
                newDateObj.time = hh + ':' +minutes;
                return newDateObj;
            //return '' + year  + '-' + month + '-' + day + ' ' + hh + ':' + minutes;
            },
         /*
		 * return current date
		 */
            getCurrentDate: function(){
                var today = new Date();
                return Math.round(today.getTime()/1000);
            },
         /*
		 * return all timestamps
		 */
            getEventTimestamp: function () {
                return this.collection.pluck("timestamp");
            },
         /*
		 * return index of the date the closest current date (not past)
		 */
            getNextEvent: function (){
                return _.sortedIndex(this.getEventTimestamp(), parseInt(this.getCurrentDate()));
            },
         /*
        * return number of events in database
        */
            countEvents: function(){
                return this.collection.length;
            },
        /*
        * return max event Timestamp in database
        */
            maxIndexOfEvent: function(){
                return _.max(this.getEventTimestamp());
            },
        /*
        * return number of events to do in the future from today
        * ex:  _.rest([2,3,67,43,2,3],2) returns [43,2,3]
        * and we need size this array
        */
            countRestEventsUntilToday: function(){
                var rest =  _.rest(this.getEventTimestamp(),this.getNextEvent());
                return rest.length;
            },
        /*
		*  show current event
	    */
            showCurrent: function(){
                // Some events in database?
                console.log('inside showCurrent')
                var info = '';
                if(this.countEvents() != 0){
                    //check if any of events will be next
                    if( this.getCurrentDate() < this.maxIndexOfEvent()){
                        info = 'Liczba najbliższych wystąpień: '+this.countRestEventsUntilToday();
                        this.displayInfoInTooltip(info);
                    } else {
                        info = 'Nie ma zaplanowanych wystąpień'
                        this.displayInfoInTooltip(info);
                    }

                }else {
                    info = 'Brak wystąpień';
                    this.displayInfoInTooltip(info);
                }
                this.$el.find("article").removeClass('active').hide();
                this.$el.find("article").eq(this.getNextEvent()).addClass('active').show();
            },
        /*
		 *  return index active event
		 */
            getActiveEvent: function() {
                return this.$(".articles").children(".active").index();
            },
         /*
		 *  show next event and hide current
		 */
            moveNext: function() {
                var numberOfActiveEvent =  this.getActiveEvent(),
                articles = this.$el.find(".articles").children('article');	
                if( numberOfActiveEvent < this.countEvents() - 1 ){
                    articles.eq(numberOfActiveEvent).removeClass('active').hide();
                    articles.eq(numberOfActiveEvent + 1).addClass('active').fadeIn();
                } 
            },
         /*
		 *  show previous event and hide current
		 */
            moveBack: function(){
                var numberOfActiveEvent =  this.getActiveEvent(),
                articles = this.$el.find(".articles").children('article');		
                if( numberOfActiveEvent > 0 ){
                    articles.eq(numberOfActiveEvent).removeClass('active').hide();
                    articles.eq(numberOfActiveEvent - 1).addClass('active').fadeIn();
                } 
            },
         /*
		 *  parse Data to timestampt (using when user adding event)
		 */
            parseDataToTimestamp: function(date){
                var myDate=date.split("/"),
                myNewDate =myDate[0]+"/"+myDate[1]+"/"+myDate[2];
                return Math.round(+new Date(myNewDate)/1000);
            },
         /*
		 *  add event to collection
		 */
            addEvent: function(e) {
                console.log('dodawanie:')
                e.preventDefault();
                var formData = {}, date;
                // fill object data from textarea
                this.form.find('.my_input').each(function (i, el ){
                    //if input field is not empty, save in new model content from input value.
                    if($(el).val() !== ''){

                        formData[el.id] = $(el).val();
                        console.log(formData[el.id])
                    }
                });
                //I'm setting the new timestamp

                var time = formData['datepicker_value'] + " " + formData['time'];
                formData['timestamp'] = this.parseDataToTimestamp(time);
                console.log(formData)
                //and I'm adding event to the collection, comparator is sorting it automaticly
                this.collection.add(new EventM(formData));
                //I'm testing sorting one more time
                //TODO: delete this sorting
                this.collection.sort();
                //checking the position new timestapmp after sorting
                var indexInDatabase = _.indexOf(this.getEventTimestamp(), formData['timestamp']);

                //move element but only when in databas we have 2 events
                //and only when you don't want to move it to place numer one
                if( this.countEvents() > 1  && indexInDatabase !=0 ){
                    this.$(".articles")
                    .find('article:last-child')
                    .insertAfter(this.$(".articles")
                        .find('article')
                        .eq(indexInDatabase-1));
                }
                //if you move event to place numer one
                if(indexInDatabase == 0){
                    this.$(".articles").find('article:last-child').prependTo($(".articles"))
                }
			 
                this.showCurrent();
            },
         /*
		 *  show form 
		 *  TODO: add editables
		 */
            showForm: function () {
                $('.fancybox').fancybox({
                    height: '1200',
                    width: '980',
                    autoResize: 'true'
                });
                this.datePicker();
            },
         /*
		 *  activate datapicker 
		 */
            datePicker: function () {
                var calendar = $('#calendar').datepicker({
                    inline: true,
                    firstDay: 1,
                    showOtherMonths: true,
                    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    altField: '#datepicker_value'
                });
            
            },
            /*
             *  google geocode service
             */
            initializeGeocoder: function () {
                var Localize =  function() {
                    var map,
                        geocoder;

                    return {
                        initialize: function() {
                            geocoder = new google.maps.Geocoder();
                            var latlng = new google.maps.LatLng(52.24755, 21.193789);
                            var mapOptions = {
                                zoom: 8,
                                center: latlng,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            }
                            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                        },
                        codeAddress: function() {
                            map.setZoom(14);
                            var address = document.getElementById('address').value;
                            geocoder.geocode( { 'address': address}, function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    map.setCenter(results[0].geometry.location);
                                    var marker = new google.maps.Marker({
                                        map: map,
                                        position: results[0].geometry.location
                                    });
                                } else {
                                    console.log('Geocode was not successful for the following reason: ' + status);
                                }
                            });
                        }
                    }

                }
                //new object for localize
                var loc = new Localize ();
                google.maps.event.addDomListener($(".showForm")[0], 'click', loc.initialize);

                //when You click find button google finding adress
                $('#codeFind').on('click', function() {
                    loc.codeAddress();
                });


           },
         /*--------------------------------Tooltip----------------------------------------------*/
            displayInfoInTooltip: function (text) {
                this.tooltip.html(text).fadeIn();
            },

         /*--------------------------------Test----------------------------------------------*/
            first_test_func: function(val1, val2){
                return val1 * val2;
            }
        });

        return EventsView;

    });

