(function($){
  $.fn.addEventListener = function(eventType, handler, scope, eventData){
    if (arguments.length < 2) 
      return;
      
    var fn = handler;
    if (arguments.length > 2) {
      fn = $.proxy(handler, scope);
    }
    return this.each(function(){
      $(this).bind(eventType, eventData, fn);
    });
    
  };
})(jQuery);
