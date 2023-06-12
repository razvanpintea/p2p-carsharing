import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpcomingListing.css'; // import your own CSS styles
import Modal from 'react-modal';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UpcomingListing() {

    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    Modal.setAppElement('#root'); // Set the app element for accessibility
    const [isConfirmDeleteBookingModalOpen, setIsConfirmDeleteBookingModalOpen] = useState(false);
    const [deleteBookingConfirmed, setDeleteBookingConfirmed] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
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

    }, []);

    const navigateToDriverDetails = (driver) => {
        navigate(`/driverDetails/${driver}`);
    }

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
            window.location.reload();
        }, 1100);
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

    const filteredBookings = bookings.filter(booking => booking.owner === localStorage.getItem('username'));

    const futureBookings = filteredBookings.filter((booking) => {
        const dropOffDate = new Date(booking.drop_off_date);
        const today = new Date();
        return dropOffDate > today && booking.owner === localStorage.getItem('username');
    });

    const displayFutureBookings = futureBookings.map((booking, index) => (
        <div
            key={index}
            value={booking.ID}
            className="bookings-info"
            style={{ position: 'relative', width: '75%', margin: '0 auto', marginTop: "40px" }}
        >
            <div className='bookings-section' style={{ width: '100%' }}>
                <div>
                    <img className='booking-car-img' src={booking.image1} alt="car" />
                </div>
                {booking.status === "unseen" &&
                    <div onMouseOver={onHoverNewBooking(booking.ID)}>
                        <h2 style={{ marginTop: '60px' }}>NEW</h2>
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
                            {deleteBookingConfirmed && <p>{booking.renter_name}'s booking has been deleted</p>}
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

    return (
        <div>
            {loading && <FontAwesomeIcon icon={faSpinner}
                spin size="10x" color="#5692F5" style={{ margin: '0 auto', marginTop: "120px" }} />}

            {!loading && displayFutureBookings.length === 0 &&
                <h1 style={{ marginTop: '220px' }}>Nobody has booked your cars in the future</h1>}
            {!loading && displayFutureBookings.length !== 0 &&
                <div>
                    <h1 style={{ marginBottom: '70px' }}>Your cars that have been booked in the future</h1>
                    {displayFutureBookings}
                </div>}
        </div>
    );
}

export default UpcomingListing;
