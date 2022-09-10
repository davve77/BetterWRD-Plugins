/*
    @name Better Replies
    @version 1.0.0
    @description See a replies' content in the new reply editor.
    @author Seizure Salad
    @source https://github.com/davve77/BetterWRD-Plugins/blob/main/plugins/betterReplies.bwrd.js
*/

// This is quite possibly the sloppiest plugin i've ever written
window.addEventListener('load', async() => {
    if(window.location.pathname.match(/forum\/t\/\d+/)) {
        let posts = document.querySelectorAll('.userdesc');

        Array.from(posts).slice(1).forEach(post => {
            let content = post.parentNode.parentNode.childNodes[3].childNodes[3].innerHTML;
            Array.from(post.childNodes).find(o => o.className === 'theme1 border1 btnmention').href += `&content=${encodeURIComponent(content)}`;
        });
    }

    if(window.location.pathname.match(/forum\/t\/\d+\/newreply/)) {
        let urlParams = new URLSearchParams(window.location.search)
        let mentionID = urlParams.get('mention');
        let content = decodeURIComponent(urlParams.get('content'));

        if(content !== 'null' || mentionID !== null) {
            console.log(content);
            //i really despise DOM manipulation
            let user = await bwrd.getUser(mentionID);
            let postContent = document.querySelectorAll('div[class="theme1 round border1 padding"')[1];

            let replyContent = postContent.cloneNode(true);
            replyContent.childNodes[1].innerHTML = `${user.name}'s reply`;
            replyContent.childNodes[5].innerHTML = content;

            let brk = document.createElement('br');

            postContent.parentNode.insertBefore(replyContent, postContent.nextSibling);
            postContent.parentNode.insertBefore(brk, postContent.nextSibling);

        }   
    }
});
