<?php

/**

*Represents the Booking endpoint 
*This class provides methods to retrieve booking information from the system, such as booking ID, car brand and model,
*rental location, fuel type, year, description, status, car owner and renter information, pick up and drop off dates,
*and car images. It extends the Endpoint class.
*
*@author Razvan Cristian Pintea
*/
class Booking extends Endpoint
{
/**
* Initializes the SQL statement for retrieving booking information based on various query parameters.
*
* This method constructs an SQL statement based on the values of the query parameters passed through HTTP GET request.
* The constructed SQL statement joins the car, booking, and users tables, and selects booking ID, car brand and model,
* rental location, fuel type, year, description, status, car owner and renter information, pick up and drop off dates,
* and car images. The WHERE clause is added based on the values of the query parameters.
*
* @return void
*/
protected function initialiseSQL()
{
      $sql="SELECT booking.ID, brand, model, location, fuel_type, year, description, status, car.ID as car, users.email as owner,
      users.first_name || ' ' || users.last_name AS owner_name, renters.email as renter,
      renters.first_name || ' ' || renters.last_name AS renter_name, 
      pick_up_date, drop_off_date, image1, image2, image3, image4, image5
      FROM car 
      JOIN booking ON car.id=booking.car
      JOIN users ON users.id = car.owner
      JOIN users AS renters ON renters.email = booking.renter";

                             
        $params=[];

        if (filter_has_var(INPUT_GET, 'renter')) 
            {
              
               $sql="SELECT booking.ID, brand, model, location, fuel_type, year, description, status, car.ID as car, users.email as owner,
               users.first_name || ' ' || users.last_name AS owner_name, renters.email as renter,
               renters.first_name || ' ' || renters.last_name AS renter_name, 
               pick_up_date, drop_off_date, image1, image2, image3, image4, image5
               FROM car 
               JOIN booking ON car.id=booking.car
               JOIN users ON users.id = car.owner
               JOIN users AS renters ON renters.email = booking.renter
               WHERE renter=:renter";
               
                $params[":renter"]=$_GET['renter'];
             }
            
            
         if (filter_has_var(INPUT_GET, 'id')) 
             {
               
               $sql="SELECT booking.ID, brand, model, location, fuel_type, year, description, status, car.ID as car, users.email as owner,
               users.first_name || ' ' || users.last_name AS owner_name, renters.email as renter,
               renters.first_name || ' ' || renters.last_name AS renter_name, 
               pick_up_date, drop_off_date, image1, image2, image3, image4, image5
               FROM car 
               JOIN booking ON car.id=booking.car
               JOIN users ON users.id = car.owner
               JOIN users AS renters ON renters.email = booking.renter
               WHERE booking.ID=:id";
                
                 $params[":id"]=$_GET['id'];
              }

              if (filter_has_var(INPUT_GET, 'car_id')) 
              {
                
               $sql="SELECT booking.ID, brand, model, location, fuel_type, year, description, status, car.ID as car, users.email as owner,
               users.first_name || ' ' || users.last_name AS owner_name, renters.email as renter,
               renters.first_name || ' ' || renters.last_name AS renter_name, 
               pick_up_date, drop_off_date, image1, image2, image3, image4, image5
               FROM car 
               JOIN booking ON car.id=booking.car
               JOIN users ON users.id = car.owner
               JOIN users AS renters ON renters.email = booking.renter
               WHERE car.ID=:id";
                 
                  $params[":id"]=$_GET['car_id'];
               }

               if (filter_has_var(INPUT_GET, 'location')) 
               {
                 
                  $sql="SELECT booking.ID, brand, model, location, fuel_type, year, description, status, car.ID as car, users.email as owner,
                  users.first_name || ' ' || users.last_name AS owner_name, renters.email as renter,
                  renters.first_name || ' ' || renters.last_name AS renter_name, 
                  pick_up_date, drop_off_date, image1, image2, image3, image4, image5
                  FROM car 
                  JOIN booking ON car.id=booking.car
                  JOIN users ON users.id = car.owner
                  JOIN users AS renters ON renters.email = booking.renter
                  WHERE car.location=:location";
                  
                   $params[":location"]=$_GET['location'];
                }
             
        $this->setSQL($sql);
        $this->setSQLParams($params);

            }
  
}