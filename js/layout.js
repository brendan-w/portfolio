
/*
    import prism
    add language definitions as needed
*/
var prism = require("prismjs");
require("prismjs/components/prism-bash.min.js");
require("prismjs/components/prism-python.min.js");
require("prismjs/components/prism-javascript.min.js");

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

function fadeout_all(callback)
{
    body.className += " fadeout";
    setTimeout(callback, 120);
}


//accepts boolean for the desired open|closed state
//as well as a boolean for whether it should be animated
function open_close_project_list(open, animate)
{
    // override the transition when necessary
    if(animate) projects.style.transition = "";
    else        projects.style.transition = "none";
    tower.className = open ? "" : "closed";
}

//adjusts element heights to align with the grid
//NOTE: this function will only work AFTER display:block has been applied
function layout_article()
{
    [].forEach.call(
        article.getElementsByClassName("row"),
        function(row) {
            row.style.height = ""; //make sure we read the height of the contents as they are normally
            row.style.height = snap_to_next_grid(row.clientHeight) + "px";
        }
    );
}


function set_article(content_html)
{
    article.innerHTML = content_html;
    Prism.highlightAll();
    layout_article();
}


function resize()
{
    home_top_offset = (window.innerHeight - nav_height) / 2;
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
    body     = document.body;
    bg       = document.querySelector("#bg");
    content  = document.querySelector("#content");
    header   = document.querySelector("header");
    tower    = document.querySelector("#tower");
    projects = document.querySelector("nav#projects");
    opener   = tower.querySelector(".opener");
    article  = document.querySelector("article");

    opener.onclick = function(e) {
        e.preventDefault();
        //when the clientHeight is zero, the list will be OPENED
        open_close_project_list( !(projects.clientHeight), true);
    };

    //TODO: debounce this so it doesn't spam the handler
    window.onresize = resize;
    resize();
}


function home_to_project(content_html)
{
    fadeout_all(function() {
        open_close_project_list(false, false);
        body.className = "mode-project";
        set_article(content_html);
    });
}

function project_to_home()
{
    fadeout_all(function() {
        content.style.marginTop = home_top_offset;
        open_close_project_list(true, false);
        body.className = "mode-home";
    });
}

function project_to_project(content_html)
{
    open_close_project_list(false, true);
    article.style.opacity = 0;

    setTimeout(function() {
        set_article(content_html);
        article.style.opacity = 1;
    }, 150);
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
