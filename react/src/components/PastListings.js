import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpcomingListing.css'; // import your own CSS styles
import Modal from 'react-modal';
import close from './close2.png';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PastListings() {

    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const [userReviews, setUserReviews] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);


    Modal.setAppElement('#root'); // Set the app element for accessibility
    const [isConfirmDeleteBookingModalOpen, setIsConfirmDeleteBookingModalOpen] = useState(false);
    const [deleteBookingConfirmed, setDeleteBookingConfirmed] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    const handleReview = (event) => {
        setMessage(event.target.value);
      }

      const submitReview = (renter, bookingID) => {
        const formData = new FormData();
        formData.append('renter', renter);
        formData.append('owner', localStorage.getItem('username'));
        formData.append('message', message);
        formData.append('booking', bookingID);
        fetch("https://razwebdev.com/p2pcarsharing/api/insertUserReview",
          {
            method: 'POST',
            body: formData
          })
          .then(
            (response) => response.text()
          )
          .then(
            (json) => {
              console.log(json)
            })
          .catch(
            (e) => {
              console.log(e.message)
            })
        setSelectedBookingId(null);
        window.location.reload();
      }

    useEffect(() => {

        fetch('https://razwebdev.com/p2pcarsharing/api/booking')
            .then((response) => response.json())
            .then((json) => {
                setBookings(json.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
            });

            fetch('https://razwebdev.com/p2pcarsharing/api/userReviews')
            .then((response) => response.json())
            .then((json) => {
              setUserReviews(json.data);
            })
            .catch((err) => {
              console.log(err.message);
            });
    }, []);

    const pastBookings = bookings.filter((booking) => {
        const dropOffDate = new Date(booking.drop_off_date);
        const today = new Date();
        return dropOffDate < today && booking.owner===localStorage.getItem('username');
      });

      const filteredUserReviews = userReviews.filter(review => review.owner === localStorage.getItem('username'));


      const displayPastBookings = pastBookings.map((booking, index) => {
        // filter the userReviews to get the review for the current booking and renter
        const renterReview = filteredUserReviews.find(
          (review) => review.renter === booking.renter && review.booking === booking.ID
        );
    
        return (
          <div key={index} value={booking.ID} style={{ position: 'relative', margin:'0 auto', width:'1200px' }}>
            <div className='bookings-section' >
              <div>
                <img className='booking-car-img' src={booking.image1} alt="1Profile Picture" />
              </div>
    
              <div style={{ cursor: 'default', marginTop: '50px' }} >
                {booking.pick_up_date.slice(3, 15)} - {booking.drop_off_date.slice(3, 15)} <br /> <br />
                Booked by {booking.renter_name}
              </div>
    
              {renterReview ? (
                <div className='review-div-listing'>
                  <p><strong>Your Review for driver</strong></p>
                  <div>{renterReview.message}</div>
                </div>
              ) : (
                <p
                  style={{ marginRight: '30px', cursor: 'pointer', marginTop: '55px' }}
                  onClick={() => setSelectedBookingId(booking.ID)}
                >
                  Leave Review for Driver
                </p>
              )}
            </div>
            {selectedBookingId === booking.ID && (
              <div>
                <div className='leave-review-form' style={{ zIndex: '2' }}>
                  <img src={close} alt="Logo"
                    style={{ width: '35px', position: 'absolute', right: 10, top: 10, cursor: 'pointer', border: '1px solid black' }}
                    onClick={() => setSelectedBookingId(null)} />
    
                  <h2 style={{ position: 'absolute', right: 200, top: 20 }}>Review Driver {booking.renter_name}</h2>
                  <textarea
                    style={{ fontSize: '20px', lineHeight: '1', resize: 'none', fontFamily: "'Open Sans', sans-serif" }} rows="7" cols="50"
                    onChange={handleReview} />
    
                  <button type="button" className='upload-licence-button' onClick={() => submitReview(booking.renter, booking.ID)}
                    style={{ position: 'absolute', right: 300, bottom: 25, width: '160px' }}>Submit</button>
    
                </div>
              </div>
            )}
          </div>
        )
      });

    return (
        <div>
           {loading && <FontAwesomeIcon icon={faSpinner}
          spin size="10x" color="#5692F5" style={{ margin: '0 auto', marginTop: "120px" }} />}
            
            {!loading && displayPastBookings.length ===0 &&
            <h1 style={{ marginTop: '220px' }}>Nobody has booked your cars in the past</h1>}
            {!loading && displayPastBookings.length !==0 &&
            <div>
            <h1 style={{ marginBottom: '70px' }}>Your cars that have been booked in the past</h1>
            {displayPastBookings}
            </div>}
        </div>
    );
}

export default PastListings;
