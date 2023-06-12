<?php

/**
 * Authors endpoint 
 * 
 * Endpoint for adding a new conversation based on the parameters received via POST
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class InsertChatRoom extends Endpoint
{
     
    protected function initialiseSQL() {
        $current_datetime = date('Y-m-d H:i:s');
        $sql="INSERT INTO chat (sender_email, receiver_email, sender_name, receiver_name, sender_profile, receiver_profile, updated_at) 
        VALUES (:sender_email, :receiver_email, :sender_name, :receiver_name, :sender_profile,  :receiver_profile, :updated_at)"; 
        $params=[];
            
        $this->setSQL($sql);
        $this -> setSQLParams(['sender_email'=> $_POST['sender_email'], 
        'receiver_email'=> $_POST['receiver_email'],
        'sender_name'=> $_POST['sender_name'],
        'receiver_name'=> $_POST['receiver_name'],
        'sender_profile'=> $_POST['sender_profile'],
        'receiver_profile'=> $_POST['receiver_profile'],
        'updated_at'=> $current_datetime]);
            }
  
}