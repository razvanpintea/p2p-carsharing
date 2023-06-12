<?php

/**
 * Main endpoint router for the application API.
 *
 * The API allows users to register and authenticate, view and add car listings, 
 * make and delete bookings, view and add reviews, add listings to their favourites, 
 * view car models, and more.
 * 
 * 
 * @author   Razvan Cristian Pintea 
 *           <razvan.pintea@northumbria.co.uk>
 *           w20018875
 */

// Set the Content-Type and Access-Control headers to allow requests from any origin
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: *");

// If the request method is OPTIONS, exit early and don't execute the script
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    exit(0);
} 

// Include autoloader, error and exception handlers
include 'config/autoloader.php';
spl_autoload_register('autoloader');

include 'config/errorhandler.php';
set_error_handler('errorHandler');

include 'config/exceptionhandler.php';
set_exception_handler('exceptionHandler');

// Define a constant for the secret used to sign JSON Web Tokens
define('SECRET', "HpEkSRsJhCcEl0uCA2vzxFbZxGQZZY7r");

// Create a new Request object from the current HTTP request
$request = new Request();

// Define an array of allowed HTTP request methods
$requestmethods = array(1 => "GET", 2 => "POST");

// Get the current request method
$method = $_SERVER['REQUEST_METHOD'];

// Validate that the current request method is allowed
$request->validateRequestMethod($method, $requestmethods);

// Switch between endpoints based on the current request's path
switch($request->getPath()) {
    case '/':
        $endpoint = new Base($request);
        break;
    case '/user/':
    case '/user':
    case '/users/':
    case '/users':
        $endpoint = new User($request);
        break;
    case '/listing/':
    case '/listing':
    case '/listings/':
    case '/listings':
    $endpoint = new Listing($request);
        break; 
    case '/booking/':
    case '/booking':
    case '/bookings/':
    case '/bookings':
    $endpoint = new Booking($request);
        break;
    case '/location/':
    case '/location':
    case '/locations/':
    case '/locations':
    $endpoint = new Location($request);
        break;   
    case '/newcar/':
    case '/newcar':
    $endpoint = new NewCar($request);
        break;        
    case '/favourite/':
    case '/favourite':
    case '/favourites/':
    case '/favourites':
    $endpoint = new Favourite($request);
        break;    
    case '/review/':
    case '/review':
    case '/reviews/':
    case '/reviews':
    $endpoint = new Review($request);
        break;
    case '/userReview/':
    case '/userReview':
    case '/userReviews/':
    case '/userReviews':
    $endpoint = new UserReview($request);
        break;             
    case '/auth':
    case '/auth/':
        $endpoint= new Authenticate($request);
        break;
    case '/update/':
    case '/update':
        $endpoint = new Update($request);
        break;
    case '/register/':
    case '/register':
        $endpoint = new Register($request);
        break;
    case '/insertBooking/':
    case '/insertBooking':
        $endpoint = new InsertBooking($request);
        break;    
    case '/deleteBooking/':
    case '/deleteBooking':
        $endpoint = new DeleteBooking($request);
        break; 
    case '/insertFavourites/':
    case '/insertFavourites':
        $endpoint = new InsertFavourites($request);
        break;  
    case '/deleteFavourite/':
    case '/deleteFavourite':
        $endpoint = new DeleteFavourite($request);
        break;
    case '/insertListing/':
    case '/insertListing':
        $endpoint = new InsertListing($request);
        break;
    case '/insertReview/':
    case '/insertReview':
        $endpoint = new InsertReview($request);
        break; 
    case '/insertUserReview/':
    case '/insertUserReview':
        $endpoint = new InsertUserReview($request);
        break; 
    case '/deleteListing/':
    case '/deleteListing':
        $endpoint = new DeleteListing($request);
        break;  
    case '/carModels/':
    case '/carModels':
        $endpoint = new CarModels($request);
        break;   
    case '/scan/':
    case '/scan':
        $endpoint = new Scan($request);
        break; 
    case '/uploadProfilePicture/':
    case '/uploadProfilePicture':
        $endpoint = new UploadProfilePicture($request);
        break;
    case '/uploadLicence/':
    case '/uploadLicence':
        $endpoint = new UploadLicence($request);
        break;
    case '/updateBookingsStatus/':
    case '/updateBookingsStatus':
        $endpoint = new UpdateBookingsStatus($request);
        break;
    case '/userCanceledBookings/':
    case '/userCanceledBookings':
        $endpoint = new UserCanceledBookings($request);
        break;
    case '/updateCanceledBookingsStatus/':
    case '/updateCanceledBookingsStatus':
        $endpoint = new UpdateCanceledBookingsStatus($request);
        break;       
    case '/removeCanceledBookings/':
    case '/removeCanceledBookings':
        $endpoint = new removeCanceledBookings($request);
        break; 
    case '/chatRoom/':
    case '/chatRoom':
        $endpoint = new ChatRoom($request);
        break;
    case '/insertChatRoom/':
    case '/insertChatRoom':
        $endpoint = new InsertChatRoom($request);
        break;
    case '/updateChatRoom/':
    case '/updateChatRoom':
        $endpoint = new UpdateChatRoom($request);
        break;
    case '/updateChatRoomNewMessageReceiver/':
    case '/updateChatRoomNewMessageReceiver':
        $endpoint = new UpdateChatRoomNewMessageReceiver($request);
        break;
    case '/updateChatRoomNewMessageSender/':
    case '/updateChatRoomNewMessageSender':
         $endpoint = new UpdateChatRoomNewMessageSender($request);
        break;
    case '/updateDescription/':
    case '/updateDescription':
            $endpoint = new UpdateDescription($request);
        break;
    default:
        $path=$request->getPath();
        $endpoint = new ClientError("Path not found: " . $path, 404);
}
$data = $endpoint->getData();
//transform data received from endpoints to json
echo json_encode($data);