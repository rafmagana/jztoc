$.widget("ui.list", {
  options: {
    dataProvider: [],
    itemRenderer: null,
    labelFunction: null,
    labelField: null,
    itemRendererOptions: null,
    styleFunction: null,
    rowFunction: null,
    loading: {
      label: "loading..",
      imageUrl: ""
    },
    style: {
      width: 80,
      height: 100,
      padding: 2,
      "background-color": "#fff",
      "white-space": "nowrap",
      "overflow-x": "hidden"
    }
  },
  
  _create: function(){
  
    this.element.css(this.options.style);
    
    if (this.options.dataProvider != null) {
      this.dataProvider(this.options.dataProvider);
    }
    
  },
  
  dataProvider: function(value){
    var rows = value;
    this.options.dataProvider = value;
    
    this.element.children().remove();
    
    for (var index in rows) {
    
      var rowData = rows[index];
      var rowInstance = $("<div></div>").appendTo(this.element);
      
      var label = this._assignlabelData(rowData);
      
      if (this.options.itemRenderer != null) {
        var listData = {
          owner: this,
          data: rowData,
          index: index
        };
        
        var passedObjects = {
          data: label,
          listData: listData
        };
        
        if (this.options.itemRendererOptions != null) {
          jQuery.extend(passedObjects, this.options.itemRendererOptions);
        }
        
        rowInstance[this.options.itemRenderer](passedObjects);
      }
      else {
        rowInstance.html(label);
      }
      
      if (typeof label == "string" && this.options.showToolTip == true) {
        td.attr("title", label);
      }
      
      if (this.options.styleFunction != null) {
        this.options.styleFunction(rowInstance, index, rowData, this.options);
      }
      
      if (this.options.rowFunction != null) {
        this.options.rowFunction(tr, index, rowData);
      }
      
    }
  },
  
  _assignlabelData: function(rowData){
  
    if (this.options.labelFunction != null) {
      return this.options.labelFunction(rowData);
    }
    
    if (this.options.labelField != null) {
      return rowData[this.options.labelField];
    }
    
    if (typeof rowData == "object") {
      return rowData["label"];
    }
    
    return rowData;
  },
  
  showLoading: function(){
  
    this.element.children().hide();
    
    if (this.options.loading.label != "") {
      $("<div></div>").attr("id", "list-loading-text").appendTo(this.element).html(this.options.loading.label);
    }
    else 
      if (this.options.loading.imageUrl != "") {
        this.element.css({
          "background-image": "url(" + this.options.loading.imageUrl + ")",
          "background-repeat": "no-repeat",
          "background-position": "center center"
        });
      }
    
    
  },
  
  hideLoading: function(){
    
    if (this.options.loading.label != "") {
      $("#list-loading-text", this.element).remove();
    }
    else 
      if (this.options.loading.imageUrl != "") {
        this.element.css({
          "background-image": "",
          "background-repeat": "",
          "background-position": ""
        });
      }
    
    this.element.children().show();
  },
  
  destroy: function(){
    this.element.children().remove();
  },
  
  _setOption: function(key, value){
    switch (key) {
      case "dataProvider":
        this.dataProvider(value);
        break;
    }
    
    $.Widget.prototype._setOption.apply(this, arguments);
    
  }
});
