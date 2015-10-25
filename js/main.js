
var page = require("page");
var layout = require("./layout.js");

//content
var pages = {
    "pihud" :      require("../html/pihud.html"),
    "cgraph" :     require("../html/cgraph.html"),
    "lasers" :     require("../html/lasers.html"),
    "lumber" :     require("../html/lumber.html"),
    "collector":   require("../html/collector.html"),
    "executejs":   require("../html/executejs.html"),
    "python-obd":  require("../html/python-obd.html"),
    "pipe-organs": require("../html/pipe-organs.html"),
};

//elements
var body;


/*
    Routers/Handlers
*/

page("/:project", function(p) {
    var content = pages[p.params.project];
    if(content)
        layout("project", content);
    else
        not_found();
});

page("/", function() {
    layout("home");
});

page("*", not_found);

function not_found()
{
    layout("project", require("../html/404.html"));
}

/*
    Startup handlers
*/

function intro()
{
    var name_projects = document.querySelector("#tower");

    var hr_top = name_projects.querySelector("hr.top");
    hr_top.style.opacity = 1;
    hr_top.style.top = "-1px";

    var hr_bottom = name_projects.querySelector("hr.bottom");
    hr_bottom.style.opacity = 1;
    hr_bottom.style.bottom = "-1px";

    document.querySelector("#projects").style.opacity = "1";
}

window.onload = function() {

    body = document.querySelector("body");

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

    //trigger the layout and content for the intial page
    page();

    //fade in the page
    //run async to let the browser finish computing the layout
    setTimeout(function() { body.style.opacity = 1; }, 0);

    //what a bit, and then run the intro animation
    setTimeout(intro, 350);
};
