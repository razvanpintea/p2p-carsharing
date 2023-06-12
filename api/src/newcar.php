<?php

/**
 * Authors endpoint 
 * 
 * Query the database in order to retrieve information about all available car brands and models 
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class NewCar extends Endpoint
{
     
    protected function initialiseSQL() {

        $sql="SELECT * from new_car
              ORDER BY brand";
        
        $params=[];
             
        $this->setSQL($sql);
        $this->setSQLParams($params);

            }
  
}