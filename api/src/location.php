<?php

/**
 * Authors endpoint 
 * 
 * Query the database in order to retrieve all the cities 
 * from the "city" database table 
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class Location extends Endpoint
{
     
    protected function initialiseSQL() {

        $sql="SELECT * from city
              ORDER BY name";
        
        $params=[];
             
        $this->setSQL($sql);
        $this->setSQLParams($params);

            }
  
}