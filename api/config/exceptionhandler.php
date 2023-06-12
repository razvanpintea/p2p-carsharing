<?php
/**
 * Exception Handler
 * 
 * Retrieves caught exceptions and writes them to the exceptions.txt file in the config folder
 * 
 * Throws a 500 HTTP response code
 * 
 * @author Razvan Cristian Pintea w20018875
 */

function exceptionHandler($e){
    http_response_code(500);
    $output['message'] = $e->getMessage();
    $file=fopen("config/exceptions.txt","ab");
    fwrite($file, $e->getMessage().PHP_EOL);
    fclose($file);
    $output['message'] = "Sorry, an error has occured";
    $output['error'] = $e->getMessage();
    die(json_encode($output));
}