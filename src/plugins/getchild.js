(function($){
  $.fn.getChild = function(selector){
	  if (jQuery.type(selector)=="number") {
		  return $(this).children().eq(selector);
	  }
    return $(selector, this);
  };
})(jQuery);