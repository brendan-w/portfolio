
/*
    import prism
    add language definitions as needed
*/
var prism = require("prismjs");
require("prismjs/components/prism-python.js");

//constants
var nav_height = 350;

//The current layout
var current = "";

//elements
var body;
var bg;
var content;
var header;
var tower;
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

function close_project_list()
{
    tower.className = "closed";
}

function open_project_list()
{
    tower.className = "";
}

//NOTE: this function will only work AFTER display:block has been applied
function layout_article()
{
    //adjust element heights to align with the grid
    var rows = article.getElementsByClassName("row");

    for(var i = 0; i < rows.length; i++)
    {
        var row = rows[i];
        row.style.height = "";
        var aligned_height = snap_to_next_grid(row.clientHeight);
        row.style.height = aligned_height + "px";
    }
}


function set_article(content_html)
{
    article.innerHTML = content_html;
    Prism.highlightAll();
    layout_article();
}


function resize()
{
    var h = window.innerHeight;
    var nh = nav_height;
    home_top_offset = (h - nh) / 2;
    home_top_offset = snap_to_next_grid(home_top_offset) + "px";

    if(current === "home")
    {
        content.style.marginTop = home_top_offset;
    }
    else if(current === "project")
    {
        layout_article();
    }
}


function init()
{
    body          = document.querySelector("body");
    bg            = document.querySelector("#bg");
    content       = document.querySelector("#content");
    header        = document.querySelector("header");
    tower         = document.querySelector("#tower");
    projects      = document.querySelector("nav#projects");
    opener        = tower.querySelector(".opener");
    article       = document.querySelector("article");

    opener.onclick = function(e) {
        e.preventDefault();
        if(projects.clientHeight == 0)
            open_project_list(true);
        else
            close_project_list(true);
    };

    //TODO: debounce this so it doesn't spam the handler
    window.onresize = resize;
    resize();
}


function home_to_project(content_html)
{
    //using timeouts to allow animations to partially overlap

    close_project_list();
    opener.style.opacity = 1;
    bg.style.opacity = 0;

    // bring the header to final width
    setTimeout(function() {
        content.className = "mode-project";
        article.style.display = "block";
        set_article(content_html);
    }, (is_animated() ? 150 : 0));

    //raise the header to the top, and fade in the content
    setTimeout(function() {
        content.style.marginTop = "50px";
        tower.style.marginBottom = "150px";
        article.style.opacity = 1;
    }, (is_animated() ? 500 : 0));
}

function project_to_home()
{
    //NOTE: these must match the CSS in style.css
    content.style.marginTop = home_top_offset;
    tower.style.marginBottom = "";
    article.style.opacity = 0;
    opener.style.opacity = 0;

    setTimeout(function() {
        content.className = "mode-home";
        article.style.display = "none";
        bg.style.opacity = 1;
        open_project_list();
    }, (is_animated() ? 350 : 0));
}

function project_to_project(content_html)
{
    close_project_list();
    article.style.opacity = 0;

    setTimeout(function() {
        set_article(content_html);
        tower.style.marginBottom = "250px";
    }, 150);

    setTimeout(function() {
        article.style.opacity = 1;
        tower.style.marginBottom = "150px";
    }, 350);
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
            if(current === "")             project_to_home();
            else if(current === "project") project_to_home();
            else return error();
            break;
        case "project":
            if(current === "")             home_to_project(content_html);
            else if(current === "home")    home_to_project(content_html);
            else if(current === "project") project_to_project(content_html);
            else return error();
            break;
        default:
            return error();
    }

    current = target;

    resize();
};
