<?php
 
/**
 * A general class for endpoints
 * 
 * This class represents the parent class for all endpoints,providing
 * common methods. It has been declared as an abstract class, which
 * means it is not possible to make an instance of this class itself.
 * 
 * @author Razvan Cristian Pintea w20018875
 */
define('DATABASE','db/car.sqlite');

abstract class Endpoint 
{
    protected $data;
    protected $sql;
    protected $sqlParams;
 
    /**
     * Query the database and save the result 
     */
    public function __construct() {
        $db = new Database(DATABASE);
 
        $this->initialiseSQL();
        
        $data = $db->executeSQL($this->sql, $this->sqlParams);
 
        $this->setData( array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data
        ));
    }
 
    protected function setSQL($sql) {
        $this->sql = $sql;
    }

    protected function getSQL(){
        return $this->sql;
    }
 
    protected function setSQLParams($params) {
        $this->sqlParams = $params;
    }

    
    protected function getSQLParams(){
        return $this->sqlParams;
    }
 
    /**
     * Define SQL and params for the endpoint
     * 
     * This method can be overridden by other children of this class 
     * As this is just the general abstract endpoint class, SQL and params won't hold any value
     */
    protected function initialiseSQL() {
        $sql = "";
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
 
 
    protected function setData($data) {
        $this->data = $data;
    }
 
    public function getData() {
        return $this->data;
    }
    


}