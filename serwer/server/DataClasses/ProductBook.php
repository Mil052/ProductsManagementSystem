<?php
    class ProductBook extends Product {
        private $weight;

        public function __construct ($product_data) {
            parent::__construct($product_data);
            $this->weight = $product_data["weight"] ?? null;
        }

        public function getAllVars() {
            return get_object_vars($this); 
        }
    }