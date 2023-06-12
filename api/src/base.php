<?php

/**
 * Base Endpoint of the API
 * 
 * @author Razvan Cristian Pintea w20018875
 */
class Base extends Endpoint {
    /**
     * Override the constructor 
     * endpoint.
     */

    public function __construct() {


        /**
         * Assign student details to $student
         */

        $student = array(
            "first_name" => "Razvan-Cristian",
            "last_name" => "Pintea",
            "student_id" => "w20018875"
        );

        /**
         * Assign module details to $student
         */
        $module = array(
            "code" => "KV6013",
            "name" => "Individual Computing Project",
            "level" => 6,
        );

        $db = new Database(DATABASE);

        $this -> initialiseSQL();

        /**
         * Retrieve name of conference from the database and assign it to $conference
         */

        /**
         * Define what $data contains
         */
        $data = array(
            "name" => $student,
            "module" => $module,
        );

        $this -> setData(array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data
        ));
    }


    /**
     * Define SQL and SQL parameters
     */
    protected function initialiseSQL() {
        $sql = "SELECT name FROM conference_information";
        $params = [];
        $this -> setSQL($sql);
        $this -> setSQLParams($params);
    }
}

