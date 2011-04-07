jQuery.extend({
	jztocSetup: function (settings) {
		var target = jQuery.extend( true, jQuery.jztocSettings, settings);
		return target;
	},
	
	jztocSettings: {
		autoLoadApp:true,
		widgetDefinition: "data-widget"
	}
});