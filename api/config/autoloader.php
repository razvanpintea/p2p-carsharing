<?php
/**
 * Default Autoloader
 * 
 * @author Razvan Cristian Pintea w20018875
 */

function autoloader($className) {
    $filename = "src\\" . strtolower($className) . ".php";
    $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
    
    if (is_readable($filename)) {
        include_once $filename;
    } else {
        exit
        ("File not found: " . $className . " (" . $filename . ")");
    }
}
