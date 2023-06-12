<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/** 
 * Update Award
 * 
 * Endpoint for adding a new user review based on the parameters received via POST
 * 
 * @author Razvan Cristian Pintea w20018875
 */
class InsertUserReview extends Endpoint {
   
    public function __construct() {
        $data=[];
        
            $data['message']=$_POST['message'];
            $data['owner']=$_POST['owner'];
            $data['renter']=$_POST['renter'];
            $data['booking']=$_POST['booking'];

            
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

        $sql="INSERT INTO user_review (message, owner, renter, booking) 
                      VALUES (:message, :owner, :renter, :booking)";
        $this -> setSQL($sql);
        $this -> setSQLParams(['message'=> $_POST['message'],
        'owner'=> $_POST['owner'],
        'renter'=> $_POST['renter'],
        'booking'=> $_POST['booking']]);
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