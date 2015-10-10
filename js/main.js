
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






function close_project_list()
{
    $("nav#projects").animate({
        "height": "0px",
        "margin-top": "0px"
    }, {
        duration: 200,
        easing: "easeOutCirc",
    });

    //make sure that the dropdown button is available
    $("#name-projects .opener").fadeIn(200);
    $("#name-projects .opener .arrow").text("▼");
}

function open_project_list()
{
    $("nav#projects").animate({
        "height": "250px",
        "margin-top": "50px"
    }, {
        duration: 200,
        easing: "easeOutCirc",
    });

    $("#name-projects .opener .arrow").text("▲");
}


function goto_project(e)
{
    //using timeouts to allow animations to partially overlap

    close_project_list();
    $("#graphics .bg").fadeOut(400);

    // bring the header to final width
    setTimeout(function() {
        $("#content").animate({
            "width": "1000px"
        }, {
            duration: 300,
            easing: "easeOutCirc",
        });

        $("header").animate({
            "width": "100%",
        }, {
            duration: 300,
            easing: "easeOutCirc",
        });

        $("#name-projects").animate({
            "margin-left": "100px"
        }, {
            duration: 300,
            easing: "easeOutCirc",            
        });
    }, 150);

    //raise the header to the top, and fade in the content
    setTimeout(function() {
        $("#content").animate({
            "margin-top": "50px"
        }, {
            duration: 300,
            easing: "easeOutCirc",
            // easing: "easeOutExpo",
        });

        $("article").fadeIn(400);
    }, 500);

    //go to the page
    page(e.target.getAttribute("href"));
}


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

    $("nav#projects a").click(function(e) {
        e.preventDefault();
        goto_project(e);
    });

    $("#name-projects .opener").click(function(e) {
        if($("nav#projects").height() == 0)
            open_project_list();
        else
            close_project_list();
    });

    setTimeout(home_intro, 400);

    page();
});
