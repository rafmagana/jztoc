(function($){
  $.fn.getChild = function(selector){
    return $(selector, this);
  };
})(jQuery);
