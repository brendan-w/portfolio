
//The current layout
var current = "";

var body;
var bg;
var content;
var header;
var name_projects;
var projects;
var opener;
var opener_arrow;
var article;

//computed values
var home_top_offset;


function is_animated()
{
    return (body.className.indexOf("animate") !== -1);
}

function resize()
{
    var h = window.innerHeight;
    var nh = name_projects.clientHeight;
    home_top_offset = (h - nh) / 2;

    //snaps to the next grid line
    home_top_offset += 50; //this gaurantees that it will snap to the NEXT line
    home_top_offset -= (home_top_offset % 50);
    home_top_offset += "px";    

    if(current === "home")
        content.style.marginTop = home_top_offset;
}


function init()
{
    body          = document.querySelector("body");
    bg            = document.querySelector("#graphics .bg");
    content       = document.querySelector("#content");
    header        = document.querySelector("header");
    name_projects = document.querySelector("#name-projects");
    projects      = document.querySelector("nav#projects");
    opener        = name_projects.querySelector(".opener");
    opener_arrow  = opener.querySelector(".arrow");
    article       = document.querySelector("article");

    window.onresize = resize;
    resize();

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

    projects.style.height = "0px";
    projects.style.marginTop = "0px";
}

function open_project_list()
{
    opener_arrow.innerHTML = "▲";
    projects.style.height = "250px";
    projects.style.marginTop = "50px";
}

function home_to_project()
{
    //using timeouts to allow animations to partially overlap
    close_project_list();
    //make sure that the dropdown button is available
    opener.style.opacity = "1";

    bg.style.opacity = "0";

    // bring the header to final width
    setTimeout(function() {
        content.style.width = "1000px";
        header.style.width = "100%";
        name_projects.style.marginRight = "750px";
    }, (is_animated() ? 150 : 0));

    //raise the header to the top, and fade in the content
    setTimeout(function() {
        content.style.marginTop = "50px";
        name_projects.style.marginBottom = "150px";
        article.style.opacity = "1";
        article.style.display = "block";
    }, (is_animated() ? 500 : 0));
}

function project_to_home()
{
    //NOTE: these must match the CSS in style.css
    content.style.marginTop = home_top_offset;
    name_projects.style.marginBottom = "";
    article.style.opacity = "";
    article.style.display = "";

    setTimeout(function() {
        content.style.width = "";
        header.style.width = "";
        name_projects.style.marginRight = "";
        bg.style.opacity = "1";
    }, (is_animated() ? 350 : 0));

    setTimeout(function() {
        open_project_list();
        opener.style.opacity = "";
    }, (is_animated() ? 500 : 0));
}

/*
    Function that moves to the requested layout.

    Valid targets are:
        home
        project
*/
module.exports = function(target, callback) {

    //if this is the first call, run init()
    if(current === "")
        init();

    function error()
    {
        console.error("unprogrammed transition from " + current + " to " + target);
    }

    switch(target)
    {
        case "home":
            if(current === "project") project_to_home();
            else if(current === "")   project_to_home();
            else return error();
            break;
        case "project":
            if(current === "home")  home_to_project();
            else if(current === "") home_to_project();
            else return error();
            break;
        default:
            return error();
    }

    current = target;
};
