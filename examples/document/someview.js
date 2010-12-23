$.ui.document.subclass("ui.someview", {

  options: {
    getChildren: true
  },
  
  _create: function(){
    this.elements.mySpan.text("here we go!!");
  },
  
  _init: function(){
    console.log("_init");
    console.log(this.options);
  },
  
  //------------------------------------------------------------------------------
  destroy: function(){
    $.Widget.prototype.destroy.apply(this, arguments);
  }
  
});


$(function(){
  $(document).someview();
});
