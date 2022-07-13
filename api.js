function homePosts() {
    const postsBox = document.getElementById('blog');
    const spinnerBox = document.getElementById('spinner-box');
    const loadBtn = document.getElementById('load-btn');

    let switchFunc = "";
    let max;
    let end;
    let begin;

    var xmlhttp = new XMLHttpRequest();
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
    };
    
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