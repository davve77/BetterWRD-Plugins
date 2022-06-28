/*
    @name Top Loading Bar
    @version 1.0.0
    @description Adds a loading bar at the top of the page.
    @author david77
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/topLoadingBar.bwrd.js
*/

// Credits to https://github.com/buunguyen/topbar for the topbar indicator

bwrd.includeLibrary('https://buunguyen.github.io/topbar/topbar.min.js', false, () => {
    
    window.addEventListener('beforeunload', () => { createTopbar(2100) })
    createTopbar(5)

    function createTopbar(ms){
        topbar.config({
            barThickness : 2,
            barColors    : {'1.0': '#7293ff'},
            className    : 'topbar',
        })
      
        topbar.show();
        (function progress(){
            setTimeout(() => { if(topbar.progress('+.01') < 1) progress() }, 16)
            setTimeout(() => { topbar.hide() }, ms)
        })()
    }
})
