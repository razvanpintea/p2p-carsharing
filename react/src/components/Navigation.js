import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from './carental.png';
import notification from './notification.png';
import { Link } from 'react-router-dom';
import './Navigation.css'; // import your own CSS styles


function Navigation() {

  const [bookings, setBookings] = useState([]);
  const [canceledBookings, setCanceledBookings] = useState([]);
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);



  useEffect(() => {
      fetch('https://razwebdev.com/p2pcarsharing/api/chatRoom')
      .then((response) => response.json())
      .then((json) => {
        const filteredChats = json.data.filter(chat =>
          chat.sender_email === localStorage.getItem('username') ||
          chat.receiver_email === localStorage.getItem('username')
        );
        setChats(filteredChats);
      })
      .catch((err) => {
        console.log(err.message);
      });    

  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetch('https://razwebdev.com/p2pcarsharing/api/chatRoom')
      .then((response) => response.json())
      .then((json) => {
        const filteredChats = json.data.filter(chat =>
          chat.sender_email === localStorage.getItem('username') ||
          chat.receiver_email === localStorage.getItem('username')
        );
        setChats(filteredChats);
      })
      .catch((err) => {
        console.log(err.message);
      });    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [chats]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetch('https://razwebdev.com/p2pcarsharing/api/booking')
      .then((response) => response.json())
      .then((json) => {
        setBookings(json.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
       }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [bookings]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetch('https://razwebdev.com/p2pcarsharing/api/userCanceledBookings')
          .then((response) => response.json())
          .then((json) => {
            setCanceledBookings(json.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
     }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [canceledBookings]);

    

  const filteredCanceledBookings = canceledBookings.filter(booking => booking.renter === localStorage.getItem('username'));


  const filteredBookings = bookings.filter(booking => booking.owner === localStorage.getItem('username') && booking.status === 'unseen');

  const filteredNewMessages=chats.filter(chat=>
    (chat.sender_email === localStorage.getItem('username') && chat.sender_newmsg==='yes') ||
    (chat.receiver_email === localStorage.getItem('username') && chat.receiver_newmsg==='yes'));
 
  const onClickOwnerNotification = () => {
          navigate('/upcomingListings');
  }

  const onClickRenterNotification = () => {
    const formData = new FormData();
    formData.append('renter', localStorage.getItem('username'));
    fetch("https://razwebdev.com/p2pcarsharing/api/removeCanceledBookings",
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
          navigate('/bookings');
        })
      .catch(
        (e) => {
          console.log(e.message)
        })
  }


  return (
    <nav className='navigation'>
      <Link to="/">
        <img src={logo} alt="Logo" style={{ width: '180px', position: 'absolute', top: 20, left: 80 }} />
      </Link>
      <ul>
        {filteredBookings.length !== 0 &&
          <div style={{ marginLeft: '30px', position: 'absolute', top: 0, right: 250, display: 'flex', flexDirection: 'row', cursor: 'pointer' }}
            onClick={onClickOwnerNotification}>
            <p>Your cars have been booked {filteredBookings.length} time</p>
            <img src={notification} alt="Logo" style={{ width: '18px', marginLeft: '5px', objectFit: 'contain' }} />
          </div>}
        {filteredCanceledBookings.length !== 0 &&
          <div style={{ marginLeft: '30px', position: 'absolute', top: 0, right: 250, display: 'flex', flexDirection: 'row', cursor: 'pointer' }}
            onClick={onClickRenterNotification}>
            <p>{filteredCanceledBookings.length} of your bookings have been canceled</p>
            <img src={notification} alt="Logo" style={{ width: '18px', marginLeft: '5px', objectFit: 'contain' }} />
          </div>}
          {filteredNewMessages.length !==0 &&
          <div>
            <img src={notification} alt="Logo" style={{ position:'absolute', right:'195px', width: '18px', marginLeft: '5px', objectFit: 'contain' }} />
          </div> }
        {localStorage.getItem('token') && <li><a href="/hostMenu">Host Menu</a></li>}
        {localStorage.getItem('token') && <li><a href="/messages">Messages</a></li>}
        {localStorage.getItem('token') && <li><a href="/favourites">Favorites</a></li>}
        {localStorage.getItem('token') && <li><a href="/login">Account</a></li>}
        {!localStorage.getItem('token') && <li><a href="/login">Log in</a></li>}


      </ul>
    </nav>
  );
}

export default Navigation;
