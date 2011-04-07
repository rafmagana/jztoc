$(document).ready(function() {
	var jztocSettings = jQuery.jztocSettings;
	if(jztocSettings.autoLoadApp==true) {
		var dataClass = $("body").attr(jztocSettings.widgetDefinition);
		if(dataClass!=null) {
			if ( jQuery.type($(document)[dataClass])=="function") {
				$("body")[dataClass]();
			}
		}
	};
});

