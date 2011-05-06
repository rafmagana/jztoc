$(function(){
	
    /* UICOMPONENT WIDGET */
    module("uicomponent widget", {
		setup : function(){
			this.uicomponent = $("#testContainer").uicomponenttest();
		},
		teardown : function(){
		}
	});
    
	test("should be attached correctly", function(){
		equals(this.uicomponent.uicomponenttest != null, true, "attachment of widget");
	});

	test("should execute _created", function(){
		equals(this.uicomponent.uicomponenttest("option","created"),true, "execution of _create");
	});

	test("should execute _init", function(){
		equals(this.uicomponent.uicomponenttest("option","initialized"),true, "execution of  _init");
	});

    /* UICOMPONENT HELPERS */
    module("uicomponent helpers", {
		setup : function(){
			this.uicomponent = $("#testContainer").uicomponenttest();
		}
	});

	test("should be extended correctly", function(){
		equals(this.uicomponent.uicomponenttest("testHelper") ,true, "testing helper");
	});

	test("should be inherited correctly", function(){
		equals(this.uicomponent.uicomponenttest("testScope") ,true, "testing helper scope");
	});

    /* UICOMPONENT STATES */
    module("uicomponent state", {
		setup : function(){
			this.uicomponent = $("#testContainer").uicomponenttest();
		}
	});

	test("should be changed to the 'test' state", function(){
		this.uicomponent.uicomponenttest("currentState", "test");
		equals(this.uicomponent.attr("data-state"),"test", "testing states");
	});

    /* UICOMPONENT PROPERTIES */
    module("uicomponent properties", {
		setup : function(){
			this.uicomponent = $("#testContainer").uicomponenttest();

			this.propertyOne = "propertyOne";
			this.propertyTwo = "propertyTwo";
			this.propertyOneValue = 1;
			this.propertyTwoValue = 2;
			this.propertiesValueToBeChangedTo = 5;

			this.uicomponent.uicomponenttest(this.propertyOne, this.propertyOneValue);
			this.uicomponent.uicomponenttest(this.propertyTwo, this.propertyTwoValue);
		}
	});

	test("propertyOne and propertyTwo should exist", function(){
		equals(this.uicomponent.uicomponenttest("hasProperty", this.propertyOne), true, "property propertyOne exists");	
	});

	test("propertyOne and propertyTwo should have the default value assigned", function(){
		expect(2);
		equals(this.uicomponent.uicomponenttest(this.propertyOne), this.propertyOneValue, "property propertyOne has correct value");
		equals(this.uicomponent.uicomponenttest(this.propertyTwo), this.propertyTwoValue, "property propertyOne has correct value");
	});

	test("value should be able to be changed", function(){
		var propertyOneOldValue = this.uicomponent.uicomponenttest(this.propertyOne);
		var propertyTwoOldValue = this.uicomponent.uicomponenttest(this.propertyTwo);
		
		this.uicomponent.uicomponenttest(this.propertyOne, this.propertiesValueToBeChangedTo);
		this.uicomponent.uicomponenttest(this.propertyTwo, this.propertiesValueToBeChangedTo);
		
		expect(4);
		
		// propertyOne assertions
		notEqual(propertyOneOldValue, this.uicomponent.uicomponenttest(this.propertyOne));
		equals(this.uicomponent.uicomponenttest(this.propertyOne), this.propertiesValueToBeChangedTo, "value of propertyOne was changed to " + this.propertiesValueToBeChangedTo);
		
		// propertyTwo assertions
		notEqual(propertyTwoOldValue, this.uicomponent.uicomponenttest(this.propertyTwo));
		equals(this.uicomponent.uicomponenttest(this.propertyTwo), this.propertiesValueToBeChangedTo, "value of propertyTwo was changed to " + this.propertiesValueToBeChangedTo);
		
	});

	test("scope should be correct", function(){
		equals(this.uicomponent.uicomponenttest("testLocalProperty"), true, "checking scope of property");
	});

	test("should execute commitProperties when property changes", function(){
		equals(this.uicomponent.attr("data-propertyone"), this.propertyOneValue.toString(), "commitProperties was executed");
	});

    module("uicomponent children", {
		setup : function(){
			this.uicomponent = $("#testContainer").uicomponenttest();
		}
	});

	test("childSpan should be added to the elements hash", function(){
		equals(this.uicomponent.uicomponenttest("getElements").childSpan != null, true, "testing getChildren");
	});
});