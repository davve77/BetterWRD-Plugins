/*
    @name Unlock Threads
    @version 1.0.1
    @description Be able to post new replies to locked threads.
    @author Seizure Salad
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/unlockThreads.bwrd.js
*/

setTimeout(() => { // do NOT do this LOL im just really lazy
    if(window.location.pathname.match(/forum\/t\/\d+/) && document.querySelectorAll("a[class='theme1 round border1 btn_newrelpy']").length === 0 && !window.location.pathname.includes('newreply')){
        let path = window.location.pathname;
        let replyParent = document.querySelector("div input[id='pageinput'").parentNode;

        let newButton = document.createElement('a');
        newButton.setAttribute('class', 'theme1 round border1 btn_newrelpy');
        newButton.setAttribute('href', `${path}/newreply`);
        newButton.text = 'New Reply';

        let replyDiv = document.createElement('div');
        replyDiv.setAttribute('style', 'text-align: right');
        let bottomReply = document.querySelector("main[class='screenPadding']").appendChild(replyDiv);

        replyParent.appendChild(newButton);
        bottomReply.appendChild(newButton.cloneNode(true));
    }
}, 100);
