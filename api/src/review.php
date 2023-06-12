<?php

/**
 * Authors endpoint 
 * 
 * Query the database in order to retrieve reviews of cars
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class Review extends Endpoint
{
     
    protected function initialiseSQL() {

        $sql="SELECT review.ID, review.car, review.message, review.listing, renter,  users.first_name || ' ' || users.last_name AS renter_name, users.email AS renter_email
            FROM review
            join users on users.id = review.renter";
        $params=[];

       if (filter_has_var(INPUT_GET, 'car_id')) 
            {
              
           
        $sql="SELECT review.ID, review.car, review.message, review.listing, renter, users.first_name || ' ' || users.last_name AS renter_name, users.email AS renter_email
        FROM review
        join users on users.id = review.renter
            WHERE car = :car_id";
               
                $params[":car_id"]=$_GET['car_id'];
             }

             if (filter_has_var(INPUT_GET, 'listing_id')) 
            {
              
           
        $sql="SELECT review.ID, review.car, review.message, review.listing, renter, users.first_name || ' ' || users.last_name AS renter_name, users.email AS renter_email
        FROM review
        join users on users.id = review.renter
            WHERE review.listing = :listing_id";
               
                $params[":listing_id"]=$_GET['listing_id'];
             }

           
           
      if (filter_has_var(INPUT_GET, 'car_id') && filter_has_var(INPUT_GET, 'renter_id')) 
             {
                      
         $sql="SELECT review.ID, review.car, review.message, review.listing, renter, users.first_name || ' ' || users.last_name AS renter_name, users.email AS renter_email
         FROM review
         join users on users.id = review.renter
         WHERE car = :car_id AND renter=:renter_id";
                
                 $params[":car_id"]=$_GET['car_id'];
                 $params[":renter_id"]=$_GET['renter_id'];

              }
             
        $this->setSQL($sql);
        $this->setSQLParams($params);

            }
  
}