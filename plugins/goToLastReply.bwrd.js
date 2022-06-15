/*
    @name Go to Latest Reply
    @version 1.0.0
    @description Adds a button that automatically skips to last reply.
    @author david77
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/goToLastReply.bwrd.js
*/


if(document.querySelector('.replygroup')){

    const btnContent    = `<a id="last-post" title="Go to latest post" onclick="latestPost()" class="theme1 round border1 btn_newrelpy"> <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="transform: scale(.55);" height="48" width="48"><path d="M24 44 10 30 12.1 27.9 22.5 38.3V4H25.5V38.3L35.9 27.9L38 30Z"></path></svg></a>`
    const titleDiv      = document.querySelector('#topic').parentElement.parentElement
    const lastPostBtn   = util.addElement('button', titleDiv, btnContent)
    
    
    // CSS
    bwrd.injectStyle(`
        #last-post{
            position: absolute;
            top: 4px;
            right: 4px;
            width: 50px;
            height: 50px;
            padding: 0!important;
            background: rgb(255 255 255 / 2%)!important;
            cursor: pointer;
            transform: scale(.75);
        }
    `)
    titleDiv.style['position'] = 'relative'
    
    
    // Main
    function latestPost(){
        let isOnLatestPage
        let lastPage = location.href
    
        let lastPageBtn = util.findElementByText('>>>')
        if(lastPageBtn) lastPage = lastPageBtn.href
    
        isOnLatestPage = lastPage == location.href
    
        if(isOnLatestPage)  scrollToLatestPost()
        else                location.assign(lastPage + '?latest')
    }
    
    function scrollToLatestPost(){
        let allPosts = document.querySelectorAll('.replygroup')
        let lastPost = allPosts[allPosts.length - 1]
        lastPost.scrollIntoView({block: 'center'})
    }
    
    if((/\?latest/).test(location.href)) scrollToLatestPost()
}
