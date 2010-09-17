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
$.widget("ui.grid", {
  options: {
    dataProvider: null,
    columns: [],
    rowFunction: null
  },
  _create: function(){
    this.loadingImg = $("<div></div>").addClass("loading").appendTo(this.element);
    this.table = $("<table></table>").addClass("wiregrid").appendTo(this.element);
    this.tableHead = $("<thead></thead>").addClass("ad-header").appendTo(this.table);
    this.tableBody = $("<tbody></tbody>").appendTo(this.table);
    this._createTableHeader(this.options.columns);
    if (this.options.dataProvider != null) {
      this._updateData()
    }
    this.loadingImg.css("width", this.element.css("width"))
  },
  _createTableHeader: function(b){
    var a = this;
    tr = $("<tr></tr>").css("height", "25px");
    var c = 0;
    $.each(b, function(f, e){
      var g = $("<th></th>").attr("axis", "col" + c + "");
      if (e.style != null) {
        if (typeof e.style == "string") {
          $(g).addClass(e.style)
        }
        else {
          $(g).css(e.style)
        }
      }
      if (e.sortable != false) {
        var d = $('<a href="#"></a>').html(e.label).addClass("wiregrid-sortable-th").bind("click", {
          sortField: e.field
        }, $.proxy(a._sort, d)).appendTo(g)
      }
      else {
        g.html(e.label)
      }
      if (e.visible == false) {
        g.hide()
      }
      g.appendTo(tr);
      c++
    });
    tr.appendTo(this.tableHead)
  },
  _updateData: function(){
    $(this.tableBody).children().remove();
    var j = this.options.dataProvider;
    for (var e in j) {
      var b = j[e];
      var g = $("<tr></tr>").appendTo(this.tableBody);
      if (this.options.rowFunction != null) {
        this.options.rowFunction(g, e, b)
      }
      for (var f in this.options.columns) {
        var h = this.options.columns[f];
        var a = $("<td></td>").appendTo(g);
        if (h.style != null) {
          if (typeof h.style == "string") {
            $(a).addClass(h.style)
          }
          else {
            $(a).css(h.style)
          }
        }
        var i = this._assignlabelData(b, h);
        if (h.itemRenderer != null) {
          var d = {
            owner: this,
            data: b,
            column: h
          };
          $(a)[h.itemRenderer]({
            data: i,
            listData: d
          })
        }
        else {
          a.html(i)
        }
        if (typeof i == "string" && h.showToolTip == true) {
          a.attr("title", i)
        }
        if (h.styleFunction != null) {
          h.styleFunction(a, e, b, h)
        }
      }
    }
  },
  _assignlabelData: function(b, a){
    if (a.labelFunction != null) {
      return a.labelFunction(b, a)
    }
    if (a.labelField != null) {
      return b[a.field][a.labelField]
    }
    if (b[a.field] != null) {
      return b[a.field]
    }
    return ""
  },
  _setOption: function(a, b){
    switch (a) {
      case "dataProvider":
        this.options.data = b;
        this._updateData();
        break
    }
    $.Widget.prototype._setOption.apply(this, arguments)
  },
  _sort: function(b){
    var a = jQuery.Event("onColumnSort");
    a.sortField = b.data.sortField;
    $(this).trigger(a);
    return false
  },
  on_loading: function(){
    this.tableBody.animate({
      opacity: 0.1
    }, 200);
    var a = this.table.css("height");
    this.loadingImg.css("width", this.element.css("width"));
    if (a < this.loadingImg.css("height")) {
      this.loadingImg.css("height", 70)
    }
    else {
      this.loadingImg.css("height", a)
    }
    this.loadingImg.fadeIn("fast")
  },
  on_load: function(){
    this.tableBody.animate({
      opacity: 1
    }, 200);
    this.loadingImg.fadeOut("fast")
  },
  destroy: function(){
    $.Widget.prototype.destroy.apply(this, arguments)
  }
});
$.widget("ui.columnitemrenderer", {
  options: {
    data: {}
  },
  _create: function(){
    var a = $("<div style='white-space: nowrap; width:inherit; overflow:hidden; text-overflow: ellipsis; -o-text-overflow: ellipsis; white-space: nowrap;'></div>").html(this.options.data).appendTo(this.element)
  },
  destroy: function(){
    $.Widget.prototype.destroy.apply(this, arguments)
  }
});
