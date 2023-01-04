<?php
    abstract class Product implements JsonSerializable {
        
        protected $sku;
        protected $name;
        protected $price;
        protected $type;

        public function __construct ($product_data) {
            $this->sku = $product_data["sku"] ?? null;
            $this->name = $product_data["name"] ?? null;
            $this->price = $product_data["price"] ?? null;
            $this->type = $product_data["type"] ?? null;
        }
         /**
         * Parse data to object
         * @param array $product_data
         * @return object Product
         */
        public static function parseToObj ($product_data) {
            $object_type = "Product" . $product_data["type"];
            return new $object_type($product_data);
        }

        public function validate() {
            $valid_types = ["sku" => "string",
                            "name" => "string",
                            "price" => "float",
                            "type" => "string",
                            "size" => "integer",
                            "weight" => "float",
                            "height" => "integer",
                            "width" => "integer",
                            "length" => "integer"];
            $invalidFields = [];
            foreach ($this->getAllVars() as $key => $value) {
                if (!$value){
                    $invalidFields[] = $key;
                } elseif ($valid_types[$key] == "integer" && !is_numeric($value)){
                    $invalidFields[] = $key;
                }
            }
            if($invalidFields) {
                throw new ValidationException("Ivalid input data in: " . implode(', ', $invalidFields) . ".");
            }
        }

        protected abstract function getAllVars();
    
        public function jsonSerialize () {
            return $this->getAllVars(); 
        }
         /**
         * Get properties names of the Product object
         * @return array $properties_names
         */
        public function getPropertiesNames() {
            $properties_names = [];
            foreach ($this->getAllVars() as $name => $value) {
                $properties_names[] = $name;
            }
            return $properties_names;
        }
         /**
         * Set property of the Product object
         * @param string $property_name
         * @param mixed $value
         */
        public function setProperty($property_name, $value) {
            $this->$property_name = $value;
        }
    }