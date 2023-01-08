/*
    @name Better Online
    @version 0.1.1
    @description Removes that small, green dot and adds a green border around the profile picture of online users.
    @author RealNickk
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/betteronline.bwrd.js
*/

var uri = new URL(location.href);
if (uri.pathname.match(/\/t\/\d+\/?/)) {
    // Inject JQuery for pages that don't have it in the header.
    if (typeof(window.jQuery) == "undefined")
        bwrd.includeLibrary("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js");

    // Inject an online status style.
    bwrd.injectStyle(`.thread-pfp-online::after {
        display: inline-block;
        content: "";
        border-style: solid;
        border-radius: 50%;
        border-width: 2px;
        border-color: lime;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        transform: translate(-3px, -3px);
    }`);

    // Logic to rip online status because you can't query it.
    $(".userdesc").each((_, x) => {
        const iconQuery = $(x).find("a > .username > .online-icon");
        if (iconQuery.length > 0) {
            iconQuery.remove();
            $(x).parent().find("a > .thread_pfp").addClass("thread-pfp-online");
        }
    });
}
