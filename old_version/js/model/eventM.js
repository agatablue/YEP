 //model
 
 define(["jquery", "backbone"], function($, Backbone) {
    return Backbone.Model.extend({
        defaults: {
            slide_title: "Slide nb.1", 
            slide_subheading: "",
            content: "",
            member: [],
            leader: [],
            month: '',
            day: '',
            year: '',
            time: '12:00',
            timestamp: 0
        }
    });
});
