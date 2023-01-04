<?php
    class ProductFurniture extends Product {
        private $height;
        private $width;
        private $length;

        public function __construct ($product_data) {
            parent::__construct($product_data);
            $this->height = $product_data["height"] ?? null;
            $this->width = $product_data["width"] ?? null;
            $this->length = $product_data["length"] ?? null;
        }

        public function getAllVars () {
            return get_object_vars($this); 
        }        
    }