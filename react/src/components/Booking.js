import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Booking.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Booking() {
  const [message, setMessage] = useState(["Not logged in"]);
  const [loggedInUser, setUser] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleClickFuture = (bookingID) => {
    navigate(`/selectedBooking/${bookingID}/future`);
  }
  const handleClickPast = (bookingID) => {
    navigate(`/selectedBooking/${bookingID}/past`);
  }

  useEffect(() => {
    if (localStorage.getItem('username')) {
      setUser(localStorage.getItem('username'));
    }
    fetch('https://razwebdev.com/p2pcarsharing/api/booking')
      .then((response) => response.json())
      .then((json) => {
        setBookings(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });

  }, []);



  const filteredBookings = bookings.filter(booking => booking.renter === loggedInUser);

  const futureBookings = filteredBookings.filter((booking) => {
    const dropOffDate = new Date(booking.drop_off_date);
    const today = new Date();
    return dropOffDate > today;
  });

  const pastBooking = filteredBookings.filter((booking) => {
    const dropOffDate = new Date(booking.drop_off_date);
    const today = new Date();
    return dropOffDate < today;
  });

  const displayFutureBookings = futureBookings.map((booking, index) => (
    <section
      key={index}
      value={booking.ID}
      className="bookings-info"
      onClick={() => handleClickFuture(booking.ID)}
    >
      <img className='booking-car-img' src={booking.image1} alt="1Profile Picture"
        style={{ width: '250px' }}
      />
      <div style={{ marginLeft: '50px' }}>
        <p><strong>{booking.brand} {booking.model}, {booking.year}</strong></p>

        <p>{booking.location}</p>
        <p>{booking.pick_up_date.slice(3, 15)} - {booking.drop_off_date.slice(3, 15)}</p>
        <p> Hosted by: {booking.owner_name}</p>
      </div >

    </section>
  ));

  const displayPastBooking = pastBooking.map((booking, index) => (
    <section
      key={index}
      value={booking.ID}
      className="bookings-info"
      onClick={() => handleClickPast(booking.ID)}
    >
      <img className='booking-car-img' src={booking.image1} alt="1Profile Picture"
        style={{ width: '250px' }}
      />
      <div style={{ marginLeft: '50px' }}>
        <p><strong>{booking.brand} {booking.model}, {booking.year}</strong></p>

        <p>{booking.location}</p>
        <p>{booking.pick_up_date.slice(3, 15)} - {booking.drop_off_date.slice(3, 15)}</p>
        <p> Hosted by: {booking.owner_name}</p>
      </div >
    </section>
  ));


  return (
    <div>
      {filteredBookings.length !==0 && <h1>Your bookings</h1>}
      {filteredBookings.length === 0 && !loading && <h1 style={{marginTop:'250px', margin:'0 auto'}}>You currently have no bookings</h1>}
      {loading && <FontAwesomeIcon icon={faSpinner}
          spin size="10x" color="#5692F5" style={{ margin: '0 auto', marginTop: "120px" }} />}
      <div className='return-bookings'>
        {displayFutureBookings.length !== 0 && !loading && <h2 style={{ textAlign: 'left', marginTop: '50px' }}>Upcoming Bookings</h2>}
        {filteredBookings.length !== 0 && !loading && displayFutureBookings}
        {displayPastBooking.length !== 0 && !loading && <h2 style={{ textAlign: 'left', marginTop: '50px' }}>Past Bookings</h2>}
        {filteredBookings.length !== 0 && !loading && displayPastBooking}
      </div>

    </div>
  );
}

export default Booking;
