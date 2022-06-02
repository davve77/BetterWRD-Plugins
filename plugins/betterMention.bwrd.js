/*
    @name Better Mention
    @version 1.0.0
    @description A better mentioning system for WeAreDevs. 
    @author Seizure Salad
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/betterMention.bwrd.js
*/

//TODO: Add UI like Discord and a bunch of other stuff

setTimeout(() => { //again, don't do this but i'm lazy
    if (window.location.pathname.match(/forum\/t\/\d+\/newreply/)) {
        bwrd.showChangelog('6/2/22', ['Still in development but is functional. Type \'@\' followed by their username to mention the user. This automatically mentions the first user after 1 second.'])
    
        new MutationObserver(debounce( textChange, 1000)).observe(document.querySelector('iframe[id=editor_ifr').contentWindow.document.querySelector('body'), { characterData:true, childList: true, subtree: true });
    
        function debounce(callback, wait) {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(function () { callback.apply(this, args); }, wait);
            };
        }
    
        async function textChange(list) {
            if(isValid(list[0].target.textContent)) {
                let username = list[0].target.textContent.substring(1);
                await getUsersByName(username).then(res => {
                    if(res.success) {
                        list[0].target.textContent = list[0].target.textContent.replace(`@${username}`, ` <@uid:${res.accounts[0].uid}>`);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    
        async function getUsersByName(user) {
            let response = await fetch(`https://wearedevs.net/api/v1/account/search?username=${user}&fromuid=0`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.json();
        }
    
        function isValid(username) {
            return /^@\w+$/.test(username);
        }
    }
    
    
}, 100);
