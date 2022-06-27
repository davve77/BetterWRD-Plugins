/*
    @name Block Users
    @version 1.0.2
    @description Allows you to block users (hides their replies).
    @author lxnny
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/blockUsers.bwrd.js
    BIG CREDITS TO DAVID FOR HELPING ME <3
*/

bwrd.showChangelog('6/27/2022', ['Fixed plugin erroring on a few pages']);

let usersthatrblocked = [];
if(bwrd.getSettings().usersthatrblocked != usersthatrblocked && bwrd.getSettings().usersthatrblocked != undefined){
    usersthatrblocked = bwrd.getSettings().usersthatrblocked
}

usersthatrblocked.forEach(cusr =>{

    const currentuser = `[href="/profile?uid=${cusr}"]`;
    const all = document.querySelectorAll(currentuser);

    all.forEach(cg => {
        if(!cg.textContent.includes("@") && cg.parentElement.nodeName != "P"){
            let elm = cg.parentElement.parentElement

            elm.style.filter = "blur(11px)"
            elm.style.pointerEvents = 'none'
        }
        
    })

})


function createBlockButton(mmentionbtn, parentdiv){
    mmentionbtn.textContent = 'Block User'
    mmentionbtn.removeAttribute('href')
    mmentionbtn.style.cursor = 'pointer'
    mmentionbtn.style.marginLeft = '3px'
    mmentionbtn.style.setProperty('backdrop-filter', 'none', 'important')
    mmentionbtn.classList.add('blockbtn')
    mmentionbtn.setAttribute('onclick', `blockuser(this)`)

    parentdiv.appendChild(mmentionbtn)
}


function blockuser(mentionbtn){
   
    var getid = mentionbtn.parentElement.previousElementSibling.href.split('uid=')[1]
    
    
    usersthatrblocked.push(getid)
    bwrd.setSettings({usersthatrblocked: usersthatrblocked});
    bwrd.alert("BetterWRD", "Successfully blocked user\nRefresh to apply changes");

    
}

function unblockall(){
   

    bwrd.setSettings({usersthatrblocked: []});
    bwrd.alert("BetterWRD", "Successfully unblocked everyone\nRefresh to apply changes");

    
}

const btns = document.querySelectorAll('.btnmention')

btns.forEach(mentionbtn  => {
    if(mentionbtn.classList.contains("multimentionbtn")){

    }
    else{
        createBlockButton(mentionbtn.cloneNode(mentionbtn), mentionbtn.parentNode)
    }
    
})

let changeLog = document.querySelectorAll('[title="Change Log"]')[0]
if(changeLog){
    changeLog = changeLog.parentNode
    let unblockAll = changeLog.cloneNode(true)
    unblockAll.removeAttribute('href')
    unblockAll.setAttribute('onclick', `unblockall()`)
    unblockAll.setAttribute('style', 'cursor: pointer;')
    unblockAll.textContent = "Unblock Everyone"
    changeLog.parentElement.prepend(unblockAll)
}










