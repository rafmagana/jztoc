var FocusEvents = {
  FOCUSIN: "focusin",
  FOCUSOUT: "focusout"
};

var MouseEvents = {
  CLICK: "click",
  DBCLICK: "dbclick",
  HOVER: "hover",
  MOUSEDOWN: "mousedown",
  MOUSEENTER: "mouseenter",
  MOUSELEAVE: "mouseleave",
  MOUSEMOVE: "mousemove",
  MOUSEOUT: "mouseout",
  MOUSEOVER: "mouseover",
  MOUSEUP: "mouseup"
};
$.extend(MouseEvents, FocusEvents);

var KeyboardEvents = {
  KEYDOWN: "keydown",
  KEYPRESS: "keypress",
  KEYUP: "keyup"
};
$.extend(KeyboardEvents, FocusEvents);

var FormEvents = {
  BLUR: "blur",
  CHANGE: "change",
  FOCUS: "focus",
  SELECT: "select",
  SUBMIT: "submit"
};

var StateEvents = {
  EXITSTATE: "exitstate",
  ENTERSTATE: "enterstate",
  ENDSTATE: "endstate"
};

var UIComponentEvents = {
  STARTRENDERING: "startrendering",
  FINISHRENDERING: "finishrendering"
};

$.ui.widget.subclass("ui.uicomponent", {
  options: {
    /**
     * data property is initialized with an empty object <code>{}</code>. 
     */
    data: {},
    
    /**
     * if <code>getChildren</code> is set to true, the widget upon creation will add all the elements with an 
     * <code>id</code> attribute set to the <code>elements</code> collection for later access.
     */
    getChildren: true,
    
    /**
     * if <code>renderHtmlTemplate</code> set to true, the widget upon creation will try to render into its 
     * self any content provided on the <code>htmlTemplate</code> option.
     */
    renderHtmlTemplate: false,
    
    /**
     * Content to be rendered into the widget's <code>this.element</code> element.
     */
    htmlTemplate: ""
  },
  
  /**
   * The <code>_helpers</code> property is an array that intended to hold instances of any object you
   * wish to append (extend) in to the widget's structure.
   * 
   * This is similar to using an 'include' statement as in other languages. the intention of a helper is to 
   * share common methods that do not necessarily need to be part of a widget to be used in subclassing.
   * 
   * Use case:
   * 
   * Take for example some validation methods, you may want to validate if form element is valid. for this
   * you have many ways to implement your method into the widget. 
   * 
   *  - One would be declaring a global validation method and just execute it where ever you want, but 
   *  this is ugly :).
   *  
   *   - Another way would be to have a base widget that has all of your validation routines and you would
   *   have to sublclass that widget to access them.
   *   
   *   - <b>helpers</b> intend to make your life easier, you may declare an object with the validation
   *   methods and then add them as includes to your class, this way you can at any point add validation 
   *   features to any object without the need of subclassing, and keeping your code encapsulated. 
   *   
   *   Example:
   *   
   *   Say you want to check if a text input is more than 4 chars long, so, in a separete file 
   *   (eg. form.validation.js) you create your helper:
   *   
   *    <code>
   *    var FormValidation = {
   *          validateLengh: function (value) {
   *            return value.length > 5;
   *          }
   *    }
   *    </code>
   *    
   *    then on your widget declaration you do:
   *    
   *    <code>
   *    _helpers[FormValidation]
   *    </code>
   *   
   *   now you are ready to use your helpers! inside your widget you may do:
   *   
   *   <code>
   *   submitform: function () {
   *        if (this.validateLengh($('input #name').val()) {
   *           // execute ajax!
   *        }
   *   }
   *   </code>
   *   
   */
  _helpers: [],
  
  /**
   * The idea of having this collection is so we can easily access any element inside the widget. Elements
   * need to have their <code>id</code> attribute set in order to be present on the collection.  for more
   * explanation on how you may access check the <code>_getChildren()</code> method.
   */
  elements: {}, 
  
  /**
   * States can provide a way to describe the different states of your components. each state is declared 
   * as a javascript function where you can alter the way your component behaves or looks.
   * 
   * The <code>states</code> object is a simple object used to define states of the widget. You may 
   * change from state to state with the <code>currentState</code> method. 
   * 
   * When ever a state is changed, some events will be triggered in the following order: 
   * <code>
   * StateEvents.EXITSTATE
   * StateEvents.ENTERSTATE
   * -- new state is executed
   * StateEvents.ENDSTATE
   * </code>
   * 
   * To declare a new state you can simply add a new method to the <code>states</code> object as 
   * shown here:
   * <code>
   * states: {
   *     searchView: function() {
   *         // clean form elements
   *         // if there are results from a previous operation, fade them
   *     },
   *     resultView:function() {
   *         // clean previous results
   *         // show new results, change opacity of results area
   *      }
   * },
   * </code>
   * 
   * States as any other object in the widget will get merged or overwritten (if declared in parent widget) 
   * when subclassed. 
   * 
   */
  states: {
    _enterState: null,
    _exitState: null
  },
  
  /**
   * if any helper is defined it will add it to the base class of the widget.
   * when executed, it will run depending on the widget's configuration the methods:
   * <code>_renderHtmlTemplate()</code>
   * <code>_getChildren()</code>
   */
  _create: function(){
    if (this._helpers != null) {
      for (var i in this._helpers) {
        $.extend(this, this._helpers[i]);
      }
    }
    
    var _states = {};
    for (var i in this._states) {
      _states[this._states[i]] = this._states[i];
    }
    
    this._states = _states;
    
    if (this.options.renderHtmlTemplate == true) {
      this._renderHtmlTemplate();
    }
    
    if (this.options.getChildren == true) {
      this._getChildren();
    }
  },
  
  /**
   * Searches for all the children elements that have a specified <code>id</code> attribute and adds 
   * them to the <code>this.element</code> widget property. 
   * 
   * Use: if inside the the widget we have something declared such as:
   * <code><span id='mySpan' >Hello</span></code>
   * Once this method runs, we will be able to access it via:
   * <code>this.elements.mySpan</code>  
   */
  _getChildren: function(){
    var collection = [];
    $('[id]', this.element).each(function(){
      if ($(this).attr('id') != null) {
        collection.push({
          id: $(this).attr('id'),
          instance: $(this)
        });
      }
    });
    this.elements = {};
    for (var index in collection) {
      var o = collection[index];
      this.elements[o.id] = o.instance;
    }
  },
  
  _renderHtmlTemplate: function(selector){
    if (this.options.htmlTemplate == null || this.options.htmlTemplate == "") {
      return;
    }
    
    $(object).trigger(UIComponentEvents.STARTRENDERING);
    
    var object = this.element;
    if (selector != null) {
      if (typeof(selector) !== "string") {
        object = selector;
      }
      else {
        object = $(selector);
      }
    }
    object.html(this.options.htmlTemplate);
    
    $(object).trigger(UIComponentEvents.FINISHRENDERING);
  },
  
  /**
   * get element that is child of the widget, any selector can be passed.
   */
  getChild: function(selector){
    return $(selector, this.element);
  },
  
  /**
   * add content specified as the parameter to the end of the <code>this.element</code>. If the 
   * <code>id</code> attribute is set, it will add the element to the <code>this.elements</code> collection.
   * the state function will recieve a parameter with the value of the previous sate, if previous state 
   * was not set null will be returned
   */
  addChild: function(child){
    var child = $(child).appendTo(this.element);
    var id = child.attr("id");
    if ( id != null) this.elements.push[id] = child;
    return child;
  },
  
  __currentState: null,
  currentState: function(state, execute){
    if (arguments.length == 0) 
      return this.__currentState;
    
    var previousStep = this.__currentState;
    
    if (this.states != null) {
      this.__currentState = state;
      
      if (execute == false) 
        return;
      
      if (this.states._exitState != null) 
        $.proxy(this.states._exitState, this)(state);
      else 
        $(this.element).trigger(StateEvents.EXITSTATE);
      
      if (this.states._enterState != null) 
        $.proxy(this.states._enterState, this)(state);
      else 
        $(this.element).trigger(StateEvents.ENTERSTATE);
      
      $.proxy(this.states[state], this)(previousStep);
      
      if (this.states._endState != null) 
        $.proxy(this.states._endState, this)(state);
      else 
        $(this.element).trigger(StateEvents.ENDSTATE);
      
    }
  },
  
  _updateView: function(){
    // empty
  },
  
  invalidateView: function(){
    this._updateView();
  },
  
  //------------------------------------------------------------------------------
  destroy: function(){
    $.Widget.prototype.destroy.apply(this, arguments);
  }
  
});
$.ui.uicomponent.subclass("ui.document", {
  
  pageTitle: function (title) {
    $("title").text(title);
  },
  
  //------------------------------------------------------------------------------
  destroy: function(){
    $.Widget.prototype.destroy.apply(this, arguments);
  }
  
});
$.ui.uicomponent.subclass("ui.itemrenderer", {
  options: {
    listData: {
      owner: null, // reference to the widget's holder
      data: null, // reference to the entire row's data
      column: null, // reference to the column's definition
      index: null, // index of item inside the containing array (data provider)
      td: null, // reference to the td DOM object contairer (when applies)
      tr: null // reference to the tr DOM object contairer (when applies)
    }
  },
  
  //------------------------------------------------------------------------------
  destroy: function(){
    $.Widget.prototype.destroy.apply(this, arguments);
  }
  
});
(function($){
  $.fn.addEventListener = function(eventType, handler, scope, eventData){
    if (arguments.length < 2) 
      return;
      
    var fn = handler;
    if (arguments.length > 2) {
      fn = $.proxy(handler, scope);
    }
    return this.each(function(){
      $(this).bind(eventType, eventData, fn);
    });
    
  };
})(jQuery);
(function($){
  $.fn.getChild = function(selector){
	  if (jQuery.type(selector)=="number") {
		  return $(this).children().eq(selector);
	  }
    return $(selector, this);
  };
})(jQuery);
