# To run this project you should:
    1. In folder "serwer/frontend" instal dependencies using: $ npm install
    2. In folder "serwer/frontend" build the frontend app with: $ npm run build
    3. You will need a server (I have been using XAMPP)
    4. Set "serwer" folder as the document root of your server (in server configuration file)
        or copy folders "server" "frontend/build" and a file .htacces to your server document root folder
    5. Create the database (MySQL) and import products table from a file "products_scandiweb.sql"
    6. In file "serwer/server/config.php" set the database connection credentials to your database.

# Description
    This is a simple CMS system. Listing, adding, deleting products.
    I have implemented Rest Api. Frontend part is buid in React and backend in PHP.
    Note: Because free hosting I used to test it online doesn't support DELETE method of requests, I used POST method for delete operation and URL adress to determine the action (in server/index.php)