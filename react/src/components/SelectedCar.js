import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import ImageSlider from './ImageSlider';
import close from './close2.png';
import heart from './heart.png';
import heartFill from './heartfill.png';
import Modal from 'react-modal';


function SelectedCar() {
    const { car, start, end, owner } = useParams();
    const [cars, setCars] = useState([]);
    const [message, setMessage] = useState(["Not logged in"]);
    const navigate = useNavigate();
    const [loggedInUser, setUser] = useState([]);
    const [favourite, setFavourite] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [bookings, setBookings] = useState([]);

    const [ownerChat, setOwnerChat] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [location, setLocation] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [carImage1, setCarImage1] = useState(null);
    const [carImage2, setCarImage2] = useState(null);
    const [carImage3, setCarImage3] = useState(null);
    const [carImage4, setCarImage4] = useState(null);
    const [carImage5, setCarImage5] = useState(null);
    const [slideshowClicked, setSlideshowClicked] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [verified, setVerified] = useState('');


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


    const [startDate, setStartDate] = useState(new Date(start));
    const [endDate, setEndDate] = useState(new Date(end));
    const [hasExcludedDatesAfterSelectedDate, setHasExcludedDatesAfterSelectedDate] = useState(false);
    const [maxDate, setMaxDate] = useState(null);
    const [minDateDropOff, setMinDateDropOff] = useState(new Date());
    const [pickUpDates, setPickUpDates] = useState([]);
    const [dropOffDates, setDropOffDates] = useState([]);


    // const startDateMs = startDate.getTime();
    // const endDateMs = endDate.getTime();
    // const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day   

    // const diffMs = Math.abs(endDateMs - startDateMs); // Difference in milliseconds
    // const diffDays = Math.round(diffMs / oneDay); // Difference in days

    const [startDateMs, setStartDateMs] = useState('');
    const [endDateMs, setEndDateMs] = useState('');
    const [oneDay, setOneDay] = useState(24 * 60 * 60 * 1000);
    const [diffMs, setDiffMs] = useState('');
    const [diffDays, setDiffDays] = useState(0);


    useEffect(() => {
        if (startDateMs !== null && endDateMs !== null) {
            const diffMs = Math.abs(endDateMs - startDateMs); // Difference in milliseconds
            const diffDays = Math.round(diffMs / oneDay); // Difference in days
            setDiffMs(diffMs);
            setDiffDays(diffDays);
        }
    }, [startDateMs, endDateMs]);


    Modal.setAppElement('#root'); // Set the app element for accessibility
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isConfirmBookingModalOpen, setIsConfirmBookingModalOpen] = useState(false);
    const [confirmedBooking, setIsConfirmedBooking] = useState(false);


    useEffect(() => {

        if (localStorage.getItem('token')) {
            setMessage("Logged in");
            setUser(localStorage.getItem('username'));
        }
        setStartDateMs(startDate.getTime());
        setEndDateMs(endDate.getTime());

        fetch('https://razwebdev.com/p2pcarsharing/api/listings?id=' + car)
            .then((response) => response.json())
            .then((json) => {
                setCars(json.data);
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
                setOwnerChat(json.data[0].owner_email);
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

        fetch('https://razwebdev.com/p2pcarsharing/api/booking')
            .then((response) => response.json())
            .then((json) => {
                setBookings(json.data);
            })
            .catch((err) => {
                console.log(err.message);
            });

        fetch('https://razwebdev.com/p2pcarsharing/api/booking?car_id=' + car)
            .then((response) => response.json())
            .then((json) => {
                setPickUpDates(json.data.map(item => item.pick_up_date));
                setDropOffDates(json.data.map(item => item.drop_off_date));
            })
            .catch((err) => {
                console.log(err.message);
            });

        fetch('https://razwebdev.com/p2pcarsharing/api/users?email=' + localStorage.getItem('username'))
            .then((response) => response.json())
            .then((json) => {
                setVerified(json.data[0].verified);
            })
            .catch((err) => {
                console.log(err.message);
            });

    }, [],);

    const [senderName, setSenderName] = useState("");
    const [senderProfile, setSenderProfile] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [receiverProfile, setReceiverProfile] = useState("");

    useEffect(() => {

        fetch('https://razwebdev.com/p2pcarsharing/api/user?email=' + loggedInUser)
            .then((response) => response.json())
            .then((json) => {
                console.log(json.data);
                setSenderName(json.data[0].first_name + " " + json.data[0].last_name);
                setSenderProfile(json.data[0].profile);
            })
            .catch((err) => {
                console.log(err.message);
            });
        fetch('https://razwebdev.com/p2pcarsharing/api/user?email=' + ownerChat)
            .then((response) => response.json())
            .then((json) => {
                setReceiverName(json.data[0].first_name + " " + json.data[0].last_name);
                setReceiverProfile(json.data[0].profile);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [ownerChat]);

    const filteredReviews = reviews.filter(review => review.listing === car);

    const allReviews = filteredReviews.map((review, index) => (
        <div className='reviews-div'>
            {review.renter_name}<br />
            {review.message}
            <br /><br />
        </div>
    ));

    const filteredBookings = bookings.filter(booking => booking.renter === loggedInUser);

    const futureBookings = filteredBookings.filter((booking) => {
        const dropOffDate = new Date(booking.drop_off_date);
        const today = new Date();
        return dropOffDate > today;
    });

    const handleClickWhenLoggedOut = () => {
        const status = "redirected";
        navigate(`/login/${status}/${car}/${start}/${end}/${owner}`);
    }


    const handleFavourites = () => {
        const formData = new FormData();
        formData.append('renter', loggedInUser);
        formData.append('car', car);

        fetch("https://razwebdev.com/p2pcarsharing/api/insertFavourites", {
            method: 'POST',
            body: formData
        })
            .then((response) => response.text())
            .then((json) => {
                fetch('https://razwebdev.com/p2pcarsharing/api/favourites')
                    .then((response) => response.json())
                    .then((json) => {
                        setFavourite(json.data);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            })
            .catch((e) => {
                console.log(e.message)
            });
    }

    const clickedBooking = () => {
        if (!startDate || !endDate || startDate==='' || endDate==='' )
          setErrorMsg('Please select pick up and drop off dates.');
        else if (startDate.toString() === endDate.toString())
          setErrorMsg('Please select different  pick up and drop off dates.');
        else {
          setErrorMsg('');
          setIsConfirmBookingModalOpen(true);
        }
      }


    const handleBooking = () => {
        const formData = new FormData();
        formData.append('renter', loggedInUser);
        formData.append('pick_up_date', start);
        formData.append('drop_off_date', end);
        formData.append('car', car);

        formData.append('sender_email', loggedInUser);
        formData.append('sender_name', senderName);
        formData.append('sender_profile', senderProfile);
        formData.append('receiver_email', ownerChat);
        formData.append('receiver_name', receiverName);
        formData.append('receiver_profile', receiverProfile);

        if (!startDate || !endDate) {
            setErrorMsg('Please select pick up and drop off dates.');
        } else if (endDate <= startDate) {
            setErrorMsg('Drop off date must be after pick up date.');
        }
        else {

            fetch('https://razwebdev.com/p2pcarsharing/api/chatRoom')
                .then((response) => response.json())
                .then((json) => {
                    const filteredChats = json.data.filter(chat =>
                        chat.sender_email === localStorage.getItem('username') ||
                        chat.receiver_email === localStorage.getItem('username')
                    );
                    if (filteredChats.length === 0)
                        fetch("https://razwebdev.com/p2pcarsharing/api/insertChatRoom",
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
                })

            fetch("https://razwebdev.com/p2pcarsharing/api/insertBooking",
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
            setIsConfirmedBooking(true);
            setTimeout(() => {
                setIsConfirmBookingModalOpen(false);
                setIsConfirmedBooking(false);
                window.location.reload();
            }, 1500);
        }
    }

    useEffect(() => {

        fetch('https://razwebdev.com/p2pcarsharing/api/favourites')
            .then((response) => response.json())
            .then((json) => {
                setFavourite(json.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const filteredFavorites = favourite.filter((item) => {
        return item.renter === loggedInUser && item.car_id === car;
    });


    const navigateToFavourites = () => {
        navigate('/favourites');
    }
    const changeStartDate = (date) => {
        setStartDate(date);
        setMinDateDropOff(date);
        setEndDate('');
        setDiffDays(0);
        setStartDateMs(date.getTime());
    }

    const [excludeDates, setExcludeDates] = useState([]);
    const [pickUpexcludeDates, setPickUpExcludeDates] = useState([]);

    let i = 0;
    for (i == 0; i < pickUpDates.length; i++) {
        const pickup = new Date(pickUpDates[i]);
        const dropoff = new Date(dropOffDates[i]);
        const dateBeforePickup = new Date(pickup);
        dateBeforePickup.setDate(dateBeforePickup.getDate() - 1);
        pickUpexcludeDates.push(dateBeforePickup);

        // Use a loop to iterate over all the dates between pickup and dropoff
        for (let date = new Date(pickup); date <= dropoff; date.setDate(date.getDate() + 1)) {
            // Push the date into the array
            pickUpexcludeDates.push(new Date(date));
            excludeDates.push(new Date(date));
        }

    }

    useEffect(() => {
        const hasExcludedDatesAfterSelectedDate = startDate ? excludeDates.filter(excludeDate => excludeDate > startDate).length > 0 : false;
        setHasExcludedDatesAfterSelectedDate(hasExcludedDatesAfterSelectedDate);
        if (hasExcludedDatesAfterSelectedDate) {
            const sortedExcludeDates = excludeDates.sort((a, b) => a - b); // Sort the array in ascending order
            const firstExcludedDateAfterStartDate = sortedExcludeDates.find(excludeDate => excludeDate > startDate);
            setMaxDate(firstExcludedDateAfterStartDate - 1);
        }
        else {
            setMaxDate(null);
        }
    }, [changeStartDate]);


    const changeEndDate = (date) => {
        setEndDate(date);
        setEndDateMs(date.getTime());
    }

    const handleContactHost = () => {
        const formData = new FormData();
        formData.append('sender_email', loggedInUser);
        formData.append('sender_name', senderName);
        formData.append('sender_profile', senderProfile);
        formData.append('receiver_email', ownerChat);
        formData.append('receiver_name', receiverName);
        formData.append('receiver_profile', receiverProfile);
        fetch('https://razwebdev.com/p2pcarsharing/api/chatRoom')
            .then((response) => response.json())
            .then((json) => {
                const filteredChats = json.data.filter(chat =>
                    (chat.sender_email === localStorage.getItem('username') && chat.receiver_email === owner)
                    || (chat.receiver_email === localStorage.getItem('username') && chat.sender_email === owner)
                );
                if (filteredChats.length === 0)
                    fetch("https://razwebdev.com/p2pcarsharing/api/insertChatRoom",
                        {
                            method: 'POST',
                            body: formData
                        })
                        .then(
                            (response) => response.text()
                        )
                        .then(
                            (json) => {
                                navigate('/messages');
                            })
                        .catch(
                            (e) => {
                                console.log(e.message)
                            })
                else {
                    if (filteredChats[0].sender_email === localStorage.getItem('username'))
                        navigate(`/messages/${filteredChats[0].sender_email}/${filteredChats[0].receiver_email}/${filteredChats[0].receiver_name}`);
                    else
                        navigate(`/messages/${filteredChats[0].sender_email}/${filteredChats[0].receiver_email}/${filteredChats[0].sender_name}`);
                    console.log(json)
                }

            })
    }



    return (<div>
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
                <div className="wrapper-selected-car-home">
                    <div className='selected-car-title-home'>
                        <h2>{brand} {model} {year}, {fuelType}</h2>
                        {localStorage.getItem('token') && filteredFavorites.length !== 0 &&
                            <div className='added-to-favourites'>
                                <img src={heartFill} alt="heart" style={{ marginRight: '1px', marginTop: '1px', width: '25px', objectFit: 'contain', cursor: 'pointer' }} onClick={navigateToFavourites} />
                                <p style={{ marginTop: '28px', marginLeft: '10px', cursor: 'pointer' }} onClick={navigateToFavourites}>Car added to favourites</p>
                            </div>}


                        {localStorage.getItem('token') && filteredFavorites.length === 0 &&
                            <div className='add-to-favourites'>
                                <img src={heart} alt="heart" style={{ marginTop: '1px', cursor: 'pointer', width: '25px', objectFit: 'contain' }}
                                    onClick={handleFavourites} />
                                <p onClick={handleFavourites} style={{ marginTop: '28px', marginLeft: '10px', cursor: 'pointer' }}>Add to Favourites</p>
                            </div>}
                    </div>
                    <div className="image-container">
                        <img className='image1' src={carImage1} alt="1Profile Picture" onClick={clickedImage1} />

                        <img className='image2' src={carImage2} alt="1Profile Picture" onClick={clickedImage2} />
                        <img className='image3' src={carImage3} alt="1Profile Picture" onClick={clickedImage3} />
                        <img className='image4' src={carImage4} alt="1Profile Picture" onClick={clickedImage4} />
                        <img className='image5' src={carImage5} alt="1Profile Picture" onClick={clickedImage5} />
                    </div>
                    <div className='description-and-book-div'>
                        <div className='description-div'>
                            <h3 style={{ textAlign: 'left', marginLeft: '20px' }}>Description</h3>
                            <section style={{ textAlign: 'left', marginLeft: '20px' }}>
                                {description}
                            </section>
                        </div>

                        <div className='book-section-favouritess'>
                            <h3>Book your ride in {location}</h3>
                            <p>{errorMsg}</p>
                            <DatePicker
                                name="random"
                                autoComplete="off"
                                id="start-date"
                                selected={startDate}
                                onChange={(date) => changeStartDate(date)}
                                minDate={new Date()}
                                className="search-input"
                                placeholderText="Pick Up Date"
                                dateFormat="dd/MM/yyyy"
                                excludeDates={pickUpexcludeDates}
                            />

                            <DatePicker
                                name="random2"
                                autocomplete="off"
                                id="end-date"
                                selected={endDate}
                                onChange={changeEndDate}
                                className="search-input"
                                placeholderText="Drop Off Date"
                                minDate={minDateDropOff}
                                dateFormat="dd/MM/yyyy"
                                excludeDates={excludeDates}
                                maxDate={maxDate}
                            />

                            {verified === 'yes' &&
                                <div>
                                    <p>{price}£ / day</p>
                                    {endDate !== '' && startDate !== null && <p>Total: {price * diffDays}£</p>
                                    }
                                    <input type="button" value="Book car" className='book-car-home-button'
                                        onClick={() => clickedBooking()}></input>
                                </div>
                            }
                            {verified === 'no' &&
                                <div>
                                    <p>{price}£ / day</p>
                                    {endDate !== '' && startDate !== null && <p>Total: {price * diffDays}£</p>
                                    }
                                    <input type="button" value="Verify your licence to start driving" className='book-car-home-button'
                                        onClick={() => navigate('/login')}></input>

                                </div>}
                            <Modal
                                isOpen={isConfirmBookingModalOpen}
                                contentLabel="Confirm Modal"
                            >{confirmedBooking &&
                                <p>Congratulations, you have booked your ride</p>}
                                {!confirmedBooking &&
                                    <div>
                                        <h2>Are you sure?</h2>
                                        <p>Do you really want to book the car?</p>
                                        <button onClick={() => handleBooking()}>Yes</button>
                                        <button onClick={() => setIsConfirmBookingModalOpen(false)}>No</button>
                                    </div>}
                            </Modal>
                            {!localStorage.getItem('token') && <input type="button" className='login-from-selected-home-button' value="Log in to book your ride" onClick={handleClickWhenLoggedOut}></input>}
                            {localStorage.getItem('username') &&
                                <p className='contact-button' style={{ cursor: 'pointer' }} onClick={handleContactHost}>Contact Host</p>
                            }
                        </div>

                    </div>


                    <div>
                        {allReviews.length !== 0 &&
                            <h2 style={{ textAlign: 'left', marginLeft: '80px', marginBottom: "30px" }}>Reviews</h2>
                        }

                        <div className='review-field'>

                            {allReviews.length !== 0 && allReviews}
                            {allReviews.length === 0 &&
                                <h2 style={{ marginRight: 'auto', marginLeft: '50px', marginBottom: "30px" }}>This car has no reviews yet</h2>}
                        </div>
                    </div>
                </div>




            </div>}
    </div>);
}
export default SelectedCar;
