<?php
    class DatabaseHandler {
        private $db_connection;
        private $parameters_types = [
            "sku" => PDO::PARAM_STR,
            "name" => PDO::PARAM_STR,
            "price" => PDO::PARAM_STR,
            "type" => PDO::PARAM_STR,
            "size" => PDO::PARAM_INT,
            "weight" => PDO::PARAM_STR,
            "height" => PDO::PARAM_INT,
            "width" => PDO::PARAM_INT,
            "length" => PDO::PARAM_INT,
        ];

         /**
         * Set the database connection
         */
        public function __construct () {
            // Database credentials constants from file config.php
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8";
            $this->db_connection = new PDO($dsn, DB_USER, DB_PASSWORD);
        }

         /**
         * Get all products from database products_table
         * @return array Associative array containing all products
         */
        public function getAllProducts() {
            $sql = "SELECT *
                    FROM products_table";
            $query = $this->db_connection->query($sql);
            $dbResult = $query->fetchAll(PDO::FETCH_ASSOC);
            $result = [];
            foreach ($dbResult as $row) {
                $result[] = Product::parseToObj($row);
            }
            return $result;
        }

         /**
         * Delete records from database
         * @param array $products_sku An array of sku identifiers
         */
        public function deleteProducts($products_sku) {
            $sql = "DELETE FROM products_table
                    WHERE sku IN ('" . implode("', '", $products_sku) . "')";
            return $this->db_connection->query($sql);
        }

         /**
         * Add new product to database products_table
         * @param object $product
         */
        public function addNewProduct($product) {
            $column_set = $product->getPropertiesNames();
            $placeholders = [];
            foreach ($column_set as $column) {
                $placeholders[] = ":{$column}";
            }
            $sql = "INSERT INTO products_table (" . implode(", " , $column_set) .  ")
                    VALUES (" . implode(", " , $placeholders) . ")";
            $stmt = $this->db_connection->prepare($sql);

            foreach($product->getAllVars() as $property_name => $property_value) {
                $stmt->bindValue(":{$property_name}", $property_value, $this->parameters_types[$property_name]);
            }
            return $stmt->execute();
        }
    }