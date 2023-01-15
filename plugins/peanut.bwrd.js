/*
    @name Peanut API
    @version 0.1.0
    @description BetterWRD extension library for more functionality.
    @author RealNickk
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/peanut.bwrd.js
*/

/*
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
                    else if (++iterations == 100 && typeof(window.peanutNotFound) === "undefined") { // 100*10ms = 1 second timeout (i hate this but it works)
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
*/

(async() => {
    if (typeof(window.peanut) !== "undefined") {
        window.peanutResolveInternal(window.peanut);
        return;
    }

    // CSS for peanut-prompt
    bwrd.injectStyle(".peanut-prompt { padding: 12px; margin: auto; margin-bottom: 12px; max-width: 80vw; } .peanut-prompt > p { margin-top: 10px; } .peanut-prompt > .peanut-content { padding-top: 12px; margin: 10px 0; } .peanut-prompt > .peanut-content > span { padding: 0.5rem 2rem; margin-right: 0.5rem; border-radius: 10px; background-color: #9bb6ec; color: #000000; } .peanut-prompt > .peanut-content > span:hover { cursor: pointer; }");

    const clickIdMap = {};

    const peanut = {
        // Loads a library from a URL. This is a wrapper around bwrd.includeLibrary.
        // This is used to ensure that the library actually loads before continuing.
        loadLibrary: async (url, find) => {
            return new Promise(resolve => {
                if (typeof window[find] !== "undefined") {
                    resolve();
                    return;
                }

                const script = bwrd.includeLibrary(url);
                script.addEventListener("load", () => {
                    if (find) {
                        const interval = setInterval(() => {
                            if (typeof window[find] !== "undefined") {
                                clearInterval(interval);
                                resolve();
                            }
                        }, 10);
                    }
                    else {
                        resolve();
                    }
                });
            });
        },
        guid: () => { // thanks stackoverflow
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },
        // Injects an inline frame into the page.
        injectFrame: (src) => {
            const frame = document.createElement("iframe");
            frame.src = src;
            frame.style = "display: none;";

            document.body.appendChild(frame);
            return frame.contentWindow;
        },
        // Get the current notifications.
        getNotifications: async () => {
            const notifications = [];

            const page = $($.parseHTML(await $.get("/")));
            const notifMenu = page.find(".navItem.navbell > .menu");
            notifMenu.find(".notification").each(async (_, el) => {
                const notif = $(el);

                // Parse image
                const image = notif.find("img");
                let imageSource = (image.length > 0) ? image.attr("src") : "https://i.imgur.com/frqpbRZ.png";
                if (imageSource.startsWith("/"))
                    imageSource = imageSource.substring(0, 1) === "/" ? "https://forum.wearedevs.net" + imageSource : "https://forum.wearedevs.net/" + imageSource;

                // Parse text and link
                const anchor = notif.find("a");
                const text = anchor.text();
                const linkPath = anchor.attr("href");

                let link = "";
                if (linkPath !== undefined)
                    link = linkPath.substring(0, 1) === "/" ? "https://forum.wearedevs.net" + linkPath : "https://forum.wearedevs.net/" + linkPath;
                else
                    link = "https://forum.wearedevs.net/";

                // Get identifier as well
                const identifier = notif.attr("data-id");

                notifications.push({
                    image: imageSource,
                    text: text,
                    link: link,
                    id: identifier
                });
            });

            return notifications;
        },
        addPrompt: (title, desc, buttons) => {
            let peanutPrompts = $("#peanut-prompts");
            if (!peanutPrompts.length) {
                let main = $("main");
                const mainFirstDiv = main.find("> div:first-child");

                // Absolutely disgusting code to get the correct parent for the prompt.
                if (main.css("margin-left")) {
                    if (main.css("margin-left") != "0px") {
                        if (main.css("margin-left") != main.css("margin-right"))
                            main = mainFirstDiv;
                    }
                    else if (mainFirstDiv.css("margin-left") == mainFirstDiv.css("margin-right")) {
                        main = mainFirstDiv;
                    }
                }

                peanutPrompts = $("<div id=\"peanut-prompts\"></div>");
                main.prepend(peanutPrompts);
            }

            const prompt = $("<div class=\"peanut-prompt border1 theme1 round\"></div>");
            peanutPrompts.append(prompt);

            prompt.append(`<h3>${title}</h3>`);

            if (desc)
                prompt.append(`<p>${desc}</p>`);

            if (buttons && buttons.length) {
                prompt.append("<div class=\"peanut-content\">");

                const content = prompt.find(".peanut-content");
                buttons.forEach((button) => {
                    button.clickId = peanut.guid();
                    clickIdMap[button.clickId] = button.callback;
                    content.append(`<span onclick=\"peanut.reportClick('${button.clickId}');\">${button.title}</span>`);
                });
            }

            return {
                remove: () => {
                    buttons.forEach((button) => delete clickIdMap[button.clickId]);
                    prompt.remove();
                }
            }
        },
        reportClick: (id) => {
            const callback = clickIdMap[id];
            if (callback)
                callback();
        },
        pageMatch: (field, regex) => {
            return new URL(window.location.href)[field].match(regex);
        },
        isForum: () => {
            return peanut.pageMatch("host", /^forum.wearedevs.net$/) !== null;
        }
    };

    window.peanutReady = new Promise(async (resolve) => {
        if (typeof(window.jQuery) === "undefined") // JQuery ftw
            await peanut.loadLibrary("https://code.jquery.com/jquery-3.6.0.min.js", "jQuery");

        window.peanut = peanut;
        resolve(peanut);
        window.peanutResolveInternal = resolve;
    });
})();

/*
    Copyright 2022-2023 Nicholas "RealNickk" H.

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in the
    Software without restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
    Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
    AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
