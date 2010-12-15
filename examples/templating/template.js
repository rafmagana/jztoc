$.ui.uicomponent.subclass("ui.template", {

  options: {
    index:-1,
    getChildren: true,
    renderHtmlTemplate: true
  },
  
  _create: function(){
    this.elements.index.text(this.options.index);
    this.elements.name.val("Juan");
    this.elements.nickname.val("Penas");
  },
  
  _init: function(){
  },
  
  _switchState_clickHandler: function(e){
  },
  
  _clickMe_clickHandler: function(e){
    console.log("clicked");
  },
  
  //------------------------------------------------------------------------------
  destroy: function(){
    $.Widget.prototype.destroy.apply(this, arguments);
  }
  
});
