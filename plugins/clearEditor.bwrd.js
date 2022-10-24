/*
    @name Clear Editor
    @version 1.0.0
    @description Clears the text editor.
    @author atari
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/clearEditor.bwrd.js
    NOTE: This is a modified version of SeizureSalad's plugin, UwUify.
*/

window.addEventListener('load', async() => {
    if (window.location.pathname.match(/forum\/t\/\d+\/newreply/) || window.location.pathname === '/forum/roblox/newthread') {
        var button = document.createElement('a');
        button.classList.add('theme2');
        button.classList.add('button');
        button.style = 'color: inherit; float: right; margin-right: 8px;';
        button.innerText = 'Clear Editor';
        button.addEventListener('click', () => {
            console.log(`Old content: ${tinymce.activeEditor.getContent()}`);
            bwrd.alert('BetterWRD', 'Text editor has been cleared, old content was printed to the console.');
            tinymce.activeEditor.setContent('');
        });
      
        document.querySelector('a[class="theme2 button"').parentNode.appendChild(button);
    }
});
