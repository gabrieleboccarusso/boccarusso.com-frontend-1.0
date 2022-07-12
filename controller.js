document.getElementById("demo").innerHTML =
"The full URL of this page is:<br>" + window.location.href;

const style = document.getElementsByTagName("head")[0];
console.log(style);
style.innerHTML += "<title>TITLE</title>";


(function() { 
    console.log("plain JS baby"); 

    document.getElementById("demo").innerHTML =
    "The full URL of this page is:<br>" + window.location.href;

    const style = document.getElementsByTagName("head")[0];
    console.log(style);
    style.innerHTML += "<title>TITLE</title>";
})();