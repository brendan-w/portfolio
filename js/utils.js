
module.exports = {

    $: function(selector)
    {
        return document.querySelector(selector);
    },

    add_class: function(el, c)
    {
        if(el)
            el.className += " " + c;
    },

    remove_class: function(el, c)
    {
        if(el)
            el.className = el.className.replace(c, "");
    },

    snap_to_prev_grid: function(x, grid_size)
    {
        x -= (x % grid_size);
        return x;    
    },

    snap_to_next_grid: function(x, grid_size)
    {
        x += grid_size; //this gaurantees that it will snap to the NEXT line
        return module.exports.snap_to_prev_grid(x, grid_size);
    },

};
