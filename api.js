const api_basic_url = "https://test-prod-test-3mkxu2.mo1.mogenius.io";

function postsAPI(switcher, content) {
    // PostsAPI is a closure which only purpose is to retrieve posts 
    // from the database through the API *only as ckiclable items*
    // to receive the actual content of a post see 'postContentAPi'
    switch(switcher) {
        case "homepage":
            setTitle("Gabriele Boccarusso's official website");
            homepage();
            break;
        case "byTag":
            setTitle("Tag: " + content);
            byTag(content);
            break;
        case "byTitle":
            setTitle("Looking for " + content);
            byTitle(content);
            break;
    }

    function homepage() {
        const postsBox = document.getElementById('blog');
        const spinnerBox = document.getElementById('spinner-box');
        const loadMore = document.getElementById('btn-parent');
        let loadBtn;
    
        let max = 0;
        let end;
        let begin;
    
        postsBox.innerHTML = getLoadingGif();
        
        async function getPosts() {
            if (max == 0) {
                max = await fetch(api_basic_url + "/posts/maxId").then(x => x.json());
                // console.log(max);
                end = max;
                begin = end-2;
            }
            postsBox.innerHTML = "";
            loadMore.innerHTML += `
            <button id="load-btn">Load more</button>
            `;
            if (end > 0) {
                loadBtn = document.getElementById('load-btn');
                loadBtn.addEventListener('click', () => {
                    getThreeLastPost();
                })
            }
            getThreeLastPost();
            
        }getPosts()
        
        async function getThreeLastPost() {
            fetch(api_basic_url + "/posts/between/"+begin+"/"+end)
            .then(a => a.json())
            .then(b => b.forEach(
                c => appendArticles(c, postsBox)
            ));
            begin -= 3;
            end -= 3;
            if(end <= 0) { loadBtn.remove(); }
        } 
    
    }

    function byTag(tag) {
        const place = document.getElementById('postsByTag');

        fetch(api_basic_url + "/posts/getByTag/" + tag)
        .then(a => a.json())
        .then(b => b.forEach(
            c => appendArticles(c, place)
        ));
    }

    function byTitle(title) {
        const place = document.getElementById('postsByTitle');

        fetch(api_basic_url + "/posts/getByTitle/" + title)
        .then(a => a.json())
        .then(b => {
            if (b.length == 0) {
                place.innerHTML += "<h2>Your search has produced no results</h2>";
            } else {
                b.forEach(c => appendArticles(c, place));
            }
        })
    }
   
    function appendArticles(article, place) {
        text = `
                <article>
                    <a onclick="redirectSinglePost('${article.slug}')">
                        <h2>${article.title}</h2>
                        <div class="content">
                            <p> ${article.intro} </p>
                        </div>
                    </a>
                    <span class="image">
                        <img src="${article.image}" alt="cover">
                    </span>
                </article>
        `
        place.innerHTML += text;
    }
}

function ProjectsAPI() {
    setTitle("All projects");
    const projectsPlace = document.getElementById('projects');
    projectsPlace.innerHTML = getLoadingGif();

    fetch(api_basic_url + "/projectsDescending")
    .then(a => a.json())
    .then(b => {
        projectsPlace.innerHTML = "";
        b.forEach(appendProjects)
    })

    function appendProjects(project) {
        text = `
                <article>
                    <a href="${project.repoLink}">
                        <h2>${project.title}</h2>
                        <div class="content">
                            <p> ${project.intro} </p>
                        </div>
                    </a>
                    <span class="image">
                        <img src="${project.image}" alt="cover">
                    </span>
                </article>
        `
        projectsPlace.innerHTML += text;
    }
}

