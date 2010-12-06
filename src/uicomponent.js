$.ui.widget.subclass("ui.uicomponent", {
  options: {
    data: {},
    htmlTemplate: ""
  },
  
  _create: function(){
    var _states = {};
    for ( var i in this._states) {
      _states[this._states[i]] = this._states[i]; 
    }
    
    this._states = _states;
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
  
  invalidateView: function () {
    this._updateView();
  },
  
  
  //------------------------------------------------------------------------------
  destroy: function(){
    $.Widget.prototype.destroy.apply(this, arguments);
  }
  
  
  
});
