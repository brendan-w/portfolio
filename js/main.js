
"use strict";

var page = require("page");
var fastclick = require("fastclick");
var layout = require("./layout.js");

//content
var pages = {
    "about" :      require("../html/about.html"),
    "pihud" :      require("../html/pihud.html"),
    "cgraph" :     require("../html/cgraph.html"),
    "lasers" :     require("../html/lasers.html"),
    "lumber" :     require("../html/lumber.html"),
    "collector":   require("../html/collector.html"),
    "executejs":   require("../html/executejs.html"),
    "python-obd":  require("../html/python-obd.html"),
    "pipe-organs": require("../html/pipe-organs.html"),
};

//images to preload
var images = [
    "/assets/laser.jpg",
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

page("/:project", function(p) {
    var content = pages[p.params.project];

    if(content)
    {
        set_nav_link_active(document.querySelector("#projects a[href='" + p.path + "']"));
        layout("project", content);
    }
    else
    {
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
    Startup handlers
*/

function listen()
{
    document.querySelector("nav#projects").onclick = function(e) {
        if(e.target.tagName === "A")
        {
            e.preventDefault();
            page(e.target.getAttribute("href"));
        }
    };

    document.querySelector("a#name").onclick = function(e) {
        e.preventDefault();
        page("/");
    };
}

function fadein()
{
    var body = document.querySelector("body");
    body.className = body.className.replace("fadeout", "");
}

function intro()
{
    var hr_top = document.querySelector("#tower hr.top");
    hr_top.style.opacity = 1;
    hr_top.style.top = "-1px";

    var hr_bottom = document.querySelector("#tower hr.bottom");
    hr_bottom.style.opacity = 1;
    hr_bottom.style.bottom = "-1px";

    document.querySelector("#projects").style.opacity = "1";
}

function preload()
{
    //put these in the browser's cache
    images.forEach(function(img) {
        (new Image()).src = img;
    });
}

window.onload = function() {

    fastclick(document.body);

    //subscribe event handlers
    listen();

    //trigger the layout and content for the intial page
    page();

    //fade in the page
    //run async to let the browser finish computing the layout
    setTimeout(fadein, 0);

    //what a bit, and then run the intro animation, and start preloading
    setTimeout(function() {
        intro();
        preload();
    }, 500);
};
