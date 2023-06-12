<?php

/* Scan Images
 * 
 * Scan selfie and driving licence to check for simmilarity and legitimacy
 * 
 * @author idanalyzer.com 
 *  with slight changes made by Razvan Cristian Pintea w20018875
 */

require("./analyzer/CoreAPI.php");
use IDAnalyzer\CoreAPI;
class Scan extends Endpoint {
    public function __construct() {

        $coreapi = new CoreAPI("YltJBHtlezM7BvdxdJIqjkAJ6EUh9iFe", "EU");
        $coreapi->enableAuthentication(true, '2');
        $coreapi->verifyExpiry(true);
        $coreapi->throwAPIException(true);

        $image = $_FILES['image'];
        $filename = $image['name'];
        $tmp_name = $image['tmp_name'];

        $image2 = $_FILES['image2'];
        $filename2 = $image2['name'];
        $tmp_name2 = $image2['tmp_name'];

        $data = array(); // Create an empty array to store the response data

        try {
            //...
            $result = $coreapi->scan($tmp_name,"", $tmp_name2);
            $data_result = $result['result'];
            $authentication_result = $result['authentication'];
            $face_result = $result['face'];

            // Add response data to the array
            $data['name'] = "{$data_result['firstName']} {$data_result['lastName']}";
            if ($authentication_result) {
                $data['authentic'] = ($authentication_result['score'] > 0.5);
            }
            if ($face_result) {
                $data['identical'] = ($face_result['isIdentical'] === true);
                $data['similarity_score'] = $face_result['confidence'];
            }

        } catch (\IDAnalyzer\APIException $ex) {
            $data['error'] = array(
                'code' => $ex->getCode(),
                'message' => $ex->getMessage()
            );
        } catch (InvalidArgumentException $ex) {
            $data['error'] = array(
                'code' => -1,
                'message' => $ex->getMessage()
            );
        } catch (Exception $ex) {
            $data['error'] = array(
                'code' => -1,
                'message' => $ex->getMessage()
            );
        }
        
        $this->setData($data);
        // Convert the response data to JSON format
        // $json = json_encode($data);

        // Set the HTTP response headers
        // header('Content-Type: application/json');
        // header('Content-Length: ' . strlen($json));

        // Send the response data to the client
        // echo $json;
    }
}
