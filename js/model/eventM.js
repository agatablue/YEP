 //model
 
 define(["jquery", "backbone"], function($, Backbone) {
    var EventM = Backbone.Model.extend({
        defaults: {
            slide_title: "Slide nb.1", 
            slide_subheading: "",
            content: "",
            member: [],
            leader: [],
            month: '',
            day: '',
            year: '',
            time: '',
            timestamp: 0
        }
    });
    return EventM;
});
