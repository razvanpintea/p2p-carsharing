<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/** 
 * Update Award
 * 
 * Endpoint for adding a new listing on the website based on the parameters received via POST
 * 
 * @author Razvan Cristian Pintea w20018875
 */
class InsertListing extends Endpoint {
   
    public function __construct() {
        $data=[];
        
            $data['brand']=$_POST['brand'];
            $data['model']=$_POST['model'];
            $data['year']=$_POST['year'];
            $data['location']=$_POST['location'];
            $data['fuel_type']=$_POST['fuel_type'];
            $data['description']=$_POST['description'];
            $data['price']=$_POST['price'];
            $data['owner']=$_POST['owner'];
            
            $image1 = $_FILES['image1'];
            $filename1 = $image1['name'];
            $tmp_name1 = $image1['tmp_name'];

            $image2 = $_FILES['image2'];
            $filename2 = $image2['name'];
            $tmp_name2 = $image2['tmp_name'];
            
            $image3 = $_FILES['image3'];
            $filename3 = $image3['name'];
            $tmp_name3 = $image3['tmp_name'];

            $image4 = $_FILES['image4'];
            $filename4 = $image4['name'];
            $tmp_name4 = $image4['tmp_name'];

            $image5 = $_FILES['image5'];
            $filename5 = $image5['name'];
            $tmp_name5 = $image5['tmp_name'];
            
            $directory = $_SERVER['DOCUMENT_ROOT']. '/images/cars/' .$data['owner'] .'/' 
            .$data['brand'].str_replace(' ', '', $data['model']).$data['year'].$data['location'].$data['fuel_type'].$data['price']. '/';
            if (!is_dir($directory)) {
                mkdir($directory, 0755, true);

            $destination1 = $directory .'image1.jpg';
            $destination2 = $directory .'image2.jpg';
            $destination3 = $directory .'image3.jpg';
            $destination4 = $directory .'image4.jpg';
            $destination5 = $directory .'image5.jpg';

            move_uploaded_file($tmp_name1, $destination1);
            move_uploaded_file($tmp_name2, $destination2);
            move_uploaded_file($tmp_name3, $destination3);
            move_uploaded_file($tmp_name4, $destination4);
            move_uploaded_file($tmp_name5, $destination5);

            

            
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

    }


    /**
     * Set SQL statement and SQL parameters
     * 
     */
    protected function initialiseSQL() {
        $directory = 'https://p2pcarsharingproject.com/images/cars/' .$_POST['owner'] .'/' 
        .$_POST['brand'].str_replace(' ', '', $_POST['model']).$_POST['year'].$_POST['location'].$_POST['fuel_type'].$_POST['price']. '/';
        $destination1 = $directory .'image1.jpg';
        $destination2 = $directory .'image2.jpg';
        $destination3 = $directory .'image3.jpg';
        $destination4 = $directory .'image4.jpg';
        $destination5 = $directory .'image5.jpg';

        $sql="INSERT INTO car (brand, model, year, location, fuel_type, description, price, owner, image1, image2, image3, image4, image5)
                      VALUES (:brand, :model, :year, :location, :fuel_type, :description, :price, :owner, :image1, :image2, :image3, :image4, :image5)";
        $this -> setSQL($sql);
        $this -> setSQLParams(['brand'=> $_POST['brand'],
        'model'=> $_POST['model'],
        'year'=> $_POST['year'],
        'location'=> $_POST['location'],
        'fuel_type'=> $_POST['fuel_type'],
        'description'=> $_POST['description'],
        'price'=> $_POST['price'],
        'owner'=> $_POST['ownerID'],
        'image1'=> $destination1,
        'image2'=> $destination2,
        'image3'=> $destination3,
        'image4'=> $destination4,
        'image5'=> $destination5]);
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
    private function validateRequestMethod($method) {
        if ($_SERVER['REQUEST_METHOD'] != $method) {
            die(json_encode(array(
                "message" => "invalid request method"
            )));
        }
    }


}
