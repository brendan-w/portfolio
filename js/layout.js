
//The current layout
var current = "home";

var $content;
var $header;
var $name_projects;
var $article;


function init()
{
	$content = $("#content");
	$header = $("header");
	$name_projects = $("#name-projects");
	$article = $("article");
}


/*
	Function that moves to the requested layout.
	If animate is false, the change will be instantanious.

	Valid targets are:
		home
		project
*/
module.exports = function(target, animate, callback)
{
	//if no arguments were passed, then this is an initialise call
	if(arguments.length === 0)
		return init();
};
