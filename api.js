function postsAPI(switcher, content) {
    // PostsAPI is a closure which only purpose is to retrieve posts 
    // from the database through the API *only as ckiclable items*
    // to receive the actual content of a post see 'postContentAPi'
    switch(switcher) {
        case "homepage":
            homepage();
            break;
        case "byTag":
            byTag(content);
            break;
        case "byTitle":
            byTitle(content);
            break;
    }

    function homepage() {
        const postsBox = document.getElementById('blog');
        const spinnerBox = document.getElementById('spinner-box');
        const loadBtn = document.getElementById('load-btn');
    
        let max = 0;
        let end;
        let begin;
    
            
        async function getPosts() {
            if (max == 0) {
                max = await fetch("https://boccarussoapi.herokuapp.com/posts/maxId").then(x => x.json());
                console.log(max);
                end = max;
                begin = end-2;
            }
            getThreeLastPost();
            
        }getPosts()
        
        async function getThreeLastPost() {
            fetch("https://boccarussoapi.herokuapp.com/posts/between/"+begin+"/"+end)
            .then(x => x.json())
            .then(y => y.forEach(
                z => appendArticles(z, postsBox)
            ));
            begin -= 3;
            end -= 3;
            if(end <= 0) { loadBtn.remove(); }
        } 
    
        loadBtn.addEventListener('click', () => {
            getThreeLastPost();
        })
    }

    function byTag(tag) {
        const place = document.getElementById('postsByTag');

        fetch("https://boccarussoapi.herokuapp.com/posts/getByTag/" + tag)
        .then(a => a.json())
        .then(b => b.forEach(
            c => appendArticles(c, place)
        ));
    }

    function byTitle(title) {
        const place = document.getElementById('postsByTitle');

        fetch("https://boccarussoapi.herokuapp.com/posts/getByTitle/" + title)
        .then(a => a.json())
        .then(b => {
            if (b.length == 0) {
                place.innerHTML += "<h2>Your search for  has produced no results</h2>";
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
    const projectsPlace = document.getElementById('projects');

    fetch("https://boccarussoapi.herokuapp.com/projectsDescending")
    .then(x => x.json())
    .then(y => y.forEach(appendProjects))

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

function tagsAPI(switcher) {
    switch(switcher) {
        case "options":
            options();
            break;
        case "all":
            allTags();
            break
    }

    function allTags() {
        const place = document.getElementById('tags');
        let api = "https://boccarussoapi.herokuapp.com/tags";
    
        fetch(api)
        .then(a => a.json())
        .then(b => b.forEach(
            c => appendTag(c, place)
        ));
    }

    function options() {
        const place = document.getElementById('selectTag');
    
        fetch("https://boccarussoapi.herokuapp.com/tags")
        .then(a => a.json())
        .then(y => y.forEach(
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
    const main = document.getElementById('main');
    const place = document.getElementById('content');

    main.style = "width: 70%; margin: 0 auto";

    fetch("https://boccarussoapi.herokuapp.com/posts/getBySlug/" + slug)
    .then(a => a.json())
    .then(b => makePost(b));

    function makePost(post) {
        console.log(post);
        place.innerHTML += `
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
        <ul class="actions container-tag">
        </ul>
        <hr>
        `;
    }
}