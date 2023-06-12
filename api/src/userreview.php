<?php

/**
 * Authors endpoint 
 * 
 * Query the database in order to retrieve reviews of users
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class UserReview extends Endpoint
{
     
    protected function initialiseSQL() {

        $sql="SELECT * FROM user_review";
        $params=[];   
      if (filter_has_var(INPUT_GET, 'owner') && filter_has_var(INPUT_GET, 'renter')&& filter_has_var(INPUT_GET, 'listing')) 
             {
                      
         $sql="SELECT message 
         FROM user_review
         WHERE owner = :owner AND renter=:renter AND listing=:listing";
                
                 $params[":owner"]=$_GET['owner'];
                 $params[":renter"]=$_GET['renter'];
                 $params[":listing"]=$_GET['listing'];
              }
             
        $this->setSQL($sql);
        $this->setSQLParams($params);

            }
  
}