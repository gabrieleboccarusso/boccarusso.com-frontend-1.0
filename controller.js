(function() { 
    controller();
})();

// const searchButton = document.getElementById('searchButton');
const menuButton = document.getElementById('menuButton');
const clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
});

function controller() { 
    let baseURL = window.location.href;
    const splitted = baseURL.split('/');
    const style = document.getElementsByTagName("head")[0];
    const main = document.getElementById('content');
    const body  = document.getElementsByTagName("body")[0];
    // console.log(splitted);
    
    window.history.pushState
    switch(splitted[3]) {
        case "":
            main.innerHTML = "";
            main.innerHTML += getAboutMe();
            console.log("home");
            break;
        case "projects":
            // console.log("projects");
            main.innerHTML = "";
            main.innerHTML += "projects";
            break;
        case "tags":
            console.log("tags");
            main.innerHTML = "";
            main.innerHTML += "tags";
            break;
        case "search":
                console.log("search");
                main.innerHTML = "";
                main.innerHTML += "search: " + splitted[4];
                break;
        case "post":
                console.log("post");
                main.innerHTML = "";
                main.innerHTML += "post";
                break;
    }
}

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
    window.history.pushState({}, 'projects', t);
    menuButton.dispatchEvent(clickEvent);
    controller();
}

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
    `
}