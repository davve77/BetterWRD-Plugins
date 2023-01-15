/*
    @name Better Online
    @version 1.0.0
    @description Removes that small, green dot and adds a green border around the profile picture of online users.
    @author RealNickk
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/betteronline.bwrd.js
*/

(async() => {
    // -- Peanut loader -- //
    const __peanutDev = false;
    if(window.peanutReady)await window.peanutReady;else if(typeof window.peanut==="undefined")await new Promise(r=>{window.peanutResolve=r;bwrd.includeLibrary(__peanutDev?"http://localhost:8080/assets/peanut.js":"https://realnickk.github.io/BetterWRD-Stuff/assets/peanut-min.js")});
    // -- Peanut loader -- //

    // Not a page we care about.
    if (!peanut.isForum())
        return;

    // CSS for online border
    bwrd.injectStyle(".pfp-online-border { border: 2px solid lime; }");

    // Check page type
    if (peanut.pageMatch("pathname", /\/t\/\d+\/?/)) { // Thread page
        $(".thread_replierdata").each((_, x) => {
            const obj = $(x);
            const iconQuery = obj.find(".userdesc > a > .username > .online-icon");
            if (iconQuery.length > 0) {
                iconQuery.remove();
                obj.find("a > .thread_pfp").addClass("pfp-online-border");
            }
        });
    }
    else if (peanut.pageMatch("pathname", /\/profile(\/\d+)?\/?/)) { // Profile page
        const obj = $("#info");
        const iconQuery = obj.find(".username > .online-icon");
        if (iconQuery.length > 0) {
            iconQuery.remove();
            obj.parent().parent().find("img").addClass("pfp-online-border");
        }
    }
    else if (peanut.pageMatch("pathname", /\/messages\/\d+\/?/)) { // DM page
        const window = $(".window");
        const iconQuery = window.find("h1 > .online-icon");
        if (iconQuery.length > 0) {
            iconQuery.remove();

            const linkToProfile = window.find("h1 > a").attr("href");
            window.find(".rows > .row").each((_, x) => {
                const link = $(x).find("a");
                if (link.attr("href") == linkToProfile)
                    link.find("img").addClass("pfp-online-border");
            });
        }
    }
    else if (peanut.pageMatch("pathname", /\/messages\/?/)) { // Messages page
        $(".username").each((_, x) => {
            const obj = $(x);
            const iconQuery = obj.find(".online-icon");
            if (iconQuery.length > 0) {
                iconQuery.remove();
                obj.parent().parent().find("img").addClass("pfp-online-border");
            }
        });
    }
})();
