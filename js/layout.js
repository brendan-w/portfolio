
//The current layout
var current = "home";

var bg;
var content;
var header;
var name_projects;
var projects;
var opener;
var opener_arrow;
var article;


function resize()
{
    var left_space = header.clientWidth % 50;
    if(left_space === 0) left_space = 50;
    name_projects.style.marginLeft = left_space + "px";
}


function init()
{
    bg            = document.querySelector("#graphics .bg");
    content       = document.querySelector("#content");
    header        = document.querySelector("header");
    name_projects = document.querySelector("#name-projects");
    projects      = document.querySelector("nav#projects");
    opener        = name_projects.querySelector(".opener");
    opener_arrow  = opener.querySelector(".arrow");
    article       = document.querySelector("article");

    // window.onresize = resize;
    // resize();

    opener.onclick = function(e) {
        if(projects.clientHeight == 0)
            open_project_list(true);
        else
            close_project_list(true);
    };
}


function close_project_list()
{
    opener_arrow.innerHTML = "▼";

    //make sure that the dropdown button is available
    opener.style.opacity = "1";

    projects.style.height = "0px";
    projects.style.marginTop = "0px";

}

function open_project_list()
{
    opener_arrow.innerHTML = "▲";
    projects.style.height = "250px";
    projects.style.marginTop = "50px";
}

function home_to_project(animate)
{

    //using timeouts to allow animations to partially overlap
    close_project_list();
    bg.style.opacity = "0";

    // bring the header to final width
    setTimeout(function() {
        content.style.width = "1000px";
        header.style.width = "100%";
        // name_projects.style.marginLeft = "100px";
        name_projects.style.marginRight = "750px";
    }, (animate ? 150 : 0));

    //raise the header to the top, and fade in the content
    setTimeout(function() {
        content.style.marginTop = "50px";
        name_projects.style.marginBottom = "150px";
        article.style.opacity = "1";
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
