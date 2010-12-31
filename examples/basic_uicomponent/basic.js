$.ui.uicomponent.subclass("ui.basic", {

  options: {
    getChildren: true
  },
  
  _helpers: [TraceHelper],
  
  _create: function(){
    console.log("_create");
    console.log("this.options.data: ", this.options.data);
    this.elements.switchState.click($.proxy(this._switchState_clickHandler, this));
    this.elements.clickMe.click($.proxy(this._clickMe_clickHandler, this));
  },
  
  _init: function(){
    console.log("_init");
    this.elements.name.val(this.options.data);
  },
  
  _switchState_clickHandler: function(e){
    this.currentState("showForm");
  },
  
  _clickMe_clickHandler: function(e){
    console.log("clicked");
    this.trace("hola!" + this.queno);
    this.currentState("loading");
  },
  
  states: {
  
    _enterState: function(state){
      console.log("_enterState");
    },
    _exitState: function(state){
      console.log("_exitState");
    },
    _endState: function(state){
      console.log("_endState");
    },
    
    loading: function(){
      console.log("loading");
      this.elements.loading.show(400);
      this.elements.form.hide(400);
    },
    
    showForm: function(){
      console.log("showForm");
      this.elements.loading.hide(400);
      this.elements.form.show(400);
    }
  },
  
  //------------------------------------------------------------------------------
  destroy: function(){
    $.Widget.prototype.destroy.apply(this, arguments);
  }
  
});
