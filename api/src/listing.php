<?php

/**
*This class provides methods to retrieve information of cars available in the database
*@author Razvan Cristian Pintea
*/
class Listing extends Endpoint
{
/**
     * Initializes the SQL statement for retrieving booking information based on various query parameters.
     *
     * This method constructs an SQL statement based on the values of the query parameters passed through HTTP GET request.
     * The constructed SQL statement joins the car, booking, and users tables, and selects booking ID, car brand and model,
     * rental location, fuel type, year, description, status, car owner and renter information, pick up and drop off dates,
     * and car images. The WHERE clause is added based on the values of the query parameters.
     *
     */
protected function initialiseSQL()
{
        $sql="SELECT users.ID as user_id, users.email as owner_email, car.ID, first_Name as owner_first_name, last_Name as owner_last_name, brand, model, location, year, description, fuel_type, price,image1, image2, image3, image4, image5 
        FROM car
        JOIN users on users.ID=car.owner";
        $params=[];

        if (filter_has_var(INPUT_GET, 'id')) 
            {
              
            $sql="SELECT users.ID as user_id, users.email as owner_email, car.ID, first_Name as owner_first_name, last_Name as owner_last_name, brand, model, location, year, description, fuel_type, price,image1, image2, image3, image4, image5 
            FROM car
            JOIN users on users.id=car.owner
            WHERE car.ID= :id";
               
                $params[":id"]=$_GET['id'];
             }
            
        
        if (filter_has_var(INPUT_GET, 'exception')) 
             {
               
             $sql="SELECT users.ID as user_id, users.email as owner_email, car.ID, first_Name as owner_first_name, last_Name as owner_last_name, brand, model, location, year, description, fuel_type, price,image1, image2, image3, image4, image5 
             FROM car
             JOIN users on users.id=car.owner
             WHERE users.email != :exception";
                
                 $params[":exception"]=$_GET['exception'];
              }

      
        if (filter_has_var(INPUT_GET, 'city')) 
            {
              
            $sql="SELECT users.ID as user_id, users.email as owner_email, car.ID, first_Name as owner_first_name, last_Name as owner_last_name, brand, model, location, year, description, fuel_type, price, image1, image2, image3, image4, image5 
            FROM car
            JOIN users on users.id=car.owner
            WHERE car.location= :city";
               
                $params[":city"]=$_GET['city'];
             }



             if (filter_has_var(INPUT_GET, 'city') && filter_has_var(INPUT_GET, 'exception')) 
             {
               
             $sql="SELECT users.ID as user_id, users.email as owner_email, car.ID, first_Name as owner_first_name, last_Name as owner_last_name, brand, model, location, year, description, fuel_type, price,image1, image2, image3, image4, image5 
             FROM car
             JOIN users on users.id=car.owner
             WHERE car.location= :city AND users.email != :exception";
                
                 $params[":city"]=$_GET['city'];
                 $params[":exception"]=$_GET['exception'];
              }
              
              
             if (filter_has_var(INPUT_GET, 'random')) 
            {
              
            $sql="SELECT users.ID as user_id, users.email as owner_email, car.ID, first_Name as owner_first_name, last_Name as owner_last_name, brand, model, location, year, description, fuel_type, price,image1, image2, image3, image4, image5 
            FROM car
            JOIN users on users.ID=car.owner
            ORDER BY RANDOM() LIMIT 30";
               
             }
             
        

        if (filter_has_var(INPUT_GET, 'exceptionRandom')) 
        {
          
        $sql="SELECT users.email, users.ID as user_id, users.email as owner_email, car.ID, first_Name as owner_first_name, last_Name as owner_last_name, brand, model, location, year, description, fuel_type, price,image1, image2, image3, image4, image5 
        FROM car
        JOIN users on users.ID=car.owner
        WHERE users.email != :exceptionRandom
        ORDER BY RANDOM() LIMIT 30";
        
        $params[":exceptionRandom"]=$_GET['exceptionRandom'];
         }

         if (filter_has_var(INPUT_GET, 'owner')) 
         {
           
         $sql="SELECT users.ID as user_id, users.email as owner_email, car.ID, first_Name as owner_first_name, last_Name as owner_last_name, brand, model, location, year, description, fuel_type, price,image1, image2, image3, image4, image5 
         FROM car
         JOIN users on users.id=car.owner
         WHERE users.email = :owner";
            
             $params[":owner"]=$_GET['owner'];
          }
        
        
         $this->setSQL($sql);
        $this->setSQLParams($params);

            }
  
}