function tagsAPI(switcher, unrefinedTags = null) {
    switch(switcher) {
        case "options":
            options();
            break;
        case "all":
            setTitle("All tags");
            allTags();
            break;
    }

    function allTags() {
        const place = document.getElementById('tags');
        let api = api_basic_url + "/tags";
    
        fetch(api)
        .then(a => a.json())
        .then(b => b.forEach(
            c => appendTag(c, place)
        ));
    }

    function options() {
        const place = document.getElementById('selectTag');
        place.innerHTML += "";
    
        fetch(api_basic_url + "/tags")
        .then(a => a.json())
        .then(b => b.forEach(
            c => appendOptionTag(c, place)
        ));
    }

    function appendOptionTag(tag, place) {
        let option = `
            <option value='${tag.name}'>${tag.name.replace('-', ' ')}</option>
        `;
        place.innerHTML += option;
    }
    
    function appendTag(tag, place) {
        let text = `
            <li>
                <a class="button ${tag.name}" onclick="redirectSingleTag('${tag.name}')">
                    <span>${tag.name.replace('-', ' ')}</span>
                </a>
            </li>
        `;
        place.innerHTML += text;
    }
}


function postContentAPi(slug) {
    const place = document.getElementById("content");
    const head = document.getElementsByTagName("head")[0];
    place.innerHTML = `
        <span class="image">
            <img src="/assets/css/loading.gif" alt="cover">
        </span>
    `;
    if (window.innerWidth > 640) {
        document.getElementById('content').style =`width: 70%; margin: 0 auto`;
    }

    fetch(api_basic_url + "/posts/getBySlug/" + slug)
    .then(a => a.json())
    .then(b => makePost(b));

    function makePost(post) {
        place.innerHTML = "";
        makeHead(post);
        setTitle(post.title + " - Gabriele Boccarusso");
        tags = makeTags(post.tags);
        place.innerHTML += `
            <div>
            <h1 style="text-align:center">${post.title}</h1>
            <hr>
            <p style="text-align:center">
            author: <span class="h">Boccarusso</span>
            <br>
            created: <span class="h">${post.creation}</span>
            <br>
            Last update: <span class="h">${post.lastUpdate}</span> 
            </p>
            <hr>
            <ul class="actions container-tag" id="containerTag">
            ${tags}
            </ul>
            <hr>
            <span class="image main" id="main-img">
            <img src="${post.image}" alt="article cover" class="image main">
            </span>
            <article id="article">
                ${post.content}
            </article>
            <!--
            <span class="image left">
            <a href="google.com">
            <img src="" alt="">
            </a>
            </span>
            <span class="image right">
            <img src="" alt="">
            </span>
            -->
            </div>
        `;
        let imgs = document.getElementsByTagName("img");
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].className = "image main";
        };
    }

    function makeHead(post) {
        const head = document.getElementsByTagName("head")[0];
        // remember to add keywords
        head.innerHTML += `
            <meta name='description' content="${post.intro}">
            <meta name='description' content="${post.tags.replace('-', ' ')}">
            <meta property='og:title' content="${post.title}"> 
            <meta property='og:type' content="article"> 
            <meta property='og:url' content="${window.location.href}"> 
            <meta property='og:image' content="${post.image}">
            <meta name="author" content="Gabriele Boccarusso">
            <link rel="canonical" href="${window.location.href}">
            <meta name="author" content="Gabriele Boccarusso">
        `;
    }
    
    function makeTags(unrefined) {
        tags = unrefined.split("-");
        let result = "";
        let link = "";
        tags.forEach(tag => 
            {
            link = tag.replace(' ', '-');
            result += `
                <li>
                    <a class="button ${link}" onclick="redirectSingleTag('${link}')">
                        <span>${tag}</span>
                    </a>
                </li>
            `
        ;});
        return result;
    }
}

function emailAPI(subject, email, message, resultPlace, form) {
    fetch("https://formsubmit.co/ajax/9c89e8aa57888c949d4ad490921b2430", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            subject: subject,
            email: email,
            message: message
        })
    })
    .then(a => {
        resultPlace.innerHTML = "Your email has been successfully sent!";
        form.reset()
        setTimeout(function(){
            resultPlace.innerHTML="";
        },5000);
    })
    .catch(error => resultPlace.innerHTML +="There was an error! Try resending your message");
}

//  document.designMode = "on";