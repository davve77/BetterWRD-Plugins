/*
    @name Show Users on Top
    @version 1.0.0
    @description Show users on top of thread and main pages.
    @author LegitH3x0R
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/showUsersOnTop.bwrd.js
*/

setTimeout(() => { // do NOT do this LOL im just really lazy
    let match = window.location.pathname.match(/^\/forum(.*)/);
    if (match) {
        let path = match[1];
        if (path.substring(0, 1) == "/") path = path.substring(1);
        if (path == "") document.querySelector(".buttons").after(document.querySelector("main>.onlineList"));
        if (path.match(/t\/\d+/)) {
            let first = document.querySelector("main>div:first-child");
            first.after(document.querySelector("main>div:last-child"));
            first.after(document.createElement("br"));
        }
    }
}, 100);
