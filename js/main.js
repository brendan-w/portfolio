
require("prismjs");

var page = require("page");
var layout = require("./layout.js");


/*
    Routers/Handlers
*/

page("/:project", function(p) {
    console.log("project: " + p.params.project);
});


page("/", function() {
    console.log("root");
});




function home_intro()
{
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

    layout();

    document.querySelector("nav#projects").onclick = function(e) {
        if(e.target.tagName === "A")
        {
            e.preventDefault();
            layout("project", true);
            page(e.target.getAttribute("href"));
        }
    };

    document.querySelector("a#name").onclick = function(e) {
        layout("home", true);
        page(e.target.getAttribute("href"));
    };

    setTimeout(home_intro, 400);

    page();
};
