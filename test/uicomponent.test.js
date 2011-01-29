var TestHelper = {
	testHelper : function() {
		return true;
	},
	testScope : function() {
		return this.options.initialized;
	}
};

$.ui.uicomponent.subclass("ui.uicomponenttest", {
	options : {
		getChildren : true,
		renderHtmlTemplate : true,
		htmlTemplate : "<span id='span1'>test</span>",

		created : false,
		initialized : false
	},

	_helpers : [ TestHelper ],

	_create : function() {
		this.options.created = true;
	},

	_init : function() {
		this.options.initialized = true;
		console.log(this);
	},

	getElements : function() {
		return this.elements;
	},

	states : {
		test : function() {
			this.element.attr("data-state", "test");
		}
	}

});
