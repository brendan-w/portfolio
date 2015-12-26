
"use strict";

var page = require("page");
var fastclick = require("fastclick");
var layout = require("./layout.js");
var utils = require("./utils.js");

//content
var pages = {
    "about" :      require("../html/about.html"),
    "pihud" :      require("../html/pihud.html"),
    "binvis":      require("../html/binvis.html"),
    "cgraph" :     require("../html/cgraph.html"),
    "lasers" :     require("../html/lasers.html"),
    "lumber" :     require("../html/lumber.html"),
    "collector":   require("../html/collector.html"),
    "executejs":   require("../html/executejs.html"),
    "openscope" :  require("../html/openscope.html"),
    "python-obd":  require("../html/python-obd.html"),
    "pipe-organs": require("../html/pipe-organs.html"),
    "archive":     require("../html/archive.html"),
};

//images to preload

var images = [
    "/assets/background.jpg", //preload the background image, in case we enter on a project page
];


//util for lighting up project links
//pass null to deactivate everything
function set_nav_link_active(el)
{
    //deactivate everything
    [].forEach.call(
        document.querySelectorAll("#projects a"),
        function(a) { a.className = ""; }
    );

    //activate the requested link
    if(el) el.className = "active";
}


/*
    Routers/Handlers
*/

page("/:project", function(ctx) {
    //lookup the content
    var content = pages[ctx.params.project];

    if(content)
    {
        //valid project name
        set_nav_link_active(utils.$("#projects a[href='" + ctx.path + "']"));
        layout("project", content);
    }
    else
    {
        //not a valid project name
        not_found();
    }
});

page("/", function() {
    set_nav_link_active(null);
    layout("home");
});

page("*", not_found);


function not_found()
{
    set_nav_link_active(null);
    layout("project", require("../html/404.html"));
}


/*
    startup functions
*/

function fadein()
{
    utils.remove_class(document.body, "fadeout");
}

function intro()
{
    var hr_top = utils.$("#tower hr.top");
    hr_top.style.opacity = 1;
    hr_top.style.top = "-1px";

    var hr_bottom = utils.$("#tower hr.bottom");
    hr_bottom.style.opacity = 1;
    hr_bottom.style.bottom = "-1px";

    // utils.$("#projects").style.opacity = "1";
}

function preload()
{
    //put these in the browser's cache
    images.forEach(function(img) {
        (new Image()).src = img;
    });
}

function copyright()
{
    var footer = utils.$("footer");
    if(footer)
        footer.innerHTML = "© Brendan Whitfield " + (new Date()).getFullYear();
}

window.onload = function() {

    copyright();

    fastclick(document.body);

    //trigger the layout and content for the intial page
    page();

    //fade in the page
    //run async to let the browser finish computing the layout
    // setTimeout(fadein, 0);
    fadein();

    //what a bit, and then run the intro animation, and start preloading
    setTimeout(function() {
        intro();
        preload();
    }, 750);
};
