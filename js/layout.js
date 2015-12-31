
var utils = require("./utils.js");

/*
    import prism
    add language definitions as needed
*/
var prism = require("prismjs");
require("prismjs/components/prism-bash.min.js");
require("prismjs/components/prism-python.min.js");
require("prismjs/components/prism-javascript.min.js");

//constants
var grid_size = 50;
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
var article;

//computed values
var home_top_offset;



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
            var original = row.clientHeight;
            var aligned = utils.snap_to_next_grid(original, grid_size);

            //make sure there's at least half a grids-width of padding
            if((aligned - original) < (grid_size / 2))
                aligned += grid_size;

            row.style.height = aligned + "px";
        }
    );
}


function set_article(content_html)
{
    article.innerHTML = content_html;
    Prism.highlightAll();
    // layout_article();
}


function resize()
{
    home_top_offset = (window.innerHeight - nav_height) / 2;
    home_top_offset = utils.snap_to_next_grid(home_top_offset, grid_size) + "px";

    if(current === "home")
    {
        content.style.marginTop = home_top_offset;
    }
    else if(current === "project")
    {
        // layout_article();
    }
}


function init()
{
    body     = document.body;
    bg       = utils.$("#bg");
    content  = utils.$("#content");
    header   = utils.$("header");
    tower    = utils.$("#tower");
    projects = utils.$("nav#projects");
    opener   = tower.querySelector(".opener");
    article  = utils.$("article");

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
    open_close_project_list(false, false);
    set_article(content_html);
    body.className = "mode-project";
}

function project_to_home()
{
    content.style.marginTop = home_top_offset;
    open_close_project_list(true, false);
    body.className = "mode-home";
}

function project_to_project(content_html)
{
    open_close_project_list(false, true);
    set_article(content_html);
    article.style.opacity = 1;
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
