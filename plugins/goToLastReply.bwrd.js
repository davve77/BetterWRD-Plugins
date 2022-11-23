/*
    @name Go to Latest Reply
    @version 1.0.3
    @description Adds a button that automatically skips to last reply.
    @author david77
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/goToLastReply.bwrd.js
*/

(() => {
    // Return if not on thread view
    if(!document.querySelector('.replygroup')) return

    // If thread has no replies, don't create the button
    if(!/page/.test(location.href) && document.querySelectorAll('.replygroup').length <= 1) return
    
    
    // Constants
    const btnContent    = `<a class="btn theme2 border1 round" id="last-post" title="Go to latest post"> <svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 0 24 24" width="21" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"></path><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41zM16 6h2v12h-2V6z"></path></svg> </a>`
    const titleDiv      = document.querySelector('#topic').parentElement.parentElement
    const lastPostBtn   = util.addElement('button', titleDiv, btnContent)
    
    
    // CSS
    bwrd.injectStyle(`
    #last-post {
        position: absolute;
        top: -1px;
        right: -53px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }`)
    titleDiv.style['position'] = 'relative'
    
    
    // Main
    document.querySelector('#last-post').addEventListener('click', latestPost)
    
    function latestPost(){
        let isOnLatestPage
        let lastPage = location.href
    
        let lastPageBtn = util.findElementByText('>>>')
        if(lastPageBtn) lastPage = lastPageBtn.href
    
        isOnLatestPage = lastPage == location.href
    
        if(isOnLatestPage)  scrollToLatestPost()
        else                location.assign(lastPage + '&latest')
    }
    
    function scrollToLatestPost(){
        let allPosts = document.querySelectorAll('.replygroup:not(.quick-reply)')
        let lastPost = allPosts[allPosts.length - 1]
        lastPost.scrollIntoView({block: 'center'})
    }
    
    if((/\&latest/).test(location.href)) scrollToLatestPost()
})()

bwrd.showChangelog('11/23/2022', ['Should no longer scroll to Quick Reply instead of the last reply'])
