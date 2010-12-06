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
