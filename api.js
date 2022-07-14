function homePosts() {
    const postsBox = document.getElementById('blog');
    const spinnerBox = document.getElementById('spinner-box');
    const loadBtn = document.getElementById('load-btn');

    let switchFunc = "";
    let max;
    let end;
    let begin;

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            switch(switchFunc) {
                case "getMax":
                    max = this.responseText;
                    end = parseInt(max);
                    begin = end-2;
                    getThreeLastPost();
                    break;
                case "getThreeLastPost":
                    if((end -3)<= 0) { loadBtn.remove(); }
                    begin -= 3; end -= 3;
                    const posts = JSON.parse(this.responseText);
                    posts.forEach(appendArticles);
                    break;
            }
          }
    }
    
    function getMax() {
        switchFunc = "getMax";
        let api = "https://boccarussoapi.herokuapp.com/posts/maxId";
        xmlhttp.open("GET", api, true);
        xmlhttp.send();
    } getMax();

    function getThreeLastPost() {
        switchFunc = "getThreeLastPost";
        let api = "https://boccarussoapi.herokuapp.com/posts/between/"+begin+"/"+end;
        xmlhttp.open("GET", api, true);
        xmlhttp.send();
    }

    loadBtn.addEventListener('click', () => {
        getThreeLastPost();
    })
    
    function appendArticles(article) {
        text = `
                <article>
                    <a href=/${article.slug}>
                        <h2>${article.title}</h2>
                        <div class="content">
                            <p> ${article.intro} </p>
                        </div>
                    </a>
                    <span class="image">
                        <img src=https://drive.google.com/uc?id=${article.image} alt="cover">
                    </span>
                </article>
        `
        // TODO: change innerHTML to appendChild or something similar
        postsBox.innerHTML += text;
    }
}

function tags() {
    const main = document.getElementById('tags');
    const selectTag = document.getElementById('selectTag');

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const tags = JSON.parse(this.responseText);
            tags.forEach(appendTags);
        }
    }

    function getTags() {
        let api = "https://boccarussoapi.herokuapp.com/tags";
        xmlhttp.open("GET", api, true);
        xmlhttp.send();
    } getTags();

    function appendTags(tag) {
        let text = `
            <li>
                <a class="button ${tag.name}" onclick="redirectSingleTag('${tag.name}')">
                    <span>${tag.name.replace('-', ' ')}</span>
                </a>
            </li>
        `;
        main.innerHTML += text;
    }
}