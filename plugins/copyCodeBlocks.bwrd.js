/*
    @name Copy Code Blocks
    @version 1.0.2
    @description Hover over code blocks to show a copy code button.
    @author david77
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/copyCodeBlocks.bwrd.js
*/

let isOnProfilePage = !!location.pathname.match(/profile/g)

bwrd.showChangelog('3/19/2022', [
	'Fixed multiple copy code buttons being created for the same code blocks on profile pages.'
])

if(document.querySelector('pre[class*=language-]') || isOnProfilePage){

    // CSS
    bwrd.injectStyle(`
    .copycb{
        position: absolute;
        width: 30px;
        height: 30px;
        right: 10px;
        top: 10px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: .11s opacity;
    }
    pre[class*=language-]{
        overflow: hidden;
        outline: none;
    }
    pre[class*=language-]:hover .copycb{
        opacity: 1;
    }
    code{
        overflow: auto;
        display: block;
    }`);

    // Padding for code blocks
    if(isOnProfilePage) util.addCSS('https://wearedevs.net/css/prism.css')

    const copySVG = `<svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 24 24" width="15" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>`;
    const successfulSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 24 24" width="19" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`;

    function copyCode(code){
        bwrd.copyToClipboard(bwrd.stripHTML(code.nextElementSibling.innerText));
        code.innerHTML = successfulSVG;
        setTimeout(()=> {code.innerHTML = copySVG;}, 1500);
    }

    function main(){
        document.querySelectorAll('pre[class*=language-]').forEach(cb => {
		if(cb.querySelector('copycb')) return

            let copycb = document.createElement('copycb');
            copycb.setAttribute('class', 'copycb theme1 border1');
            copycb.setAttribute('onclick', `copyCode(this)`);
            copycb.innerHTML = copySVG;
            cb.prepend(copycb);
            cb.style.position = 'relative';
        });
    }

    // Load More button on profiles
    let activityCards = document.querySelector('.activitycards');
    if(activityCards){
        new MutationObserver(main).observe(activityCards, {characterData: false, childList: true, attributes: false});
    }

    main();
}
