/**
 * App component
 * 
 * Fetch all papers from the API and define the routes of the application
 * 
 * @author Razvan Cristian Pintea w20018875
 */


import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from './components/HomePage.js';
import SearchCars from './components/SearchCars';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import SelectedCar from './components/SelectedCar';
import Booking from './components/Booking';
import Messages from './components/Messages';
import Favourites from './components/Favourites';
import SelectedBooking from './components/SelectedBooking';
import SelectedCarFavourites from './components/SelectedCarFavourites';
import SelectedCarHome from './components/SelectedCarHome';
import HostMenu from './components/HostMenu';
import React, { useState, useEffect } from 'react';
import AddListing from './components/AddListing';
import SelectedListing from './components/SelectedListing';
import ReviewsByYou from './components/ReviewsByYou';
import ReviewsForYou from './components/ReviewsForYou';
import DriverDetails from './components/DriverDetails';
import UpcomingListing from './components/UpcomingListing';
import PastListing from './components/PastListings';
import Chat from './components/Chat';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState('');


  const handleAuthenticated = (isAuthenticated) => {setAuthenticated(isAuthenticated)}

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage authenticated={authenticated}/>} />
        <Route path="/search/:city/:start/:end/:user" element={<SearchCars />} />
        <Route path="/selected/:car/:start/:end/:owner" element={<SelectedCar />} />
        <Route path="/selectedBooking/:bookingID/:time" element={<SelectedBooking />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:user1Params/:user2Params/:paramsUser" element={<Messages />} />
        <Route path="/hostMenu" element={<HostMenu />} />
        <Route path="/addListing" element={<AddListing />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/selectedSecond/:homeCarId/home" element={<SelectedCarHome />} />
        <Route path="/selectedSecond/:favouriteCarId/favourites/:favouriteID" element={<SelectedCarFavourites />} />
        <Route path="/selectedListing/:listingID" element={<SelectedListing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login/:status/:car/:start/:end/:owner" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
        <Route path="/login" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
        <Route path="/loginFromHome/:car/:start/:end/:owner" element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated}/>} />
        <Route path="/upcomingListings" element={<UpcomingListing />} />
        <Route path="/pastListings" element={<PastListing />} />
        <Route path="/reviewsByYou" element={<ReviewsByYou />} />
        <Route path="/reviewsForYou" element={<ReviewsForYou />} />
        <Route path="/driverDetails/:driver" element={<DriverDetails />} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    {/* <div className='footer' style={{height:'400px', backgroundColor:'#5692F5', marginTop:'200px'}}>
    CONTACT SUPPORT 
    </div> */}
    </div>
  );
}


export default App;