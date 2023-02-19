/*
    @name Posts Count on Profile Page
    @version 1.1.1
    @description Displays a posts & threads count on profiles.
    @author david77
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/postsCountOnProfile.bwrd.js
*/

(async () => {
    if(!(/profile/).test(location.pathname)) return
    if(!document.querySelector('#info')) return

    // CSS
    bwrd.injectStyle(`
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

    // Create a stats sidecard
    const sideCards = document.querySelector('#profile_sidecards')
    const cloneSc = document.querySelector('.profile_content').cloneNode(true)
    const statsDiv = document.createElement('div')

    while(cloneSc.children.length > 1) cloneSc.lastChild.remove()
    cloneSc.children[0].textContent = 'Stats'
    statsDiv.className = 'statistics'
    statsDiv.innerHTML = `<div class="stats-loading"/>`

    cloneSc.appendChild(statsDiv)
    sideCards.prepend(cloneSc)

    // Find post to fetch
    var userID = document.querySelector('[href*="uid"]').href.split('=')[1]
    var posts = document.querySelectorAll('.activitycard')
    var chosenPost = undefined
    var _attempts = 0

    function selectNextPost(){
        let _stop = false
        posts.forEach(post => {
            if(_stop) return
            if(chosenPost == undefined){
                const postLink = post.querySelector('[href*="/t/"]')
                if(postLink){
                    _stop = true
                    return chosenPost = postLink
                }
            } else {
                const parentCard = chosenPost.closest('.activitycard')
                const nextCard = parentCard.nextElementSibling
                if(!nextCard) return
                const postLink = nextCard.querySelector('[href*="/t/"]')
                if(postLink){
                    _stop = true
                    return chosenPost = postLink
                }
            }
        })
    }

    // No posts
    if(posts.length < 1) return statsDiv.innerHTML = 'No activity'

    // Main
    async function setStatCount(){
        return new Promise(async res => {
            let fetchPost = await fetch(chosenPost.href, {credentials: 'omit'}).then(e => e.text())
            let _parsed = new DOMParser().parseFromString(fetchPost, 'text/html')
            let _replies = _parsed.querySelectorAll('.thread_replierdata')

            // Cloudflare page
            if((/Just a moment.../).test(_parsed.title)) res(false)
        
            // Find post/thread count
            _replies.forEach((elm, i) => {
                let _userID = elm.firstElementChild.href.match(/\d+/)[0]
                if(_userID == userID){
                    let statsDiv = elm.querySelector('.userstats')
                    let postCount = statsDiv.children[0].textContent.match(/\d+/)[0]
                    let threadCount = statsDiv.children[1].textContent.match(/\d+/)[0]
    
                    if(!(postCount && threadCount)) res(false)
                    res([postCount, threadCount])
                }
                else if(i == _replies.length - 1)
                    res(false)
            })
        })
        .then(stats => {
            // Stop after 7 attempts
            if(_attempts > 6) return statsDiv.innerHTML = 'Failed to fetch'

            // Didn't find stats, try next post
            else if(!stats){
                selectNextPost()
                setStatCount()
                _attempts++
                return
            }
    
            // Update stats sidecard
            statsDiv.innerHTML = `Posts: ${stats[0]} <br> Threads: ${stats[1]}`
        })
    }

    // Run plugin
    selectNextPost()
    setStatCount()
})();

bwrd.showChangelog('2/19/22', ['Removed additional gap between sidecards', 'More consistency—no more random errors'])
