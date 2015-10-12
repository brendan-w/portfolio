
//The current layout
var current = "";

//elements
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


function snap_to_prev_grid(x)
{
    x -= (x % 50);
    return x;    
}

function snap_to_next_grid(x)
{
    x += 50; //this gaurantees that it will snap to the NEXT line
    x -= (x % 50);
    return x;
}

function is_animated()
{
    return (body.className.indexOf("animate") !== -1);
}

function set_article(content_html)
{
    article.innerHTML = content_html;

    //adjust element heights to align with the grid
    var rows = article.getElementsByClassName("row");
    for(var i = 0; i < rows.length; i++)
    {
        var row = rows[i];
        console.log(row.clientHeight);
        var aligned_height = snap_to_next_grid(row.clientHeight);
        row.style.height = aligned_height + "px";
    }
}

function resize()
{
    var h = window.innerHeight;
    var nh = name_projects.clientHeight;
    home_top_offset = (h - nh) / 2;
    home_top_offset = snap_to_next_grid(home_top_offset) + "px";

    if(current === "home")
        content.style.marginTop = home_top_offset;
}


function init()
{
    body          = document.querySelector("body");
    bg            = document.querySelector("#bg");
    content       = document.querySelector("#content");
    header        = document.querySelector("header");
    name_projects = document.querySelector("#name-projects");
    projects      = document.querySelector("nav#projects");
    opener        = name_projects.querySelector(".opener");
    opener_arrow  = opener.querySelector(".arrow");
    article       = document.querySelector("article");

    opener.onclick = function(e) {
        if(projects.clientHeight == 0)
            open_project_list(true);
        else
            close_project_list(true);
    };

    window.onresize = resize;
    resize();
}


function close_project_list()
{
    opener_arrow.innerHTML   = "▼";
    projects.style.height    = "0px";
    projects.style.marginTop = "0px";
}

function open_project_list()
{
    opener_arrow.innerHTML   = "▲";
    projects.style.height    = "250px";
    projects.style.marginTop = "50px";
}

function home_to_project(content_html)
{
    //using timeouts to allow animations to partially overlap

    set_article(content_html);

    close_project_list();
    opener.style.opacity = 1;
    bg.style.opacity = 0;

    // bring the header to final width
    setTimeout(function() {
        content.className = "mode-project";
        article.style.display = "block";
    }, (is_animated() ? 150 : 0));

    //raise the header to the top, and fade in the content
    setTimeout(function() {
        content.style.marginTop = "50px";
        name_projects.style.marginBottom = "150px";
        article.style.opacity = 1;
    }, (is_animated() ? 500 : 0));
}

function project_to_home()
{
    //NOTE: these must match the CSS in style.css
    content.style.marginTop = home_top_offset;
    name_projects.style.marginBottom = "";
    article.style.opacity = "";
    opener.style.opacity = "";

    setTimeout(function() {
        article.style.display = "";
        content.className = ""
        bg.style.opacity = 1;
        open_project_list();
    }, (is_animated() ? 350 : 0));
}

/*
    Function that moves to the requested layout.

    Valid targets are:
        home
        project
*/
module.exports = function(target, content_html) {

    //if this is the first call, run init()
    if(current === "")
        init();

    content_html = content_html || "";

    function error()
    {
        console.info("unprogrammed transition from " + current + " to " + target);
    }

    switch(target)
    {
        case "home":
            if(current === "project") project_to_home();
            else if(current === "")   project_to_home();
            else return error();
            break;
        case "project":
            if(current === "home")  home_to_project(content_html);
            else if(current === "") home_to_project(content_html);
            else return error();
            break;
        default:
            return error();
    }

    current = target;
};
