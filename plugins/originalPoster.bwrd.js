/*
    @name Original Poster on Threads
    @version 1.0.0
    @description Show a blue OP badge next to the thread author name.
    @author david77
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/originalPoster.bwrd.js
*/


if(document.querySelector('.replygroup')){

    const originalPoster = getID(document.querySelector('.userdesc'))
    const posts = document.querySelectorAll('.userdesc')

    function getID(elm) { return elm.firstElementChild.href.split('uid=')[1] }

    bwrd.injectStyle(`
    .opName{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 7px;
    }
    .opDiv {
        font-size: 14px;
        background: #8dc5ff;
        color: black;
        padding: 0 5px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        pointer-events: none;
        gap: 2px;
    }
    .opDiv p{
        font-weight: 600;
    }
    `)

    posts.forEach(post => {
        if(!getID(post) != originalPoster || location.href.includes('?page')) return
        
        let opDiv = document.createElement('div')
        opDiv.setAttribute('class', 'opDiv')
        opDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg> <p>OP</p>`
        post.firstElementChild.appendChild(opDiv)
        post.firstElementChild.classList.add('opName')
    })
}
