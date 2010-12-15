$.ui.widget.subclass("ui.uicomponent", {
  options: {
    data: {},
    getChildren: false,
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
    }
    
  },
  
  _renderHtmlTemplate: function(selector){
    if (this.options.htmlTemplate == null || this.options.htmlTemplate == "") {
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

      if (this.states._exitState != null) 
        $.proxy(this.states._exitState, this)(state);
      
      if (this.states._enterState != null) 
        $.proxy(this.states._enterState, this)(state);
      
      $.proxy(this.states[state], this)();

      if (this.states._endState != null) 
        $.proxy(this.states._endState, this)(state);
      
    }
  },
  
  _updateView: function(){
  
  },
  
  invalidateView: function(){
    this._updateView();
  },
  
  //------------------------------------------------------------------------------
  destroy: function(){
    $.Widget.prototype.destroy.apply(this, arguments);
  }
  
});
