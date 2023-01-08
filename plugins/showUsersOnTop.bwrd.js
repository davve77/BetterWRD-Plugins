/*
    @name Show Users on Top
    @version 2.0.1
    @description Show users on top of thread pages.
    @author RealNickk
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/showUsersOnTop.bwrd.js
*/

var uri = new URL(location.href);
if (uri.pathname.match(/\/t\/\d+\/?/)) {
    // Inject JQuery for pages that don't have it in the header.
    if (typeof(window.jQuery) == "undefined")
        bwrd.includeLibrary("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js");

    // Wait for dom to load.
    jQuery(() => {
        const first = $("main > div:first-child");
        first.after($("main > div:last-child"));
        $(document.body).append("<br class='end-main'/>");
        first.after($("br.end-main"));
    });
}
