<?php

/**
 * Update description endpoint
 *  
 * Update description of a listing
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class UpdateDescription extends Endpoint
{
     
    protected function initialiseSQL() {
        $sql="UPDATE car 
        SET description = :description
        WHERE ID = :ID"; 
        $params=[];
            
        $this->setSQL($sql);
        $this -> setSQLParams([
        'description'=> $_POST['description'],
        'ID'=> $_POST['ID']]);
            }
  
}