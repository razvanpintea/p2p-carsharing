<?php
/**
 * Authentication endpoint 
 * 
 * Handle the log in process and validate the username and password, by comparing them with data from the database
 * 
 * @author Razvan Cristian Pintea w20018875
 */

use FirebaseJWT\JWT;

class Authenticate extends Endpoint
{
    
    public function __construct() {
 
        /**
         * Query the database and save the result 
         */
        $db = new Database("db/car.sqlite");
        $this->validateRequestMethod("POST");
        $this->validateAuthParameters();

        $this->initialiseSQL();
        $queryResult=$db->executeSQL($this->getSQL(), $this->getSQLParams());

        /**
         * Validate username and password 
         */
        $this->validateUsername($queryResult); 
        $this->validatePassword($queryResult); 

        /**
         * Create JWT (Jason Web Token) and store it in $data  
         */
        $data['token']=$this->createJWT($queryResult); 
        $this->setData( array(
          "length" => 0, 
          "message" => "success",
          "data" => $data
        ));
    }

    
    /**
     * Validate authentication parameters
     *
     * This function checks wheter both parameters, username and password exist 
     *
     */
    private function validateAuthParameters() {
        if ( !isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW']) ) {
            die( json_encode( array(
                "message" => "email and password required"
            )));
        }
    }

   
   /**
     * Validate password 
     *
     * This function checks if the password matches the one in the database
     * 
     */
    private function validatePassword($data) {
        if (!password_verify($_SERVER['PHP_AUTH_PW'], $data[0]['password'])) {
            die( json_encode( array(
                "message" => "wrong password"
            )));
        } 
    }

   
   /**
    * Set SQL and SQL parameters  
    *
    */
   protected function initialiseSQL() {
        $sql = "SELECT id, email, password FROM users WHERE email = :email";
        $this->setSQL($sql);
        $this->setSQLParams(['email'=>$_SERVER['PHP_AUTH_USER']]);
    }

    
    
    /**
     * Validate username 
     *
     * This function checks if the username matches the one in the database
     * 
     */
    private function validateUsername($data) {
        if (count($data)<1) {
            die( json_encode( array(
                "message" => "email address is not registered "
            )));
        } 
    }

    

    /**
     * Create JWT (Jason Web Token)
     *
     * Create valid JWT based on the SQL query result
     *      
     * @param  Array    $queryResult   Array containing result of the SQL statement 
     */
    private function createJWT($queryResult){
    $secretKey = SECRET;
  
    $time = time();
        $tokenPayload = [
          'iat' => $time,
          'exp' => strtotime('+1 day', $time),
          'iss' => $_SERVER['HTTP_HOST'],
          'sub' => $queryResult[0]['id']
        ];

    $jwt = JWT::encode($tokenPayload, $secretKey, 'HS256');
  
  return $jwt;

}

    /**
     * Validate  HTTP request methods
     *
     * This function validates the HTTP request method used, by checking the valid HTTP request method passed as an argument 
     * If the server request method used is not equal to the parameter, an error message is displayed
     *
     * @param  String   $method          A string which represents the used HTTP request 
     * 
     */
    
    private     function validateRequestMethod($method) {
        if ($_SERVER['REQUEST_METHOD'] != $method){
            die( json_encode( array(
                "message" => "invalid request method"
            )));
        }
    }

}