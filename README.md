# App description
## App functionality:
This is a simple CMS system.
At the main page it displays the list of product items with product description. Each item has a checkbox in the top left corner. After clicking MASS DELETE button all the selected items will be removed. ADD button opens the page where we can add a new product by completing the form (there are three product types with different description informations).
## Technologies used in project:
I have implemented Rest Api.
    Note: Because free hosting I used to test it online doesn't support DELETE method of requests, I used POST method for delete operation and URL adress to determine the action (in server/index.php)
Frontend part is buid in React (with Redux, React Router, SASS)
Backend is build in PHP.
## How to run the code:
* Download the code and instal dependencies (in "/serwer/frontend" directory run: `npm install`).
* Create frontend production build (in "/serwer/frontend" directory run: `npm run build`).
* To run this app locally you will need a server with PHP and MySQL database (I have been using XAMPP).
* Set "/serwer" folder as the document root of your server (in server configuration file).
* Create the database (MySQL) and import products table from a file "products_scandiweb.sql"
* In file "serwer/server/config.php" set the database connection credentials to your database.

Alternatively You can just see the working app here: https://mgwebdevelopment.000webhostapp.com/