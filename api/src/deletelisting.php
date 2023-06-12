<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/** 
 * Update Award
 * 
 * Endpoint for deleting a listing from the website based on the parameter received via POST
 * 
 * @author Razvan Cristian Pintea w20018875
 */
class DeleteListing extends Endpoint {
   
    public function __construct() {
        $data=[];
        
            $data['ID']=$_POST['ID'];


            $data['brand']=$_POST['brand'];
            $data['model']=$_POST['model'];
            $data['year']=$_POST['year'];
            $data['location']=$_POST['location'];
            $data['fuel_type']=$_POST['fuel_type'];
            $data['description']=$_POST['description'];
            $data['price']=$_POST['price'];
            $data['owner']=$_POST['owner'];

            $directory = $_SERVER['DOCUMENT_ROOT']. '/images/cars/' .$data['owner'] .'/' 
            .$data['brand'].str_replace(' ', '', $data['model']).$data['year'].$data['location'].$data['fuel_type'].$data['price']. '/';
            if (is_dir($directory)) {
                $files = scandir($directory);
                foreach ($files as $file) {
                  if ($file != "." && $file != "..") {
                    unlink($directory . '/' . $file);
                  }
                }
                rmdir($directory);
              }
            
        /**
         * Validate request method, token and the award and paper_id parameters 
         *
         */
        $this -> validateRequestMethod("POST");

        /**
         * Connect to database, initialise SQL, and store query result in $queryResult
         *
         */
        $db = new Database("db/car.sqlite");
        $this -> initialiseSQL();
        $queryResult = $db -> executeSQL($this -> getSQL(), $this -> getSQLParams());

        $this -> setData(array(
            "length" => 0,
            "message" => "endpoint under construction",
            "data" => $data
        ));
    }




    /**
     * Set SQL statement and SQL parameters
     * 
     */
    protected function initialiseSQL() {

        $sql="DELETE FROM car WHERE ID=:ID";
        $this -> setSQL($sql);
        $this -> setSQLParams(['ID'=> $_POST['ID']]);
    }


    /**
     * Validate  HTTP request methods
     *
     * This function validates the HTTP request method used, by checking the valid HTTP request method passed as an argument 
     * If the server request method used is not equal to the parameter, an error message is displayed
     *
     * @param  String   $method          A string which represents the used HTTP request 
     * @
     */
    private     function validateRequestMethod($method) {
        if ($_SERVER['REQUEST_METHOD'] != $method) {
            die(json_encode(array(
                "message" => "invalid request method"
            )));
        }
    }


}