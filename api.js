function homePosts() {
    const postsBox = document.getElementById('blog');
    const spinnerBox = document.getElementById('spinner-box');
    const loadBtn = document.getElementById('load-btn');

    let max = 5;
    let end = max;
    let begin = max-2;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if((end -3)<= 0) { loadBtn.remove(); }
            begin -= 3; end -= 3;
            const posts = JSON.parse(this.responseText);
            posts.forEach(appendArticles);
          }
    };
    
    
    function getThreeLastPost() {
        api = "https://boccarussoapi.herokuapp.com/posts/between/"+begin+"/"+end;
        console.log(api);
        xmlhttp.open("GET", api, true);
        
        xmlhttp.send();
    }
    
    getThreeLastPost();
    
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