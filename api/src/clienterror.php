<?php
 
/**
 * Class for handling client errors (400 responses)
 * 
 * @author Razvan Cristian Pintea w20018875
 */
class ClientError extends Endpoint
{
    /**
     * Override the constructor because we do
     * not need to query the database for this 
     * endpoint.
     * 
     * @param String $message      A message explaining the error
     * @param Int $code      the relevant http status code
     */
    public function __construct($message, $code) {
        http_response_code($code);
 

        $this->setData( array(
            "length" => 0,
            "message" => $message,
            "data" => null
        ));
    }
}