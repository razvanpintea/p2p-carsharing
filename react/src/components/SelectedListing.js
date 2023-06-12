// import './HostMenu.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import close from './close2.png';
import './SelectedListing.css';
import Modal from 'react-modal';



function SelectedListing() {
  const { listingID } = useParams();
  const [reviews, setReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [message, setMessage] = useState('');

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();
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

  Modal.setAppElement('#root'); // Set the app element for accessibility
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmDeleteBookingModalOpen, setIsConfirmDeleteBookingModalOpen] = useState(false);
  const [deleteBookingConfirmed, setDeleteBookingConfirmed] = useState(false);
  const [deleteListingConfirmed, setDeleteListingConfirmed] = useState(false);


  const handleDeleteListing = () => {
    const formData = new FormData();
    formData.append('ID', listingID);

    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('year', year);
    formData.append('location', location);
    formData.append('fuel_type', fuelType);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('owner', localStorage.getItem('username'));

    fetch("https://razwebdev.com/p2pcarsharing/api/deleteListing",
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
    setDeleteListingConfirmed(true);
    setTimeout(() => {
      navigate("/hostMenu");
    }, 1500);
  }

  useEffect(() => {

    fetch('https://razwebdev.com/p2pcarsharing/api/listings?id=' + listingID)
      .then((response) => response.json())
      .then((json) => {
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

    fetch('https://razwebdev.com/p2pcarsharing/api/userReviews')
      .then((response) => response.json())
      .then((json) => {
        setUserReviews(json.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch('https://razwebdev.com/p2pcarsharing/api/booking?car_id=' + listingID)
      .then((response) => response.json())
      .then((json) => {
        setBookings(json.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

  }, [brand]);

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

  const handleReview = (event) => {
    setMessage(event.target.value);
  }

  const navigateToDriverDetails = (driver) => {
    navigate(`/driverDetails/${driver}`);
  }

  const futureBookings = bookings.filter((booking) => {
    const dropOffDate = new Date(booking.drop_off_date);
    const today = new Date();
    return dropOffDate > today;
  });

  const pastBookings = bookings.filter((booking) => {
    const dropOffDate = new Date(booking.drop_off_date);
    const today = new Date();
    return dropOffDate < today;
  });

  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const onHoverNewBooking = (ID) => {
    const formData = new FormData();
    formData.append('ID', ID);
    fetch("https://razwebdev.com/p2pcarsharing/api/updateBookingsStatus",
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
  }

  const handleContactDriver = (driver) => {
    const formData = new FormData();

    fetch('https://razwebdev.com/p2pcarsharing/api/chatRoom')
      .then((response) => response.json())
      .then((json) => {
        const filteredChats = json.data.filter(chat =>
          (chat.sender_email === localStorage.getItem('username') && chat.receiver_email === driver)
          || (chat.receiver_email === localStorage.getItem('username') && chat.sender_email === driver)
        );

        if (filteredChats[0].sender_email === localStorage.getItem('username'))
          navigate(`/messages/${filteredChats[0].sender_email}/${filteredChats[0].receiver_email}/${filteredChats[0].receiver_name}`);
        else
          navigate(`/messages/${filteredChats[0].sender_email}/${filteredChats[0].receiver_email}/${filteredChats[0].sender_name}`);
        console.log(json)


      })
  }


  const displayFutureBookings = futureBookings.map((booking, index) => (
    <div
      key={index}
      value={booking.ID}
      // className="bookings-info"
      style={{ position: 'relative', width: '95%', marginBottom:'30px' }}
    >
      <div className='bookings-section' >
        <div>
          <img className='booking-car-img' src={booking.image1} alt="1Profile Picture" />
        </div>
        {booking.status === "unseen" &&
          <div onMouseOver={onHoverNewBooking(booking.ID)}>
            <h2 style={{marginTop:'60px'}}>NEW</h2>
          </div>}
        <div style={{ marginTop: '50px', fontSize: 'medium' }} >
          {booking.pick_up_date.slice(3, 15)} - {booking.drop_off_date.slice(3, 15)} <br /> <br />
          Booked by {booking.renter_name}
        </div>
        <div>
          <p style={{ marginRight: '70px', cursor: 'pointer', fontSize: 'medium', marginTop: '35px' }} className='driver-details-click'
            onClick={() => navigateToDriverDetails(booking.renter)}>View Driver's details</p>

          <p style={{ marginRight: '70px', cursor: 'pointer', fontSize: 'medium', marginTop: '20px' }} className='driver-details-click'
            onClick={() => handleContactDriver(booking.renter)}>Contact Driver</p>

          <p style={{ marginRight: '70px', cursor: 'pointer', marginTop: '20px', fontSize: 'medium' }} className='driver-details-click'
            onClick={() => {
              setSelectedBookingId(booking.ID);
              setIsConfirmDeleteBookingModalOpen(true);
            }}>Cancel Upcoming Booking</p>
        </div>
        {selectedBookingId === booking.ID &&
          <div>
            <Modal
              isOpen={isConfirmDeleteBookingModalOpen}
              contentLabel="Confirm Modal"
            >
              {deleteBookingConfirmed && <p>{booking.renter}'s booking has been deleted</p>}
              {!deleteBookingConfirmed && <div>
                <h2>Are you sure?</h2>
                <p>Do you really want to cancel {booking.renter_name}'s booking?</p>
                <button onClick={() => handleDeleteBooking(booking.ID, booking.renter)}>Yes</button>
                <button onClick={() => setIsConfirmDeleteBookingModalOpen(false)}>No</button>
              </div>}
            </Modal>
          </div>}

      </div>

    </div>
  ));

  const filteredUserReviews = userReviews.filter(review => review.owner === localStorage.getItem('username'));


  const displayPastBookings = pastBookings.map((booking, index) => {
    const renterReview = filteredUserReviews.find(
      (review) => review.renter === booking.renter && review.booking === booking.ID
    );

    return (
      <div key={index} value={booking.ID} style={{ position: 'relative', width: '95%', marginBottom:'30px' }}>
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
                style={{ width: '35px', position: 'absolute', right: 10, top: 10, cursor: 'pointer' }}
                onClick={() => setSelectedBookingId(null)} />

              <h2 style={{ position: 'absolute', right: 240, top: 20 }}>Review Driver {booking.renter_name}</h2>
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

  const filteredReviews = reviews.filter(review => review.listing === listingID);

  const allReviews = filteredReviews.map((review, index) => (
    <div className='reviewss-div'>
      <section style={{ marginLeft: '10px', marginTop: "10px" }}>
        <strong>{review.renter_name}</strong><br />
        {review.message}
      </section>
    </div>
  ));



  const handleDeleteBooking = (bookingID, renter) => {
    const formData = new FormData();
    formData.append('ID', bookingID);
    formData.append('renter', renter);
    formData.append('booking', bookingID);

    fetch("https://razwebdev.com/p2pcarsharing/api/updateCanceledBookingsStatus",
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
    setDeleteBookingConfirmed(true);
    setTimeout(() => {
      // window.location.reload();
      setIsConfirmDeleteBookingModalOpen(false)
    }, 1500);
  }

  const [editing, setEditing] = useState(false);
  const [originalDescription, setOriginalDescription] = useState("");


  const handleEditClick = () => {
    setOriginalDescription(description);
    setEditing(true);
  }

  const handleSaveClick = () => {
    setEditing(false);
    const formData = new FormData();
    formData.append('ID', listingID);
    formData.append('description', description);


    fetch("https://razwebdev.com/p2pcarsharing/api/updateDescription",
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
  }

  const handleCancelClick = () => {
    setDescription(originalDescription);
    setEditing(false);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
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
          <h1>Your Listing</h1>
          <div className="wrapper-selected-listing">
            <div className='selected-listing'>
              <h2 style={{ marginLeft: '0px' }}>{brand} {model} {year}, {fuelType} in {location}</h2>
              <p onClick={() => setIsConfirmModalOpen(true)} className='delete-listing-button'
                style={{ marginTop: '28px', marginRight: '25px', cursor: 'pointer', fontSize: '18px' }}>Delete Listing</p>

              <Modal
                isOpen={isConfirmModalOpen}
                contentLabel="Confirm Modal"
              >
                {deleteListingConfirmed && <p>Your listing has been deleted</p>}

                {!deleteListingConfirmed && <div>
                  <h2>Are you sure?</h2>
                  <p>Do you really want to remove your listing?</p>
                  <button onClick={() => handleDeleteListing()}>Yes</button>
                  <button onClick={() => setIsConfirmModalOpen(false)}>No</button>
                </div>}
              </Modal>

            </div>
            <div className="image-container">
              <img className='image1' src={carImage1} alt="1Profile Picture" onClick={clickedImage1} />

              <img className='image2' src={carImage2} alt="1Profile Picture" onClick={clickedImage2} />
              <img className='image3' src={carImage3} alt="1Profile Picture" onClick={clickedImage3} />
              <img className='image4' src={carImage4} alt="1Profile Picture" onClick={clickedImage4} />
              <img className='image5' src={carImage5} alt="1Profile Picture" onClick={clickedImage5} />

            </div>
            <h2 style={{textAlign:'left', marginBottom:'50px'}}>{price}£ / day</h2>
            <div className='description-div' style={{width:'100%', maxWidth:'1100px'}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
              <h3 style={{ textAlign: 'left', marginLeft: '20px' }}>Description</h3>
              <p onClick={handleEditClick} className='edit-description' style={{cursor:'pointer', marginRight:'20px'}}>Edit Description</p>
             
              </div>
              {editing ? (
                <div style={{ textAlign: 'left', marginLeft: '20px', minHeight: '150px'}}>
                  <textarea rows={5} style={{width:'97%', fontSize:'15px', padding:'10px', resize: "none", }} value={description} onChange={handleDescriptionChange} />
                  <div style={{display:'flex', gap:'20px'}}>

                  <p style={{cursor:'pointer'}} onClick={handleSaveClick}>Save</p>
                  <p style={{cursor:'pointer'}} onClick={handleCancelClick}>Cancel</p>
                  </div>

                </div>
              ) : (
                <div style={{ textAlign: 'left', marginLeft: '20px', minHeight: '100px' }}>
                  {description}
                </div>
              )}
            </div>
            <div className='past-and-future-bookings' style={{ marginTop: '80px' }}>
              {displayFutureBookings.length !== 0 &&
                <div className='future-bookings'>
                  <h2 style={{ textAlign: 'left' }}>Upcoming</h2>
                  {displayFutureBookings}
                </div>}

              {displayPastBookings.length !== 0 &&
                <div className='past-bookings'>
                  <h2 style={{ textAlign: 'left', marginTop: '100px' }}>Past</h2>
                  {displayPastBookings}
                </div>}


            </div>



            {allReviews.length !== 0 &&
              <h2 style={{ textAlign: 'left', marginLeft: '20px', marginTop:'100px'  }}>Reviews</h2>
            }
            {allReviews.length === 0 &&
              <h2 style={{ marginRight: 'auto', marginLeft: '20px', marginTop:'100px'  }}>This car has no reviews yet</h2>}
            {allReviews.length!==0 && 
            <div style={{
              boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.25)",
              borderTop: "1px solid #ccc",
              padding: "10px", marginTop: "40px", borderRadius: '15px'
            }}>



              <div className='reviewss-field'>

             {allReviews}

              </div>
            </div>}
          </div>

        </div>}
    </div>
  );
}

export default SelectedListing;
