$.ui.uicomponent.subclass("ui.document", {

	pageTitle: function (title)
	{
		$("title").text(title);
	},

	//------------------------------------------------------------------------------
	destroy: function()
	{
		$.Widget.prototype.destroy.apply(this, arguments);
	}
});
