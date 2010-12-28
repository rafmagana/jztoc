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
    data: {},
    getChildren: true,
    renderHtmlTemplate: false,
    htmlTemplate: ""
  },
  
  _helpers: null,
  _states: null,
  
  states: {
    _enterState: null,
    _exitState: null
  },
  
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
  
  getChild: function(selector){
    return $(selector, this.element);
  },
  
  addChild: function(child){
    return $(child).appendTo(this.element);
  },
  
  __currentState: null,
  currentState: function(state, execute){
    if (arguments.length == 0) 
      return this.__currentState;
    
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
      
      $.proxy(this.states[state], this)();
      
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
