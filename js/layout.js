
//The current layout
var current = "home";

var $content;
var $header;
var $name_projects;
var $projects;
var $opener;
var $article;


function resize()
{
    var left_space = $header.width() % 50;
    if(left_space === 0) left_space = 50;
    $name_projects.css("margin-left", left_space + "px");
}


function init()
{
    $content = $("#content");
    $header = $("header");
    $name_projects = $("#name-projects");
    $projects = $("nav#projects");
    $opener = $name_projects.find(".opener");
    $article = $("article");

    $(window).resize(resize);
    resize();

    $opener.click(function(e) {
        if($("nav#projects").height() == 0)
            open_project_list(true);
        else
            close_project_list(true);
    });
}


function close_project_list(animate)
{
    $projects.css({
        "height": "0px",
        "margin-top": "0px"
    });

    //make sure that the dropdown button is available
    $opener.fadeIn((animate ? 200 : 0));
    $opener.find(".arrow").text("▼");
}

function open_project_list(animate)
{
    $projects.css({
        "height": "250px",
        "margin-top": "50px"
    });

    $opener.find(".arrow").text("▲");
}

function home_to_project(animate)
{

    //using timeouts to allow animations to partially overlap
    close_project_list(animate);
    $("#graphics .bg").fadeOut((animate ? 400 : 0));

    // bring the header to final width
    setTimeout(function() {
        $content.css({"width": "1000px"});
        $header.css({"width": "100%"});
        $name_projects.css({"margin-left": "100px"});
    }, (animate ? 150 : 0));

    //raise the header to the top, and fade in the content
    setTimeout(function() {
        $content.css({"margin-top": "50px"});
        $name_projects.css({"margin-bottom": "150px"});
        $article.fadeIn((animate ? 400 : 0));
    }, (animate ? 500 : 0));
}

/*
    Function that moves to the requested layout.
    If animate is false, the change will be instantanious.

    Valid targets are:
        home
        project
*/
module.exports = function(target, animate, callback) {

    //if no arguments were passed, then this is an initialise call
    if(arguments.length === 0)
        return init();

    function error()
    {
        console.error("unprogrammed transition from " + current + " to " + target);
    }

    switch(target)
    {
        case "home":
            if(current === "project") project_to_home(animate);
            else return error();
            break;
        case "project":
            if(current === "home") home_to_project(animate);
            else return error();
            break;
        default:
            return error();
    }

    current = target;
};
