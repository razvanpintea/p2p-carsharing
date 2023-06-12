<?php
/**
 * Error Handler
 * 
 * Displays the caught errors in a certain way
 * 
 * Throws a 500 HTTP response code
 * 
 * @author Razvan Cristian Pintea w20018875
 */

function errorHandler($number, $message, $file, $line){
    http_response_code(500);
    $output['error']['number'] = $number;
    $output['error']['message'] = $message;
    $output['error']['file'] = $file;
    $output['error']['line'] = $line;
    echo json_encode($output);
    exit();
}