$.ui.uicomponent.subclass("ui.itemrenderer", {
	options : {
		listData : {
			owner : null, // reference to the widget's holder
			data : null, // reference to the entire row's data
			column : null, // reference to the column's definition
			index : null, // index of item inside the containing array (data provider)
			td : null, // reference to the td DOM object contairer (when applies)
			tr : null
		// reference to the tr DOM object contairer (when applies)
	}
},

	_create : function() {
		this.element.addClass("ui-itemrenderer");
	},

	_dispatchEvent : function(eventType, data) {
		var event = jQuery.Event(eventType);
		if (data != null) {
			$.extend(event, data);
		}
		event.listData = this.options.listData;
		$(this.options.listData.owner.element).trigger(event);
	},

	// ------------------------------------------------------------------------------
	destroy : function() {
		$.Widget.prototype.destroy.apply(this, arguments);
	}

});
