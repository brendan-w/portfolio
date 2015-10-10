
require("prismjs");
require("./jquery-easing.js");

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
    var anim = {
        "duration": 750,
        "easing": "easeOutExpo",
    };

    $("#name-projects hr.top").animate({
        "opacity": 1,
        "top": "-1px",
    }, anim);

    $("#name-projects hr.bottom").animate({
        "opacity": 1,
        "bottom": "0px",
    }, anim);

    $("nav#projects").animate({
        "opacity": 1,
    }, anim);
}

$(function() {

    layout();

    $("nav#projects a").click(function(e) {
        e.preventDefault();
        layout("project", true);
        page(e.target.getAttribute("href"));
    });

    $("a#name").click(function(e) {
        layout("home", true);
        page(e.target.getAttribute("href"));
    });

    setTimeout(home_intro, 400);

    page();
});
