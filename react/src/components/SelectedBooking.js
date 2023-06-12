import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SelectedBooking.css';
import ImageSlider from './ImageSlider';
import close from './close2.png';
import Modal from 'react-modal';


function SelectedBooking() {

    const { status, bookingID, time } = useParams();
    const [booking, setBooking] = useState([]);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [userID, setUserID] = useState('');
    const [carID, setCarID] = useState('');
    const [reviews, setReviews] = useState([]);

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [location, setLocation] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [pickUp, setPickUp] = useState("");
    const [dropOff, setdropOff] = useState("");
    const [owner, setOwner] = useState("");


    const [carImage1, setCarImage1] = useState(null);
    const [carImage2, setCarImage2] = useState(null);
    const [carImage3, setCarImage3] = useState(null);
    const [carImage4, setCarImage4] = useState(null);
    const [carImage5, setCarImage5] = useState(null);

    const [slideshowClicked, setSlideshowClicked] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);


    const slides = [carImage1, carImage2, carImage3, carImage4, carImage5];

    const clickedImage1 = () => {
        setSlideshowClicked(true);
        setSlideIndex(0);
    }
    const clickedImage2 = () => {
        setSlideshowClicked(true);
        setSlideIndex(1);
    }
    const clickedImage3 = () => {
        setSlideshowClicked(true);
        setSlideIndex(2);
    }
    const clickedImage4 = () => {
        setSlideshowClicked(true);
        setSlideIndex(3);
    }
    const clickedImage5 = () => {
        setSlideshowClicked(true);
        setSlideIndex(4);
    }
    const setSlideshowClickedFalse = () => {
        setSlideshowClicked(false);
    }

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isConfirmBookingModalOpen, setIsConfirmBookingModalOpen] = useState(false);
    const [confirmedBooking, setIsConfirmedBooking] = useState(false);

    const handleSubmitReview = () => {
        const formData = new FormData();
        formData.append('message', message);
        formData.append('renter', userID);
        formData.append('car', bookingID);
        formData.append('listing', carID);
        fetch("https://razwebdev.com/p2pcarsharing/api/insertReview",
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
        window.location.reload();
    }


    useEffect(() => {
        fetch('https://razwebdev.com/p2pcarsharing/api/booking?id=' + bookingID)
            .then((response) => response.json())
            .then((json) => {
                setBooking(json.data);
                setCarID(json.data[0].car);
                setCarImage1(json.data[0].image1);
                setCarImage2(json.data[0].image2);
                setCarImage3(json.data[0].image3);
                setCarImage4(json.data[0].image4);
                setCarImage5(json.data[0].image5);
                setBrand(json.data[0].brand);
                setModel(json.data[0].model);
                setYear(json.data[0].year);
                setLocation(json.data[0].location);
                setFuelType(json.data[0].fuel_type);
                setDescription(json.data[0].description);
                setPrice(json.data[0].price);
                setPickUp(json.data[0].pick_up_date);
                setdropOff(json.data[0].drop_off_date);
                setOwner(json.data[0].owner);

            })
            .catch((err) => {
                console.log(err.message);
            });

        fetch('https://razwebdev.com/p2pcarsharing/api/users?email=' + localStorage.getItem('username'))
            .then((response) => response.json())
            .then((json) => {
                setUserID(json.data[0].id);
            })
            .catch((err) => {
                console.log(err.message);
            });

        fetch('https://razwebdev.com/p2pcarsharing/api/reviews')
            .then((response) => response.json())
            .then((json) => {
                setReviews(json.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const filteredReviews = reviews.filter(review => review.renter === userID && review.car === bookingID);
    const carReviews = reviews.filter(review => review.listing === carID);

    const displayCarReviews = carReviews.map((review, index) => (
        <div className='reviewss-div'>
            <section style={{ marginLeft: '10px', marginTop: "10px" }}>
                <strong>{review.renter_name}</strong><br />
                {review.message}
            </section>
        </div>
    ));
    const userReview = filteredReviews.map((review, index) => (
        <div className='reviews-div' style={{ width: '100%' }}>
            <p style={{ paddingTop: "10px", marginLeft: '10px' }}>{review.message}</p>
            <br /><br />
        </div>
    ));

    const handleReview = (event) => {
        setMessage(event.target.value);
    }

    const handleDeleteBooking = () => {
        const formData = new FormData();
        formData.append('ID', bookingID);
        fetch("https://razwebdev.com/p2pcarsharing/api/deleteBooking",
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
        navigate("/bookings");
    }


    const handleContactHost = () => {
        const formData = new FormData();

        fetch('https://razwebdev.com/p2pcarsharing/api/chatRoom')
            .then((response) => response.json())
            .then((json) => {
                const filteredChats = json.data.filter(chat =>
                    (chat.sender_email === localStorage.getItem('username') && chat.receiver_email === owner)
                    || (chat.receiver_email === localStorage.getItem('username') && chat.sender_email === owner)
                );

                if (filteredChats[0].sender_email === localStorage.getItem('username'))
                    navigate(`/messages/${filteredChats[0].sender_email}/${filteredChats[0].receiver_email}/${filteredChats[0].receiver_name}`);
                else
                    navigate(`/messages/${filteredChats[0].sender_email}/${filteredChats[0].receiver_email}/${filteredChats[0].sender_name}`);
                console.log(json)


            })
    }



    return (
        <div>
            {slideshowClicked &&
                <div>
                    <div>
                        <img src={close} className='close-slideshow' alt="Logo"
                            style={{ width: '35px', position: 'relative', left: 400, top: 45, cursor: 'pointer', zIndex: '1' }}
                            onClick={setSlideshowClickedFalse} />
                    </div>
                    <div>
                        <ImageSlider slides={slides} slideIndex={slideIndex} />
                    </div>
                </div>}
            {!slideshowClicked &&

                <div>
                    <h1>Your Booking</h1>

                    <div className="wrapper-selected-booking">
                        <div className='selected-booking'>
                            <h2>{brand} {model} {year}, {fuelType}</h2>
                            <div>
                                <h2 style={{ marginRight: '15px' }}>{location}</h2>
                            </div>
                        </div>

                        <div class="image-container">
                            <img className='image1' src={carImage1} alt="1Profile Picture" onClick={clickedImage1} />

                            <img className='image2' src={carImage2} alt="1Profile Picture" onClick={clickedImage2} />
                            <img className='image3' src={carImage3} alt="1Profile Picture" onClick={clickedImage3} />
                            <img className='image4' src={carImage4} alt="1Profile Picture" onClick={clickedImage4} />
                            <img className='image5' src={carImage5} alt="1Profile Picture" onClick={clickedImage5} />
                        </div>

                        <div>

                            <div className='description-and-book-div'>
                                <div className='description-div'>
                                    <h3 style={{ textAlign: 'left', marginLeft: '20px' }}>Description</h3>
                                    <section style={{ textAlign: 'left', marginLeft: '20px' }}>
                                        {description}
                                    </section>
                                </div>
                                <div className='booking-details-div'>
                                    <p style={{ marginTop: '50px' }}>Pick Up date: {pickUp.slice(4, 16)}</p>
                                    <p>Drop Off date: {dropOff.slice(4, 16)}</p>
                                    {time === "future" && <div>
                                        <input type="button" value="Cancel Booking" className='delete-booking-button'
                                            onClick={() => setIsConfirmBookingModalOpen(true)}></input>
                                        <Modal
                                            isOpen={isConfirmBookingModalOpen}
                                            contentLabel="Confirm Modal"
                                        >{confirmedBooking &&
                                            <p>Congratulations, you have canceled your ride</p>}
                                            {!confirmedBooking &&
                                                <div>
                                                    <h2>Are you sure?</h2>
                                                    <p>Do you really want to cancel your booking?</p>
                                                    <button onClick={() => handleDeleteBooking()}>Yes</button>
                                                    <button onClick={() => setIsConfirmBookingModalOpen(false)}>No</button>
                                                </div>}
                                        </Modal>
                                    </div>}
                                    <p onClick={handleContactHost} className='contact-button'
                                        style={{ marginTop: '30px' }}>Contact Host</p>

                                </div>

                            </div>
                            {time === "past" && filteredReviews.length !== 0 &&
                                <div className='review-section-homee'>
                                    <h3 style={{ textAlign: 'left', marginLeft: "10px", marginTop: "50px" }}>Your Review</h3>
                                    {userReview}
                                </div>}
                            <div>
                                {time === 'future' && displayCarReviews.length !== 0 &&
                                    <h2 style={{ textAlign: 'left', marginLeft: '20px', marginTop: '100px' }}>Reviews</h2>
                                }
                                {time === 'future' && displayCarReviews.length === 0 &&
                                    <h2 style={{ marginRight: 'auto', marginLeft: '20px', marginTop: '100px' }}>This car has no reviews yet</h2>}
                                {time === 'future' && displayCarReviews.length !== 0 &&
                                    <div style={{
                                        boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.25)",
                                        borderTop: "1px solid #ccc",
                                        padding: "10px", marginTop: "40px", borderRadius: '15px'
                                    }}>
                                        <div className='reviewss-field'>

                                            {displayCarReviews}

                                        </div>
                                    </div>}

                                {time === "past" && filteredReviews.length === 0 &&

                                    <div className='leave-review' style={{display:'flex', flexDirection:'column'}}>
                                        <h3>Leave review</h3>
                                        <input type="text" onChange={handleReview}></input><br />
                                        <input type="button"  value="Submit" onClick={handleSubmitReview}></input>
                                    </div>}


                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default SelectedBooking;
