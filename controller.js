(function() { 
    console.log("plain JS baby"); 

    // let baseURL = "https://boccarussofrontend.herokuapp.com/";
    let baseURL = window.location.href;
    const style = document.getElementsByTagName("head")[0];
    console.log(baseURL.split('/'));

    style.innerHTML += "<title>TITLE</title>";
})();