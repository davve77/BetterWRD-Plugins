/*
    @name Collapse/Expand Sections
    @version 1.2.0
    @description Adds the ability to collapse/expand sections.
    @author david77
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/collapseExpandSections.bwrd.js
*/

class collapseSections {
    static arrowHTML = `<svg class="sectionArrow" xmlns="http://www.w3.org/2000/svg" height="24" width="24" cursor="pointer" viewBox="0 0 24 24" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"></path><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path></svg>`
    
    load(){
        if(!document.querySelector('.categoryGroup')) return
        if(!bwrd.getSettings()['sectionStates']) bwrd.setSettings({'sectionStates': '{}'})
        
        this.injectCSS()

        this.main()
        this.addMutationObserver()
    }

    main(){
        document.querySelectorAll('.categoryGroup').forEach(elm => {
            const arrowElm = document.createElement('div')
            const postsElm = elm.lastElementChild
            const titleElm = elm.firstElementChild

            // Set absolute height to wrappers so that height animations work
            postsElm.style.height = getComputedStyle(postsElm).height

            // Create arrow
            titleElm.classList.add('sectionTitle')
            titleElm.appendChild(arrowElm)
            arrowElm.outerHTML = this.constructor.arrowHTML

            // Add click event
            titleElm.querySelector('.sectionArrow').addEventListener('click', this.changeState.bind(null, elm, false), false)

            // Load states
            this.changeState(elm, true)
        })
    }

    addMutationObserver(){
        const _mut = new MutationObserver(() => {
            document.querySelectorAll('.categoryGroup').forEach(_ => {
                const elm = _.lastElementChild
                if(elm.offsetHeight == 0) return
                elm.style.removeProperty('height')
                const _height = elm.offsetHeight
                elm.style.height = _height + 'px'
            })
        })
        _mut.observe(document.querySelector('main'), { childList: true, subtree: true })
    }
    
    changeState(elm, isOnLoad){
        const _this = (isOnLoad) ? this : new collapseSections()
        const currentSection = elm.id
        const arrowElm = elm.firstElementChild.firstElementChild
        const postsElm = elm.lastElementChild

        if(!isOnLoad){
            // Section is expanded, collapse it
            if(_this.getState(currentSection) == 'expanded' || !_this.getState(currentSection)){
                _this.applyState('collapse', postsElm, arrowElm, false)
                _this.setState('collapsed', currentSection)
            }
    
            // Section is collapsed, expand it
            else if(_this.getState(currentSection) == 'collapsed'){
                _this.applyState('expand', postsElm, arrowElm, false)
                _this.setState('expanded', currentSection)
            }
        }

        // Save state for sections
        else if(isOnLoad && _this.getState(currentSection) == 'collapsed'){
            _this.applyState('collapse', postsElm, arrowElm, true)
        }
    }
    
    setState(state, section){
        const current = JSON.parse(bwrd.getSettings()['sectionStates'])
        current[section] = state
        return bwrd.setSettings({'sectionStates': JSON.stringify(current)})
    }
    
    getState(section){
        return JSON.parse(bwrd.getSettings()['sectionStates'])[section]
    }
    
    applyState(state, elm1, elm2, disableAnim){
        const func = (state == 'collapse') ? 'add' : 'remove'
        
        if(disableAnim){
            elm1.classList[func]('collapsed')
            elm2.classList[func]('arrowCollapsed')
        }
        else if(state == 'collapse'){
            elm1.classList[func]('collapsed-half')
            elm2.classList[func]('arrowCollapsed')
            setTimeout(()=> { elm1.classList[func]('collapsed') }, 130)
        }
        else{
            elm1.classList[func]('collapsed')
            elm2.classList[func]('arrowCollapsed')
            setTimeout(()=> { elm1.classList[func]('collapsed-half') }, 130)
        }
    }

    injectCSS(){
        bwrd.injectStyle(`
            .sectionTitle{
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .gridWrapper{
                transition: 167ms cubic-bezier(0,0,0,1);
            }
            .sectionArrow{
                transition: .085s cubic-bezier(0,0,0,1) opacity, .1s cubic-bezier(0,0,0,1) transform;
            }
            .arrowCollapsed{
                transform: rotate(-90deg);
            }
            .sectionArrow:hover{
                opacity: .5;
            }
            .collapsed-half{
                transform: scale(.98)!important;
                opacity: 0!important
            }
            .collapsed{
                height: 0!important;
            }`
        )
    }
}

new collapseSections().load()
bwrd.showChangelog('12/23/2022', ['Fixed a bug where threads would get cut out of container'])
