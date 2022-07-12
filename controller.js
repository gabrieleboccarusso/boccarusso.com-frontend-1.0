(function() { 
    console.log("plain JS baby"); 

    // let baseURL = "https://boccarussofrontend.herokuapp.com/";
    let baseURL = window.location.href;
    const splitted = baseURL.split('/');
    const style = document.getElementsByTagName("head")[0];
    const main = document.getElementsByClassName('inner')[0];
    main.innerHTML += splitted[splitted.length-1];

    style.innerHTML += "<title>TITLE</title>";
})();