
require("prismjs");

var page = require("page");
var layout = require("./layout.js");


/*
    Routers/Handlers
*/

page("/:project", function(p) {
    layout("project");
});


page("/", function() {
    layout("home");
});




function home_intro()
{
    //done with init, prepare for animations
    document.querySelector("body").className = "animate";

    var name_projects = document.querySelector("#name-projects");

    var hr_top = name_projects.querySelector("hr.top");
    hr_top.style.opacity = "1";
    hr_top.style.top = "-1px";

    var hr_bottom = name_projects.querySelector("hr.bottom");
    hr_bottom.style.opacity = "1";
    hr_bottom.style.bottom = "0px";

    document.querySelector("#projects").style.opacity = "1";
}

window.onload = function() {

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

    setTimeout(home_intro, 400);

    page();
};
