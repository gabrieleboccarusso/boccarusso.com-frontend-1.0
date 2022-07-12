let img = document.getElementById("main-img");
let imgs = document.getElementsByTagName("img");
let main = document.getElementById("main");

for (let i = 0; i < imgs.length; i++) {
    imgs[i].className = "image main";
};

if (window.innerWidth < 640) {
    main.style.width = "";
    main.style.margin = "";
};