<?php

/**
 * Authors endpoint 
 * 
 * Update the time of the last interaction of a conversation
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class UpdateChatRoom extends Endpoint
{
     
    protected function initialiseSQL() {
        $sql="UPDATE chat 
        SET updated_at = :updated_at
        WHERE (sender_email = :user1 AND receiver_email = :user2) OR (sender_email = :user2 AND receiver_email = :user1);"; 
        $params=[];
            
        $this->setSQL($sql);
        $this -> setSQLParams([
        'user1'=> $_POST['user1'],
        'user2'=> $_POST['user2'],
        'updated_at'=> $_POST['updated_at']]);
            }
  
}