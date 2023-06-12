<?php

/**
 * Authors endpoint 
 * 
 * For notification purposes, update the sender_newmsg attribute 
 * of a user to represent that he has received a new message
 *  
 * @author Razvan Cristian Pintea w20018875
 */

class UpdateChatRoomNewMessageSender extends Endpoint
{
     
    protected function initialiseSQL() {
        $sql="UPDATE chat 
        SET sender_newmsg = :updateMessage
        WHERE (sender_email = :updateUser1 AND receiver_email = :updateUser2) OR (sender_email = :updateUser2 AND receiver_email = :updateUser1);"; 
        $params=[];
            
        $this->setSQL($sql);
        $this -> setSQLParams([
        'updateUser2'=> $_POST['updateUser2'],
        'updateUser1'=> $_POST['updateUser1'],
        'updateMessage'=> $_POST['updateMessage']]);
            }
  
}