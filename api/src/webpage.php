<?php

/**
 * Build basic web pages using Object Oriented Programming 
 * 
 * @author Razvan Cristian Pintea w20018875
 */

class Webpage 
{
    private $head = null;
    private $foot = null;
    private $body = null;
    
    
    public function __construct($title, $heading){
        $this->setHead($title);
        $this->addHeading1($heading);
        $this->setFoot();
        }
    
    public function setHead($title){
    $this->head=<<<EOT
<!DOCTYPE html>
<html lang="en-gb">
<head>
    <title>$title</title>
    <meta charset="utf-8">
</head>
<body>
EOT;
    }


    private function getHead(){
        return $this->head;
    }   

    protected function setBody($text){
        $this->body.= $text;  
    }

    private function getBody(){
        return $this->body;
    }

    protected function setFoot(){
        $this->foot=<<<EOT
</body>
</html>
EOT;
    }

    private function getFoot(){
        return $this->foot;
    }

    public function addHeading1($text){
        $this->setBody("<h1>$text</h1>");
    }

    public function addHeading2($text){
        $this->setBody("<h2>$text</h2>");
    }

    public function addHeading3($text){
        $this->setBody("<h3>$text</h3>");
    }

    public function addHeading4($text){
        $this->setBody("<h4>$text</h4>");
    }

    public function addParagraph($text){
         $this->setBody("<p>$text</p>");
    }

    public function generateWebpage(){
        return $this->head . $this->body . $this->foot;
    }
}
