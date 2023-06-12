<?php

/**
 *Documentation endpoint 
 * 
 * @author Razvan Cristian Pintea w20018875
 */

include 'config/autoloader.php';
spl_autoload_register('autoloader');

include 'config/errorhandler.php';
set_error_handler('errorHandler');

include 'config/exceptionhandler.php';
set_exception_handler('exceptionHandler');


$title="API Documentation";
$heading="API Documentation";
$documentation =new Webpage($title,$heading);

$documentation->addParagraph("Name: Razvan Cristian Pintea");
$documentation->addParagraph("Module: KV6013 Individual Project");
$documentation->addParagraph("Student ID: 20018875");

$documentation->addHeading2("API Endpoints");
$documentation->addHeading2("Endpoints that fetch data");
$documentation->addHeading4("1. Base Endpoint");
$documentation->addParagraph("This Endpoint only allows POST or GET requests and displays information about the author of the API and some details about the KV6013 module of Northumbria University ");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/</a>");


$documentation->addHeading4("2. Booking Endpoint");
$documentation->addParagraph("The Booking Endpoints allow GET requests to retrieve all the bookings made in the system.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/booking'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/api/booking</a>");
$documentation->addParagraph("The booking Endpoint accepts a 'renter' parameter. For example, adding renter=razvan.pintea6@gmail.com as a parameter, would display all the bookings that have been made by the user with the unique identifier email razvan.pintea6@gmail.com.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/booking?renter=razvan.pintea6@gmail.com'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/booking?renter=razvan.pintea6@gmail.com</a>");
$documentation->addParagraph("The booking Endpoint accepts an 'id' parameter. For example, adding id=47 as a parameter, would retrieve the booking with the id=47.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/booking?id=57'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/booking?id=47</a>");
$documentation->addParagraph("The booking Endpoint accepts a 'car_id' parameter. For example, adding car_id=3 as a parameter, would retrieve all the bookings where the id of the car associated with the booking is 3.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/booking?car_id=3'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/booking?car_id=3</a>");
$documentation->addParagraph("The booking Endpoint accepts a 'location' parameter. For example, adding location=London as a parameter, would retrieve all the bookings where the location of the car is London.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/booking?location=London'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/booking?location=London</a>");

