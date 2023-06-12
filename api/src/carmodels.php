<?php

/**
 * Authors endpoint 
 * 
 * Query the database in order to retrieve information about all available car brands and models 
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class CarModels extends Endpoint
{
     
    protected function initialiseSQL() {

        $sql="SELECT model, new_car.brand 
              FROM new_car_models
              JOIN new_car ON new_car.ID=new_car_models.brand_reference";

        
        $params=[];
             
        $this->setSQL($sql);
        $this->setSQLParams($params);

            }
  
}