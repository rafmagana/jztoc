$.ui.widget.subclass("ui.uicomponent", {
  options: {
    data: {},
    htmlTemplate: ""
  },
  
  _helpers:null,
  _states:null,
  states:{
    _enterState:null,
    _exitState:null
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
  },
  
  _renderHtmlTemplate: function(selector){
    if ( this.options.htmlTemplate== null || this.options.htmlTemplate == "") {
      return;
    }
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
        
      if ( this.states._enterState != null )
        $.proxy(this.states._enterState, this)(state);
      
      $.proxy(this.states[state], this)();
      
      if ( this.states._exitState != null )
        $.proxy(this.states._exitState, this)(state);
    }
  },
  
  _updateView:function () {
    
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
