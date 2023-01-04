<?php
    class ProductController {

        public function __call($name, $arguments) {
            $this->sendResponse('', array('HTTP/1.1 404 Not Found'));
        }

        public function execute($actionName) {
            try {
                $this->{$actionName}();
            } catch (ValidationException $ex) {
                $this->sendResponse(["message" => $ex->getMessage()], ["HTTP/1.1 400 Bad Request"]);
            } catch (PDOException $ex) {
                if($ex->errorInfo[1] == 1062) {
                    $this->sendResponse(["message" => "Product with provided sku already exists."], ["HTTP/1.1 409 Conflict"]);
                } else {
                    $this->sendResponse(["message" => $ex->getMessage()], ["HTTP/1.1 500 Internal Server Error"]);
                }
            } catch (Exception $ex) {
                $this->sendResponse(["message" => $ex->getMessage()], ["HTTP/1.1 500 Internal Server Error"]);
            }
        }

        public function getAction () {
            $db_handler = new DatabaseHandler;
            $products = $db_handler->getAllProducts();
            $this->sendResponse($products, ["HTTP/1.1 200 Ok", "Content-Type: application/json"]);
        }

        public function deleteAction () {
            $products_sku = $this->getRequestBody();
            $db_handler = new DatabaseHandler;
            $result = $db_handler->deleteProducts($products_sku);
            $this->sendResponse(null, ["HTTP/1.1 204 No Content"]);
        }

        public function postAction () {
            $product_data = $this->getRequestBody();
            $new_product = Product::parseToObj($product_data);
            $new_product->validate();
            $db_handler = new DatabaseHandler;
            $result = $db_handler->addNewProduct($new_product);
            $this->sendResponse(null, ["HTTP/1.1 201 Created"]);
        }

        private function getRequestBody () {
            $request_data = file_get_contents("php://input");
            return json_decode($request_data, true);
        }

        private function sendResponse ($data, $httpHeaders = array()) {
            header_remove('Set-Cookie');
            if ($httpHeaders) {
                foreach ($httpHeaders as $httpHeader) {
                    header($httpHeader);
                }
            }
            if ($data) {
                echo json_encode($data);
            }
            exit;
        }
}    