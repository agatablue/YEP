 //model
 
 define(["jquery", "backbone"], function($, Backbone) {
    return Backbone.Model.extend({
        defaults: {
            slide_title: "Your title ",
            slide_subheading: "",
            content: "Your content",
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
