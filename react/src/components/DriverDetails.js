import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import profile from './profile2.png';
import './DriverDetails.css';



function DriverDetails() {

    const [reviews, setReviews] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [firstName, SetFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [picturePath, setPicturePath] = useState('');
    const { driver } = useParams();



    useEffect(() => {

        fetch('https://razwebdev.com/p2pcarsharing/api/booking')
            .then((response) => response.json())
            .then((json) => {
                setBookings(json.data);
            })
            .catch((err) => {
                console.log(err.message);
            });

        fetch('https://razwebdev.com/p2pcarsharing/api/userReviews')
            .then((response) => response.json())
            .then((json) => {
                setReviews(json.data);
            })
            .catch((err) => {
                console.log(err.message);
            });

        fetch('https://razwebdev.com/p2pcarsharing/api/users?email=' + driver)
            .then((response) => response.json())
            .then((json) => {
                setLastName(json.data[0].last_name);
                SetFirstName(json.data[0].first_name);
                setPhone(json.data[0].phone);
                setPicturePath(json.data[0].profile + '?timestamp=' + Date.now());
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const filteredReviews = reviews.filter(review => review.renter === driver);
    const displayReviews = filteredReviews.map(review => {
        return (
            <div key={review.ID} className='reviews-fors-you-div' >
                <div className='driver-reviews-div'>
                    <div style={{marginLeft:'20px', paddingTop:'2px'}}> 
                    <p><strong>Host: {review.owner}</strong></p>
                    <p> {review.message}</p>
                </div>
                </div>
            </div>
        );
    });
    

    return (
        <div>
            <div className='driver-details'>

                <div className='personal-details-driver'>

                    <div style={{marginTop:'30px'}}> 
                    {picturePath.includes('nothing') &&
                        <img src={profile} alt="2Profile Picture"
                            style={{ height: '200px', width: '2000px', borderRadius: '50%' }}
                            className='driver-picture'
                        />}
                    {!picturePath.includes('nothing') &&
                        <img src={picturePath} alt="2Profile Picture"
                            style={{ height: '200px', width: '200px', borderRadius: '50%', objectFit: 'cover' }}
                            className='driver-picture'
                        />}
                        </div>
                    <div>
                        <p style={{fontWeight:'bold', fontSize:'23px', marginTop:'50px'}}>{firstName} {LastName}</p>
                    </div>
                </div>
                <div>
                <h1 style={{textAlign:'left', marginLeft:'100px'}}>What others said about {firstName} {LastName}</h1>

                {displayReviews.length !==0 &&
                <div className='reviews-of-driver'>
                    {displayReviews}
                    </div>}
                    {displayReviews.length ===0 &&  
                    <div className='reviews-of-driver'>
                    <h2>{firstName} {LastName} has not been reviewed yet </h2>
                    </div>}
                </div>

            </div>

        </div>
    );
}

export default (DriverDetails);
