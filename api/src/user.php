<?php

/**
 * Authors endpoint 
 * 
 * Query the database in order to retrieve information about users 
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class User extends Endpoint
{
     
    protected function initialiseSQL() {

        $sql="SELECT * FROM USERS";
        $params=[];

       if (filter_has_var(INPUT_GET, 'email')) 
            {
              
            $sql="SELECT * FROM USERS
            WHERE email= :email";
               
                $params[":email"]=$_GET['email'];
             }
             
        $this->setSQL($sql);
        $this->setSQLParams($params);

            }
  
}