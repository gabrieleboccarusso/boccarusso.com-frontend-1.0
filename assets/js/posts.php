<?php
    /* 
    database post table reference:
    [0] => Id
    [1] => slug
    [2] => title
    [3] => intro
    [4] => image
    [5] => tags
    [6] => Creation
    [7] => LastUpdate
    [8] => content
    */
    $servername = getenv("DB_SERVER_NAME");
	$username = getenv("DB_USER");
	$password_db = getenv("DB_PW");
	$database = getenv("DB_NAME");
    $conn = new mysqli($servername, $username, $password_db, $database);

    if(!$conn) {
        echo 'not conn';
    }; 
    
    $end = $_REQUEST["e"];
    $begin = $_REQUEST["b"];

    $sql = "SELECT MAX(Id) AS 'id' FROM post";
    $max= $conn->query($sql); 
    $max = $max->fetch_assoc();
    $max = $max["id"];

    // determine what range should we get
    // ex: max is 9
    // first iteration: (max - begin) and (max - end) => (9-0) and (9-3) => 9 and 6
    // first iteration: (max - begin) and (max - end) => (9-3) and (9-6) => 6 and 3
    $begin = $max - $begin;
    $end = $max - $end + 1;
    
    $sql = "SELECT * FROM post WHERE Id BETWEEN " . $end . " AND " . $begin . " ORDER BY Id DESC";

    $result = $conn->query($sql);
    $data = $result->fetch_all();



    for ($i = 0; $i < count($data); $i++) {
        $data[$i][1] .= '/';
        echo <<<TEXT
            <article>
            <a href={$data[$i][1]}>
                <h2>{$data[$i][2]}</h2>
                    <div class="content">
                        <p> {$data[$i][3]} </p>
                    </div>
                </a>
                <span class="image">
                    <img src=https://drive.google.com/uc?id={$data[$i][4]} alt="cover">
                </span>
            </article>
        TEXT;
    };

    echo $post;
    if ($end <= 1) {
        echo ' '; // if this is found at the end of the string the button gets deleted
    }
?>