<?php
    // Set database credentials
    define("DB_HOST", "localhost");
    define("DB_NAME", "products_scandiweb");
    define("DB_USER", "cms_admin");
    define("DB_PASSWORD", "mypassword");

    // Require all classes
    require __DIR__ . "/APIControllers/ProductController.php";
    require __DIR__ . "/DBHandler/ProductDbHandler.php";
    require __DIR__ . "/DataClasses/Product.php";
    require __DIR__ . "/DataClasses/ProductDVD.php";
    require __DIR__ . "/DataClasses/ProductBook.php";
    require __DIR__ . "/DataClasses/ProductFurniture.php";
    require __DIR__ . "/Exceptions/ValidationException.php";
