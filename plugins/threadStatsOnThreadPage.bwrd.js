/*
    @name Thread Stats on Thread Page
    @version 1.0.0
    @description Displays the thread's statistics on its page.
    @author david77
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/threadStatsOnThreadPage.bwrd.js
*/


(async ()=> {

    /* Only run if on thread page */
    if(!document.querySelector('.btnLikeReply')) return

    /* Create stats */
    let threadStats = document.createElement('p')
    let titleDiv = document.querySelector('#topic').parentElement.parentElement
    threadStats.innerHTML = '<div class="stats-loading"/>'
    threadStats.classList.add('thread-stats')
    titleDiv.appendChild(threadStats)

    /* CSS */
    bwrd.injectStyle(`
    .thread-stats{
        font-size: 14px;
        opacity: .7;
        padding-top: 10px;
    }
    .stats-loading{
        height: 20px;
        width: 20px;
        opacity: .6;
        display: inline-block;
        border: 2px solid;
        border-radius: 50%;
        border-top-color: transparent;
        margin-top: 5px;
        animation: stats-loading-anim 1s linear infinite;
    }
    @keyframes stats-loading-anim {
        0% {transform: rotate(0);}
        100% {transform: rotate(360deg);}
    }`)

    /* Fetch */
    const topicElm       = document.querySelector('#topic').textContent.split(`'`),
          threadTitle    = topicElm[1] ? (topicElm[0].length > topicElm[1].length ? topicElm[0] : topicElm[1]) : topicElm[0],
          fetchSearch    = await fetch(`/forum/all?order=latestthread&search=${encodeURIComponent(threadTitle)}`).then(e => e.text()),
          searchResult   = new DOMParser().parseFromString(fetchSearch, 'text/html')

    /* Stop if thread is not found */
    if(!searchResult || !searchResult.querySelector('.thread-title')) return threadStats.remove()

    /* Set stats */
    let viewsCount = searchResult.querySelectorAll('td')[3].textContent
    let repliesCount = searchResult.querySelectorAll('td')[2].textContent
    threadStats.innerHTML = `${viewsCount} Views • ${repliesCount} Replies`
})()
