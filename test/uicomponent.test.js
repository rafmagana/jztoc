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
		created : false,
		initialized : false
	},

	_helpers : [ TestHelper ],
	
	_properties: {
		propertyOne:1,
		propertyTwo:2
	},

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

	hasProperty: function (name) {
		return this[name] != null;
	},
	
	testLocalProperty: function () {
		this.propertyOne(200);
		
		return this.propertyOne() == 200;
	},

	_commitProperties: function () {
		if(this._properties.propertyOneChanged) {
			console.log('this._properties.propertyOneChanged');
			this._properties.propertyOneChanged = false;
			this.element.attr("data-propertyOne", this.propertyOne());
		}
	},

	states : {
		test : function() {
			this.element.attr("data-state", "test");
		}
	}
});

