const menuButton = document.getElementById('menuButton');

// when updating the webpage the menu doesn't retrieve
// clicking it manually is the most straightforward solution
const clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
});

function controller() { 
    let baseURL = window.location.href;
    const splitted = baseURL.split('/');
    // const style = document.getElementsByTagName("head")[0];
    const main = document.getElementById('content');
    // const body  = document.getElementsByTagName("body")[0];

    // everytime the page gets (between a lot of quotes) "reloaded"
    // it stays at the same place cauing the possibilities of having
    // the content not visible 'cause at the top
    $('html, body').animate({ scrollTop: 0 }, 'fast');

    main.innerHTML = "";
    switch(splitted[3]) {
        case "":
            main.innerHTML += getAboutMe();
            postsAPI("homepage");
            break;
        case "projects":
            main.innerHTML += getProjects();
            ProjectsAPI();
            break;
        case "tags":
            if(splitted[4]) {
                main.innerHTML += getPostsByTag(splitted[4]);
                postsAPI("byTag", splitted[4]);
            } else {
                main.innerHTML += getSelectTag();
                tagsAPI("all");
            }
            break;
        case "search":
            main.innerHTML += getPostsByTitle(splitted[4]);
            postsAPI("byTitle", splitted[4]);
            break;
        case "post":
            postContentAPi(splitted[4]);
            break;
    }
}

// heart of the structure
(function() { 
    // options puts the value into the select tag of the header
    // it needs to be called only one single time at the beginning
    tagsAPI("options");
    controller();
})();
window.addEventListener('popstate', () => {
    controller();
});

function redirectHome() {
    window.history.pushState({}, 'projects', "/");
    menuButton.dispatchEvent(clickEvent);
    controller();
}

function redirectProjects() {
    window.history.pushState({}, 'projects', "/projects");
    menuButton.dispatchEvent(clickEvent);
    controller();
}

function redirectTags() {
    window.history.pushState({}, 'projects', "/tags");
    menuButton.dispatchEvent(clickEvent);
    controller();
}

function searchPost() {
    let t = "/search/"+document.getElementsByName("q")[0].value;
    window.history.pushState({}, '', t);
    menuButton.dispatchEvent(clickEvent);
    controller();
}

function redirectSingleTag(tag) {
    window.history.pushState({}, '', "/tags/"+tag);
    controller();
}

function redirectSelectedTag() {
    let value = document.getElementById("selectTag").value;
    menuButton.dispatchEvent(clickEvent);
    if (value) redirectSingleTag(value);
}

function redirectSinglePost(title) {
    window.history.pushState({}, '', "/post/" + title);
    controller();
}

function getLoadingGif() {
    return `
        <span class="image main">
            <img src="/assets/css/loading.gif" alt="loading...">
        </span>
    `;
}

// https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
function getAboutMe() {
    return `
    <h1 class="primary">GABRIELE BOCCARUSSO</h1>
    <h2>Software Developer</h2>
    <ul class="actions container-tag">
        <li><a class="button primary icon solid" href="#about-me">about me</a></li>
        <li><a class="button primary icon solid" href="#blog">blog</a></li>
        <li><a class="button primary icon solid" href="#contact-me">contact me</a></li>
    </ul>
    <span class="image main under" id="about-me">
    <picture>
    <source media="(min-width: 737px)" srcset="https://i.ibb.co/fdFgDxK/banner.png">
    <img src="https://i.ibb.co/H7KTWVS/responsive-Banner.png"
    alt="names and logos of main technologies">
    </picture>
    </span>
    <div class="tiles">
        <article>
            <p style="font-size: 1.3rem;">
                Beginning programming in a high school specialized in computer science
                I quickly began to dive deep in correlated topics such as web development and data science. 
                <br>
                Currently in the last year of high school, you can find everything that I worked on mainly 
                in my blog here or on <a href="https://gabrieleboccarusso.medium.com/">dev</a> or <a href = "https://gabrieleboccarusso.medium.com/">medium</a>
            </p>
        </article>
        <article>
            <span class="image" style="opacity:1;"> 
                <img src="https://i.ibb.co/dgQXK8F/propic.jpg" alt="profile picture">		
            </span>
        </article>
        <article>
            <p style="font-size: 1.3rem;">
                If you need a software developer you can send me an email in the <a href = "#contact-me">contact me</a> section or 
                visit my <a href = "https://www.linkedin.com/in/gabrieleboccarusso/">linkedin</a>, for more info about my work and my projects you can visit my 
                <a href = "https://github.com/gabrieleboccarusso">github</a> where you can find the source code of my most important projects or useful snippets.
            </p>
        </article>
    </div>
    <section class="tiles" id="blog">
    <div id="spinner-box" class="not-visible"></div>
    </section>
    <br>
    <br>
    <div style = "display:flex; justify-content: center;" id = "btn-parent">
        <button id="load-btn">Load more</button>
    </div>
    `
}

function getSelectTag() {
    return `
        <h1>All tags:</h1>
        <ul id="tags" class="actions container-tag">
        </ul>
    `;
}

function getProjects() {
    return `
        <h1>All projects:</h1>
        <section id="projects" class="tiles">
        </section>
    `
}

function getPostsByTag(tag) {
    return `
        <h1>Tag: ${tag}</h1>
        <section id="postsByTag" class="tiles">
        </section>
    `
}

function getPostsByTitle(title) {
    return `
        <h1>Looking for: ${title}</h1>
        <section id="postsByTitle" class="tiles">
        </section>
    `
}

/*
function addBaseStyle(style) {
    const title = document.createElement("title");
    title.appendChild(document.createTextNode("TITLE"));

    const link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", "http://www.boccarusso.com/");
    const meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", "Official website of Gabriele Boccarusso, European developer writing about informatics and various topics");

    style.appendChild(title);
    style.appendChild(link);
    style.appendChild(meta);
}
*/