
//The current layout
var current = "home";

var $content;
var $header;
var $name_projects;
var $projects;
var $opener;
var $article;

var general_animation = {
    duration: 300,
    easing: "easeOutCirc"
};

var menu_animation = {
    duration: 200,
    easing: "easeOutCirc",
};



function init()
{
    $content = $("#content");
    $header = $("header");
    $name_projects = $("#name-projects");
    $projects = $("nav#projects");
    $opener = $name_projects.find(".opener");
    $article = $("article");

    $opener.click(function(e) {
        if($("nav#projects").height() == 0)
            open_project_list();
        else
            close_project_list();
    });
}


function close_project_list()
{
    $projects.animate({
        "height": "0px",
        "margin-top": "0px"
    }, menu_animation);

    //make sure that the dropdown button is available
    $opener.fadeIn(200);
    $opener.find(".arrow").text("▼");
}

function open_project_list()
{
    $projects.animate({
        "height": "250px",
        "margin-top": "50px"
    }, menu_animation);

    $opener.find(".arrow").text("▲");
}

function home_to_project(e)
{
    //using timeouts to allow animations to partially overlap
    close_project_list();
    $("#graphics .bg").fadeOut(400);

    // bring the header to final width
    setTimeout(function() {
        $content.animate({"width": "1000px"}, general_animation);
        $header.animate({"width": "100%"}, general_animation);
        $name_projects.animate({"margin-left": "100px"}, general_animation);
    }, 150);

    //raise the header to the top, and fade in the content
    setTimeout(function() {
        $content.animate({"margin-top": "50px"}, general_animation);
        $name_projects.animate({"margin-bottom": "150px"}, general_animation);
        $article.fadeIn(400);
    }, 500);
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
            if(current === "project") project_to_home();
            else return error();
            break;
        case "project":
            if(current === "home") home_to_project();
            else return error();
            break;
        default:
            return error();
    }

    current = target;
};
