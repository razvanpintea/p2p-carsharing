<?php
 
/**
 * Request class to handle different server request functions of index.php
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class Request 
{
    private $method;
    private $path;
 
    public function __construct() {
        $this->setMethod();
        $this->setPath();
    }
 
    private function setMethod() {
        $this->method = $_SERVER['REQUEST_METHOD'];
    }
 
    /**
     * Validate different HTTP request methods
     *
     * This function validates the http request method used, by checking the valid HTTP request methods passed as an argument as an associative array
     * If the method used is not included in the passed associative array argument, error message is displayed
     *
     * @param  Array    $validMethods    An associative array containing the valid HTTP request methods
     * @param  String   $method          A string which represents the used HTTP request 
     * @
     */
    public function validateRequestMethod($method, $validMethods) {
        if (!in_array($method, $validMethods)) {
            $output['message'] = "Invalid request method: ".$this->method;
            die(json_encode($output));
        }
    }
 
   
   /**
    * Set default path to /year3/assessment2
    * 
    */
   private function setPath() {
        $this->path = parse_url($_SERVER['REQUEST_URI'])['path'];
        $this->path = str_replace("/p2pcarsharing/api","",$this->path);
    }
 
    public function getPath() {
        return $this->path;
    }
 
}