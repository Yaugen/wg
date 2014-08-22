/*global define */

define([
    'marionette',
    'templates'
], function (Marionette, templates) {
    'use strict';

    var app = new Marionette.Application();

    app.addRegions({
        main: '#main',
        dialog: '#dialog'
    });

    app.addInitializer(function () {
        require(['views/MainView'], function(MainView) {
            app.main.show(new MainView());
        });
        
    });

    app.on("initialize:after", function(options){
        if (Backbone.history){
            Backbone.history.start();
        }
    });

    app.vent.on('open:dialog', function(options) {
        if(options && options.viewConstructor && options.viewOptions) {
            // options.viewConstructor = options.viewConstructor.extend(options.viewOptions);
            app.dialog.show(new options.viewConstructor(options.viewOptions));
            app.dialog.$el.modal('show');
        }
    });
    app.vent.on('result:dialog', function() {
        app.dialog.$el.modal('hide');
    });

    return app;
});
