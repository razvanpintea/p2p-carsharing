<?php

/**
 * Authors endpoint 
 * 
 * For notification purposes, update the receiver_newmsg attribute 
 * of a user to represent that he has received a new message
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class UpdateChatRoomNewMessageReceiver extends Endpoint
{
     
    protected function initialiseSQL() {
        $sql="UPDATE chat 
        SET receiver_newmsg = :updateMessage
        WHERE (sender_email = :updateUser1 AND receiver_email = :updateUser2) OR (sender_email = :updateUser2 AND receiver_email = :updateUser1);"; 
        $params=[];
            
        $this->setSQL($sql);
        $this -> setSQLParams([
        'updateUser1'=> $_POST['updateUser1'],
        'updateUser2'=> $_POST['updateUser2'],
        'updateMessage'=> $_POST['updateMessage']]);
            }
  
}