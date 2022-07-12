const postsBox = document.getElementById('posts-box')
const spinnerBox = document.getElementById('spinner-box')
const loadBtn = document.getElementById('load-btn')

let begin = 0;
let end = 3;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    if(this.responseText.slice(-1) == ' ') { loadBtn.remove(); }
    postsBox.innerHTML += this.responseText;
  }
};

function getThreeLastPost() {
    xmlhttp.open("POST", "./assets/js/posts.php?b="+begin+"&e="+end, true);
    begin += 3;
    end += 3;
    xmlhttp.send();
}

getThreeLastPost();

loadBtn.addEventListener('click', () => {
    getThreeLastPost();
})
