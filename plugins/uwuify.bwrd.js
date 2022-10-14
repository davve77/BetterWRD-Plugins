/*
    @name UwUify
    @version 1.0.1
    @description UwU OwO your posts because why not
    @author Seizure Salad
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/uwuify.bwrd.js
*/

window.addEventListener('load', async() => {
    if(window.location.pathname.match(/forum\/t\/\d+\/newreply/) || window.location.pathname === '/forum/roblox/newthread') {
        let button = document.createElement('a');
        button.classList.add('theme2');
        button.classList.add('button');
        button.style = 'color: inherit; float: right; margin-right: 8px;';
        button.innerText = 'UwUify';
        button.addEventListener('click', () => {
            tinymce.activeEditor.setContent(tinymce.activeEditor.getContent().replaceAll('l','w').replaceAll('r', 'w'));
        });

        document.querySelector('a[class="theme2 button"').parentNode.appendChild(button);
    }
});
