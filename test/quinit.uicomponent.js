$(function(){

	
	
    module("uicomponent");
    
    test("widget creation", function(){
    	
        var uicomponent = $("#testContainer").uicomponenttest();
				
        equals(uicomponent.uicomponenttest != null, true, "attachment of widget");
		equals(uicomponent.uicomponenttest("option","created"),true, "execution of _create");
		equals(uicomponent.uicomponenttest("option","initialized"),true, "execution of  _init");
		
		/* helpers */
		equals(uicomponent.uicomponenttest("testHelper") ,true, "testing helper");
		equals(uicomponent.uicomponenttest("testScope") ,true, "testing helper scope");
		
		/* states */
		uicomponent.uicomponenttest("currentState", "test");
		equals(uicomponent.attr("data-state"),"test", "testing states");
		
		/* properties */
		
		equals(uicomponent.uicomponenttest("hasProperty", "propertyOne"),true, "property was created");
		equals(uicomponent.uicomponenttest("propertyOne"),1, "property has correct value");
		uicomponent.uicomponenttest("propertyOne", 5);
		equals(uicomponent.uicomponenttest("propertyOne"),5, "property changed value");
		equals(uicomponent.uicomponenttest("propertyTwo"),2, "property keept value");
		equals(uicomponent.uicomponenttest("testLocalProperty"),true, "checking scope of property");
		equals(uicomponent.css("background"),"red", "commitProperties was executed");
		
		/* get children */
		equals(uicomponent.uicomponenttest("getElements").span1 != null,true, "testing getChildren");
		
    });
    
    
});