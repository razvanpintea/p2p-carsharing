<?php

/**
 * Authors endpoint 
 * 
 * Query the database in order to retrieve all the conversations between users
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class ChatRoom extends Endpoint
{
     
    protected function initialiseSQL() {

        $sql = "SELECT * FROM chat ORDER BY updated_at DESC";
        $params=[];
             
        $this->setSQL($sql);
        $this->setSQLParams($params);

            }
  
}