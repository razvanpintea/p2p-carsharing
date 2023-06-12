<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/** 
 * Update Award
 * 
 * Endpoint for registering a new user to the website based on the parameters received via POST
 * 
 * @author Razvan Cristian Pintea w20018875
 */
class Register extends Endpoint {
   
    public function __construct() {
        $data=[];
        
            $data['first_name']=$_POST['first_name'];
            $data['last_name']=$_POST['last_name'];
            $data['email']=$_POST['email'];
            $data['phone']=$_POST['phone'];
            $data['password']=password_hash($_POST['password'],PASSWORD_DEFAULT);
         
            $email = $_POST['email'];
            $directory = $_SERVER['DOCUMENT_ROOT']. '/images/users/' . $email;
            if (!is_dir($directory)) {
                mkdir($directory, 0755, true);
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

        $sql="INSERT INTO users (first_name, last_name, email, phone, password, profile) 
                      VALUES (:first_name, :last_name, :email, :phone, :password, 'nothing')";
        $this -> setSQL($sql);
        $this -> setSQLParams(['first_name'=> $_POST['first_name'], 
        'first_name'=> $_POST['first_name'],
        'last_name'=> $_POST['last_name'],
        'email'=> $_POST['email'],
        'phone'=> $_POST['phone'],
        'password'=>  password_hash($_POST['password'], PASSWORD_DEFAULT)]);
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