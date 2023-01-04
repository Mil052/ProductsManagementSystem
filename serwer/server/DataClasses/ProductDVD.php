<?php
    class ProductDVD extends Product {
        private $size;

        public function __construct ($product_data) {
            parent::__construct($product_data);
            $this->size = $product_data["size"] ?? null;
        }

        public function getAllVars () {
            return get_object_vars($this); 
        }
    }
