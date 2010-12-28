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
