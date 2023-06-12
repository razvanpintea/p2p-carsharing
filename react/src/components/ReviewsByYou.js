import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './ReviewsByYou.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function ReviewsByYou() {


    const [reviews, setReviews] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);


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

        fetch('https://razwebdev.com/p2pcarsharing/api/review')
            .then((response) => response.json())
            .then((json) => {
                setReviews(json.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const filteredReviews = reviews.filter(review => review.renter_email === localStorage.getItem('username'));

    const bookingsWithReviews = bookings.filter(booking =>
        filteredReviews.some(review => review.car === booking.ID && review.renter_email === booking.renter)
    );

    const bookingReviews = bookingsWithReviews.map(booking => {
        const review = filteredReviews.find(review => review.car === booking.ID && review.renter_email === booking.renter);

        return (
            <div key={booking.ID} className='reviews-by-you-div' >
                <img src={booking.image1} alt="1Profile Picture" className='review-image' style={{height:'185px'}}
                />
                <div style={{marginLeft:'30px'}}>
                    <h3>{booking.brand} {booking.model}, {booking.year}</h3>
                    <p>{booking.location}</p>
                    <p>{booking.pick_up_date.slice(3, 16)}-{booking.drop_off_date.slice(3, 16)}</p>
                    <p>Hosted by: {booking.owner_name}</p>
                </div>
                <div className='review-div'>
                    <p><strong>Your Review</strong></p>
                    <p> {review.message}</p>
                </div>

            </div>
        );
    });

    return (
        <div>
            {loading && <FontAwesomeIcon icon={faSpinner}
          spin size="10x" color="#5692F5" style={{ margin: '0 auto', marginTop: "120px" }} />}
            {!loading && bookingReviews.length ===0 && <h1 style={{marginTop:'220px'}}>You haven't left any reviews yet</h1>}
            {!loading && bookingReviews.length !==0 && 
            <div>
            <h1 style={{marginBottom:'60px'}}>You left {bookingsWithReviews.length} reviews </h1>
            {bookingReviews}
            </div>}
        </div>
    );
}

export default (ReviewsByYou);
