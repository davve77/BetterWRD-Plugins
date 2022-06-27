/*
    @name Original Poster on Threads
    @version 1.0.1
    @description Show an OP badge next to the thread author name.
    @author david77
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/originalPoster.bwrd.js
*/

bwrd.showChangelog('6/27/2022', [
    'The plugin now works on threads with multiple pages',
    'Changed the OP badge colors',
    'Fixed bugs'
])

if(document.querySelector('.replygroup')){

    const getAttr           = (url, search) => new URLSearchParams((typeof url == 'object' ? url.search : new URL(url).search)).get(search)
    const getID             = elm => getAttr(elm.firstElementChild.href, 'uid')

    const posts             = document.querySelectorAll('.userdesc')
    const originalPosterID  = getAttr(location, 'op') || getID(posts[0])
    const threadNav         = document.querySelectorAll('a[href*="?page"]')

    bwrd.injectStyle(`
    .opName{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 7px;
    }
    .opDiv {
        font-size: 14px;
        background: #93c8ff29;
        color: white;
        padding: 0 5px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        pointer-events: none;
        gap: 2px;
    }
    .opDiv p{
        font-weight: 300;
    }`)

    posts.forEach(post => {
        if(getID(post) != originalPosterID) return
        
        let opDiv = document.createElement('div')
        opDiv.setAttribute('class', 'opDiv')
        opDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="white"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg> <p>OP</p>`
        post.firstElementChild.appendChild(opDiv)
        post.firstElementChild.classList.add('opName')
    })

    threadNav.forEach(btn => btn.href = btn.href + '&op=' + originalPosterID)
}
