<?php
    require __DIR__ . "/config.php";

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode( '/', $uri );

    if ((isset($uri[2]) && $uri[2] != 'products') || !isset($uri[3])) {
        header("HTTP/1.1 404 Not Found");
        exit();
    }

    $objProductController = new ProductController();
    
    $strMethodName = strtolower($uri[3]) . 'Action';
    $objProductController->execute($strMethodName);
?>
