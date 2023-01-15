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
    if (window.peanutReady) {
        await window.peanutReady;
    }
    else if (typeof(window.peanut) === "undefined") {
        if (__peanutDev) {
            await new Promise(r => { window.peanutResolve = r; bwrd.includeLibrary("http://localhost:8080/assets/peanut.js"); });
        }
        else {
            await new Promise(r => {
                let iterations = 0;
                const interval = setInterval(() => {
                    if (typeof(window.peanutReady) !== "undefined") {
                        clearInterval(interval);
                        window.peanutReady.then(() => r());
                    }
                    else if (++iterations == 1000 && typeof(window.peanutNotFound) === "undefined") { // 100*10ms = 1 second timeout (i hate this but it works)
                        clearInterval(interval);
                        window.peanutNotFound = true;
                        bwrd.alert("Peanut Loader", "One of your plugins couldn't load the peanut library. Ensure that the peanut extension from the BetterWRD extension library is installed and enabled.");
                    }
                }, 10);
            });
        }
    }

    if (window.peanutNotFound)
        return; // Abort extension logic.
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
