$(function(){

	
	
    module("uicomponent");
    
    test("widget creation", function(){
    	

		console.log(jQuery.jztocSettings);

        var uicomponent = $("#testContainer").uicomponenttest();
		
		// test if widget was attached		
        equals(uicomponent.uicomponenttest != null, true, "attachment of widget");
		// test if _created was executed
		equals(uicomponent.uicomponenttest("option","created"),true, "execution of _create");
		// test if _init was executed
		equals(uicomponent.uicomponenttest("option","initialized"),true, "execution of  _init");
		
		/* helpers */
		// test if testHelper was extended correctly
		equals(uicomponent.uicomponenttest("testHelper") ,true, "testing helper");
		// test if the scope of the helper was inhereted correctly
		equals(uicomponent.uicomponenttest("testScope") ,true, "testing helper scope");
		
		/* states */
		// change currentState to 'test'
		uicomponent.uicomponenttest("currentState", "test");
		// test if state was actually changed 
		equals(uicomponent.attr("data-state"),"test", "testing states");
		
		/* properties */
		
		// test if property was created
		equals(uicomponent.uicomponenttest("hasProperty", "propertyOne"),true, "property was created");
		// test if property has the default value assigned
		equals(uicomponent.uicomponenttest("propertyOne"),1, "property has correct value");
		// change property value
		uicomponent.uicomponenttest("propertyOne", 5);
		// test if property value changed correctly
		equals(uicomponent.uicomponenttest("propertyOne"),5, "property changed value");
		// test if second property has kept consistent 
		equals(uicomponent.uicomponenttest("propertyTwo"),2, "property keept value");
		// test if scope of property is correct
		equals(uicomponent.uicomponenttest("testLocalProperty"),true, "checking scope of property");
		// test if commitProperties was executed
		equals(uicomponent.attr("data-propertyone"),"200", "commitProperties was executed");
		
		/* get children */
		// test if childSpan was added to the elements hash
		equals(uicomponent.uicomponenttest("getElements").childSpan != null,true, "testing getChildren");
		
    });
    
    
});