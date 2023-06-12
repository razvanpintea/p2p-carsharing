<?php

/**
 * Authors endpoint 
 * 
 * Query the database in order to retrieve information about canceled bookings of users
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class UserCanceledBookings extends Endpoint
{
     
    protected function initialiseSQL() {

        $sql="SELECT * FROM canceled_bookings";
        $params=[];
             
        $this->setSQL($sql);
        $this->setSQLParams($params);

            }
  
}