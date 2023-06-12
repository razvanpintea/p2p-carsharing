<?php

/**
 * Authors endpoint 
 * 
 * Endpoint for retrieving information about cars that have been marked as favourites  
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class Favourite extends Endpoint
{
     
    protected function initialiseSQL() {

    

        $sql="SELECT car.ID as car_id, favourites.ID, favourites.renter, brand, model, location, year, description, fuel_type, price, image1, image2, image3, image4, image5 
              FROM favourites
              JOIN car on car.ID=favourites.car";
        
        $params=[];

       if (filter_has_var(INPUT_GET, 'id')) 
            {
              
            $sql="SELECT car.ID as car_id, favourites.ID, favourites.renter, brand, model, location, year, description, fuel_type, price, image1, image2, image3, image4, image5 
            FROM favourites
            JOIN car on car.ID=favourites.car
            WHERE favourites.ID= :id";
               
                $params[":id"]=$_GET['id'];
             }
          
            if (filter_has_var(INPUT_GET, 'car_id') && filter_has_var(INPUT_GET, 'renter')) 
            {
              
            $sql="SELECT car.ID as car_id, favourites.ID, favourites.renter, brand, model, location, year, description, fuel_type, price, image1, image2, image3, image4, image5 
            FROM favourites
            JOIN car on car.ID=favourites.car
            JOIN users on users.email=renter
            WHERE car.ID= :car_id AND favourites.renter= :renter";
               
                $params[":car_id"]=$_GET['car_id'];
                $params[":renter"]=$_GET['renter'];

             }
             
        $this->setSQL($sql);
        $this->setSQLParams($params);
            }
            
}