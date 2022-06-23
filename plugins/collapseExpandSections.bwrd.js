/*
    @name Collapse/Expand Sections
    @version 1.0.0
    @description Adds the ability to collapse/expand sections.
    @author david77
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/blockUsers.bwrd.js
*/


if(document.querySelector('.categoryGroup')){

    if(!bwrd.getSettings()['sectionStates']) {bwrd.setSettings({'sectionStates': '{}'})}

    // CSS
    bwrd.injectStyle(`
    .sectionTitle{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .gridWrapper{
        transition: .085s ease height;
    }
    .sectionArrow{
        transition: .085s ease opacity, .1s ease transform;
    }
    .arrowCollapsed{
        transform: rotate(-90deg);
    }
    .sectionArrow:hover{
        opacity: .5;
    }
    .collapsed{
        height: 0!important;
    }`)


    // Create arrows
    document.querySelectorAll('.categoryGroup').forEach(cg => {

        let arrowElm = document.createElement('div')
        let postsElm = cg.lastElementChild
        let elm = cg.firstElementChild
        
        // Set height to post wrappers so transition works
        postsElm.style.height = getComputedStyle(postsElm).height

        // Create arrow
        elm.classList.add('sectionTitle')
        elm.appendChild(arrowElm)
        arrowElm.outerHTML = `<svg onclick="expandCollapseSection(this.parentElement.parentElement, false)" class="sectionArrow" xmlns="http://www.w3.org/2000/svg" height="24" width="24" cursor="pointer" viewBox="0 0 24 24" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"></path><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path></svg>`

        expandCollapseSection(cg, true)
    })

    function expandCollapseSection(elm, isOnLoad){

        let cgState = ()=> {return JSON.parse(bwrd.getSettings()['sectionStates'])}
        let currentSection = elm.id
        let arrowElm = elm.firstElementChild.firstElementChild
        let postsElm = elm.lastElementChild


        if(!isOnLoad){

            // Section is expanded, collapse it
            if(cgState()[currentSection] == 'expanded' || !cgState()[currentSection]){
                postsElm.classList.add('collapsed')
                arrowElm.classList.add('arrowCollapsed')
                setState('collapsed')
            }
    
            // Section is collapsed, expand it
            else if(cgState()[currentSection] == 'collapsed'){
                postsElm.classList.remove('collapsed')
                arrowElm.classList.remove('arrowCollapsed')
                setState('expanded')
            }
        }


        // Save state for sections
        else if(isOnLoad && cgState()[currentSection] == 'collapsed'){
            postsElm.classList.add('collapsed')
            arrowElm.classList.add('arrowCollapsed')
        }


        function setState(state){
            let current = JSON.parse(bwrd.getSettings()['sectionStates'])
            current[currentSection] = state
            bwrd.setSettings({'sectionStates': JSON.stringify(current)})
        }
    }
}
