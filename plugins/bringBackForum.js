/*
    @name Bring Back Forum
    @version 1.0.0
    @description shhh don't tell jon
    @author david77
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/bringBackForum.js
*/


(function bringForumBack(){

    // If the forum returns, alert the user to delete the plugin
    if(document.querySelector('[title="Speak with the community"]')){
        return bwrd.alert('Bring Forum Back', 'The forum seems to be back. You can now delete this plugin.')
    }


    // Replace 'forum' with 'Forum' for every link
    document.querySelectorAll('a[href*="forum"]').forEach(link => {
        if((/forum/).test(link.href)){
            link.href = link.href.replace('forum', 'Forum')
        }
    })


    // Bring back 'Community' in navbar
    {(()=> {
        if(!document.querySelector('.navItem')) return

        const scriptsItem =     document.querySelectorAll('.navItem')[1]
        const commItem =        scriptsItem.cloneNode(true)
        const navItems =        scriptsItem.parentElement

        commItem.firstElementChild.href = '/Forum'
        commItem.firstElementChild.textContent = 'Community'
        commItem.firstElementChild.title = 'Speak with the community'

        navItems.appendChild(commItem)
        navItems.insertBefore(commItem, scriptsItem.nextElementSibling)
    })()}


    // Redirect '/downed-forum' to '/Forum'
    if((/downed-forum/).test(location.pathname)){
        location = '/Forum'
        document.querySelectorAll('div')[1].innerHTML = 'Redirecting...'
    }
})()
