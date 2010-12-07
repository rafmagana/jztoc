$.ui.widget.subclass("ui.uicomponent", {
  options: {
    data: {},
    htmlTemplate: ""
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
    if (state == null) 
      return this.__currentState;
    
    if (this.states != null) {
      this.__currentState = state;
      
      if (execute == false) 
        return;
      $.proxy(this.states[state], this)();
    }
  },
  
  invalidateView: function(){
    this._updateView();
  },
  
  //------------------------------------------------------------------------------
  destroy: function(){
    $.Widget.prototype.destroy.apply(this, arguments);
  }
  
});