$documentation->addHeading4("3. Listings Endpoint");
$documentation->addParagraph("The Listings Endpoints allow GET requests to retrieve all the cars updated by users in the system.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/listings'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/api/listings</a>");
$documentation->addParagraph("The Listings Endpoint accepts an 'exception' parameter. For example, adding exception=razvan.pintea6@gmail.com as a parameter, would retrieve all the
 listings which do not belong to the user with the unique identifier email razvan.pintea6@gmail.com.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/listings?exception=razvan.pintea6@gmail.com'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/listings?exception=razvan.pintea6@gmail.com</a>");
$documentation->addParagraph("The booking Endpoint accepts a 'city' parameter. For example, adding city=Aberdeen as a parameter, would retrieve all of the listings available in Aberdeen");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/listings?city=Aberdeen'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/listings?city=Aberdeen</a>");
$documentation->addParagraph("The booking Endpoint accepts a 'random' parameter. For example, adding random=true as a parameter, would retrieve all the listings available but in a randomised order.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/listings?random=true'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/listings?random=true</a>");


$documentation->addHeading4("4. Users Endpoint");
$documentation->addParagraph("The Users Endpoints allow GET requests to retrieve all the users of the system.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/users'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/users</a>");

$documentation->addHeading4("5. Location Endpoint");
$documentation->addParagraph("The Location Endpoints allow GET requests to retrieve all the cities in the United Kingdom that are stored in the database.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/location'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/location</a>");

$documentation->addHeading4("6. CarModels Endpoint");
$documentation->addParagraph("The CarModels Endpoints allow GET requests to retrieve a wide range of brands and models of cars that are stored in the database.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/carModels'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/carModels</a>");

$documentation->addHeading4("7. ChatRoom Endpoint");
$documentation->addParagraph("The ChatRoom Endpoints allow GET requests to retrieve all the conversations between users that exist on the website.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/chatRoom'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/chatRoom</a>");

$documentation->addHeading4("8. Reviews Endpoint");
$documentation->addParagraph("The Reviews Endpoints allow GET requests to retrieve all the reviews that users left for their past bookings.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/review'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/review</a>");
$documentation->addParagraph("The Reviews Endpoint accepts a 'car_id' parameter. For example, adding car_id=8 as a parameter, would retrieve all the reviews of the car with the id of 8.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/review?car_id=8'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/review?car_id=8</a>");
$documentation->addParagraph("The Reviews Endpoint also accepts a 'renter' parameter on top of the 'car_id' parameter. For example, adding car_id=8&renter=razvan.pintea6@gmail.com as parameters,
 would retrieve all the reviews of the car with the id of 8 that have been made by razvan.pintea6@gmail.com.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/review?car_id=8&renter=razvan.pintea6@gmail.com'>
http://unn-w20018875.newnumyspace.co.uk/year3/diss/review?car_id=8&renter=razvan.pintea6@gmail.com</a>");

$documentation->addHeading4("9. UserReviews Endpoint");
$documentation->addParagraph("The UserReviews Endpoints allows GET requests to retrieve all the reviews that hosts left for the drivers that booked their car(s).");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/userReview'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/userReview</a>");
$documentation->addParagraph("The UserReviews Endpoint  accepts a 'renter' parameter on top of the 'owner' parameter, on top of the 'listing' parameter. 
For example, adding listing=8&renter=razvan.pintea6@gmail.com&owner=hostone@gmail.com as parameters,
 would retrieve the review of the user razvan.pintea6@gmail.com that has been made by hostone@gmail.com, but just for the listing with the id specified in the 
 'listing' parameter.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/review?listing=8&renter=razvan.pintea6@gmail.com&owner=hostone@gmail.com'>
http://unn-w20018875.newnumyspace.co.uk/year3/diss/review?listing=8&renter=razvan.pintea6@gmail.com&owner=hostone@gmail.com</a>");

$documentation->addHeading4("10. Favourites Endpoint");
$documentation->addParagraph("The Favourites Endpoint allows GET requests to retrieve all the cars that have been marked as favourites by users.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/favourites'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/favourites</a>");
$documentation->addParagraph("The UserReviews Endpoint  accepts a 'car_id' parameter on top of the 'renter' parameter.
For example, adding car_id=8&renter=razvan.pintea6@gmail.com as parameters,
 would retrieve the only the entry where the car id is 8 and the user that added it to favourites is razvan.pintea6@gmail.com.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/favourites?car_id=8&renter=razvan.pintea6@gmail.com'>
http://unn-w20018875.newnumyspace.co.uk/year3/diss/favourites?car_id=8&renter=razvan.pintea6@gmail.com</a>");

$documentation->addHeading4("11. UserCanceledBookings Endpoint");
$documentation->addParagraph("The UserCanceledBookings Endpoints allows GET requests to retrieve all the bookings that have been canceled by hosts.");
$documentation->addParagraph("<a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/userCanceledBookings'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/userCanceledBookings</a><br></br><br></br>");

$documentation->addHeading2("Endpoints that manipulate data");
$documentation->addHeading4("1. Authentification Endpoint");
$documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/auth");
$documentation->addParagraph("This endpoint only allows POST requests, and it accepts two authentication headers, a username and a password, 
which are compared with details from a database. If the username and passord match the ones from the database, the endpoint generates a valid JWT (Jason Web Token).
 If details are wrong or left empty, appropiate messages are returned instead.");

$documentation->addHeading4("2. DeleteBooking Endpoint");
$documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/deleteBooking");
$documentation->addParagraph("This endpoint only allows POST requests, and it accepts an 'id' parameter which is used to identify the booking to be deleted.");

$documentation->addHeading4("3. DeleteFavourite Endpoint");
$documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/deleteFavourite");
$documentation->addParagraph("This endpoint only allows POST requests, and it accepts an 'id' parameter which is used to identify the car to be removed from the favourites list.");

$documentation->addHeading4("4. DeleteListing Endpoint");
$documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/deleteListing");
$documentation->addParagraph("This endpoint only allows POST requests, and it accepts an 'id' parameter which is used to identify the car to be removed from the system.");
$documentation->addParagraph("This endpoint also accepts 8 additional parameters representing characteristics of the listing, in order to identify the directory on the server that
holds the listing's pictures, and delete it.");

$documentation->addHeading4("5. InsertListing Endpoint");
$documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/insertListing");
$documentation->addParagraph("This endpoint only allows POST requests, and it accepts 13  parameters representing characteristics of the listing, such as: brand, model, year, description, price, location, 
fuel_type, owner, and 5 images, in order to insert the entry in the database and create a directory on the server to store the listing's pictures.");

$documentation->addHeading4("6. InsertChatRoom Endpoint");
$documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/insertChatroom");
$documentation->addParagraph("This endpoint only allows POST requests, and it accepts 7  parameters representing characteristics of the users, such as: 
 email, name and profile picture, in order to create a chat room (conversation) between the two users.");
 $documentation->addParagraph("This endpoint also accept an 'updated_at' parameter which is given the value of the current date and time of triggering the endpoint.");

 $documentation->addHeading4("7. InsertReview Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/insertReview");
 $documentation->addParagraph("This endpoint only allows POST requests, and it accepts 3  parameters, 'renter', 'car', and 'message', which represent the email of the user that 
 submitted the review, the id of the car associated with the booking that has been reviewed, and the actual text message of the review.");

 $documentation->addHeading4("8. InsertUserReview Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/insertUserreview");
 $documentation->addParagraph("This endpoint only allows POST requests, and it accepts 4  parameters, 'owner', 'car','message' and 'booking' which represent the email of the user that 
 submitted the review for another user, the id of the car associated with the booking that has been reviewed, the actual text message of the review, and the booking id.");

 $documentation->addHeading4("9. InsertFavourite Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/insertFavourite");
 $documentation->addParagraph("This endpoint only allows POST requests, and it accepts 2  parameters, 'renter' and 'car', which represent the email of the user that added
 the car to favourites, and the id of the car.");
 
 $documentation->addHeading4("10. InsertBooking Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/insertBooking");
 $documentation->addParagraph("This endpoint only allows POST requests, and it accepts 4 parameters, 'renter', 'pick_up_date', 'drop_off_date' and 'car', which represent the email of the user that added
 the car to favourites, the pick up and the drop off dates, and the id of the car.");

 $documentation->addHeading4("11. Register Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/register");
 $documentation->addParagraph("This endpoint only allows POST requests, and it accepts 5 parameters, 'first_name', 'last_name', 'phone', 'email' and 'password', 
 which serves the purpose to insert in the database a new user with these details.");
 $documentation->addParagraph("The endpoint also creates a unique directory on the server to store the profile picture of the user."); 

 $documentation->addHeading4("12. RemoveCanceledBookings Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/removeCanceledbookings");
 $documentation->addParagraph("This endpoint only allows POST requests, and it accepts 1 parameter in order to identify the user whose
 canceled bookings must be deleted, for notification purposes.");

 $documentation->addHeading4("13. Scan Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/scan");
 $documentation->addParagraph("This endpoint only allows POST requests, and it accepts 2 parameters, which should represent a picture
 of a user and a picture of the driving licence of the same user. The endpoint uses the Core API scanning function provided by
 'idanalyzer.com', which checks the legitimacy of the driving licence and measures the simmilarity between the pictures.");

 $documentation->addHeading4("14. UpdateBookingsStatus Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/updateBookingsStatus");
 $documentation->addParagraph("This endpoint only allows POST requests, and it accepts 1 parameter, the ID of the booking which
 should get its status set to 'seen' from 'unseen', for notification purposes.");

 $documentation->addHeading4("15. UpdateCanceledBookingsStatus Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/updateCanceledBookingsStatus");
 $documentation->addParagraph("This endpoint only allows POST requests, and it accepts 2 parameter, the ID of a booking and the 
 unique identifier of a the driver whose booking has been cancelled. Once triggered, the endpoint registers the booking of the
 specified driver as cancelled, which is further used for notification purposes.");

 $documentation->addHeading4("16. UpdateChatRoom Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/updateChatroom");
 $documentation->addParagraph("This endpoint only allows POST requests, and it accepts 3 parameters: 2 unique identifiers of two
 different users, and a current date and time. Once triggered, the endpoint updates the 'updatedAt' attribute of the conversation
 between the two users to the current date and time parameter that has been recieved through the POST request");


 $documentation->addHeading4("17. UpdateChatRoomNewMessageReceiver and UpdateChatRoomNewMessageSender Endpoints");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/updateChatRoomNewMessageReceiver");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/updateChatRoomNewMessageSender");
 $documentation->addParagraph("These endpoint only allows POST requests and it serves the purpose to update the 'new_msg' attribute
 of either a sender or a receiver of a conversation, for notification purposes.");

 $documentation->addHeading4("18. UpdateDescription Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/updateDescription");
 $documentation->addParagraph("This endpoint only allows POST requests and it accepts 2 parameters, 'car_id' and 'description',
 and it serves the purpose to update the description of a listing based on the parameteres received through the POST request");

 $documentation->addHeading4("19. UploadLicence Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/uploadLicence");
 $documentation->addParagraph("This endpoint only allows POST requests and it accepts 2 parameters: a unique identifier of a user 
 and an image representing the driving licence of the user. Once triggered, the endpoint saves the image of the licence on the server,
 in the unique directory of the user");

 $documentation->addHeading4("20. UploadProfilePicture Endpoint");
 $documentation->addParagraph("http://unn-w20018875.newnumyspace.co.uk/year3/diss/uploadProfilePicture");
 $documentation->addParagraph("This endpoint only allows POST requests and it accepts 2 parameters: a unique identifier of a user 
 and an image representing the profile picture of the user. Once triggered, the endpoint saves the image of the user on the server,
 in the unique directory of the user<br></br><br></br>");

 $documentation->addHeading2("Invalid Endpoints");
 $documentation->addParagraph("If requests are going to be made to other endpoints, users will be displayed with a ''path not found/'path' '' message, and the page throws a 404 http response code."); 
 $documentation->addParagraph("An example of an invalid endpoint is: <a href='http://unn-w20018875.newnumyspace.co.uk/year3/diss/invalid'>http://unn-w20018875.newnumyspace.co.uk/year3/diss/invalid</a><br></br><br></br>"); 

 
 echo $documentation->generateWebpage();
