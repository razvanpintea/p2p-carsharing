<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/** 
 * Update Award
 * 
 *Upload a driving licence picture of a user to the server and save path to database
 *  
 * @author Razvan Cristian Pintea w20018875
 */
class UploadLicence extends Endpoint {
   
    public function __construct() {
        $data=[];
       
        
       

            $image = $_FILES['image'];
            $filename = $image['name'];
            $tmp_name = $image['tmp_name'];
            $directory = $_SERVER['DOCUMENT_ROOT'] . '/year3/disspictures/users/' . $_POST['user'] . '/';
           $destination = $directory .'licence.jpg';
            move_uploaded_file($tmp_name, $destination);
            $message="ok";

        

    



            
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
            "message" => $message,
            "data" => $data
        ));
    }




    /**
     * Set SQL statement and SQL parameters
     * 
     */
    protected function initialiseSQL() {
        $directory = 'http://unn-w20018875.newnumyspace.co.uk/year3/disspictures/users/' . $_POST['user'] . '/';
        $destination = $directory .'licence.jpg';
      
        if (filter_has_var(INPUT_GET, 'verified')) 
            {
              
                $sql = "UPDATE users SET licence=:licence, verified=:verified WHERE email=:email";
                $this->setSQL($sql);
                $this->setSQLParams(['licence' => $destination, 'verified' => $_GET['verified'], 'email' => $_POST['user']]);
             }

       
        
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