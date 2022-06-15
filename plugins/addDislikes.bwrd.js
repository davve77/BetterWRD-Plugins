/*
    @name Add Dislikes
    @version 1.0.0
    @description Adds a dislike button to replies and posts.
    @author Seizure Salad
    @source https://raw.githubusercontent.com/davve77/BetterWRD-Plugins/main/plugins/addDislikes.bwrd.js
*/

//i dedicate this plugin to evosploit and ishanjit
//backend is terrible lol
setTimeout(async() => { //some day i will not do this but not today
    if(window.location.pathname.match(/forum\/t\/\d+/) && !window.location.pathname.includes('newreply')) {
        function getTrid(element) {
            return parseInt(element.getAttribute('data-trid'));
        }

        async function getDislikes(trid) {
            return await fetch(`https://bwrd-dislike-backend-production.up.railway.app/dislikecount?trid=${trid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json());
        }

        let user = await bwrd.getUser();
        let uid = parseInt(user.id);

        bwrd.injectStyle(`
        .reply_menu li {
            display: inline-flex;
            cursor: pointer;
        }

        .btnDislikeReply {
            opacity: .5
        }
    
        .btnDislikeReply::after {
            content: "";
            width: 1.1em;
            height: 1.1em;
            background-image: url(https://cdn.discordapp.com/attachments/861748086724362260/983023238869303296/dislike.png);
            background-size: cover;
            background-repeat: no-repeat;
            margin-left: 3px
        }
    
        .btnDislikeReply.disliked {
            opacity: 1!important
        }
        `);

        let posts = document.querySelectorAll('.themebtn.btn.theme1.round.border1.btnLikeReply');

        async function setDislike(trid, uid, event) {
            if(!event.target.classList.contains('disliked') && !parseInt(event.target.textContent) > 0) { 
                event.target.classList.add('disliked'); 
                event.target.textContent = parseInt(event.target.textContent) + 1;
            }
            else {
                event.target.classList.remove('disliked');
                event.target.textContent = parseInt(event.target.textContent) - 1;
            }

            await fetch("https://bwrd-dislike-backend-production.up.railway.app/dislike", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"trid": trid, "uid": uid})
            })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    event.target.textContent = res.dislikes;
                }
                else {
                    if(res.message) {
                        bwrd.alert('Error!', `Error: ${res.message}`);
                    }
                    else {
                        bwrd.alert('Error!', 'An unexpected error occured...');
                    }
                }
            })
        }

        posts.forEach(async post => {
            let dislike = document.createElement('p');
            dislike.className = 'themebtn btn theme1 round border1 btnDislikeReply verticalCenter threadbtn';
            dislike.style = 'gap: 2px; padding: 5px 10px; filter: brightness(1.25); cursor: pointer; display: flex;';
            dislike.addEventListener('click', async(event) => {
                await setDislike(getTrid(post), uid, event);
            });
            let dislikeCount = await getDislikes(getTrid(post));
            dislike.innerHTML = dislikeCount.dislikes;
            post.parentNode.insertBefore(dislike, post.nextSibling);
        });
    }
}, 100);
