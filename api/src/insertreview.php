<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/** 
 * Update Award
 * 
 * Endpoint for adding a new car review based on the parameters received via POST
 * 
 * @author Razvan Cristian Pintea w20018875
 */
class InsertReview extends Endpoint {
   
    public function __construct() {
        $data=[];
        
            $data['message']=$_POST['message'];
            $data['renter']=$_POST['renter'];
            $data['car']=$_POST['car'];

            
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

        $sql="INSERT INTO review (message, car, renter, listing) 
                      VALUES (:message, :car, :renter, :listing)";
        $this -> setSQL($sql);
        $this -> setSQLParams(['message'=> $_POST['message'],
        'car'=> $_POST['car'],
        'renter'=> $_POST['renter'],
        'listing'=> $_POST['listing']]);
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