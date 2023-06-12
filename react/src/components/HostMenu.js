import './HostMenu.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import menu from './menu.png';
import Modal from 'react-modal';

function HostMenu() {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBorderVisible, setIsBorderVisible] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {

    fetch('https://razwebdev.com/p2pcarsharing/api/listings?owner=' + localStorage.getItem('username'))
      .then((response) => response.json())
      .then((json) => {
        setListings(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSelectListing = (listingID) => {
    console.log("selected listings");
    navigate(`/selectedListing/${listingID}`);

  }

  const listOfListings = listings.map((listing, index) => (
    <div key={index} value={listing.brand} className="own-listings-section" onClick={() => handleSelectListing(listing.ID)}>
      <img className='host-menu-car-img' src={listing.image1} alt="1Profile Picture"
      />
      <div className='car-details-host-menu'>
        <p><strong>{listing.brand} {listing.model}, {listing.year}</strong></p>
        <p>{listing.location}</p>
      </div>
    </div>
  ));


  return (
    <div>

      {loading && <FontAwesomeIcon icon={faSpinner}
        spin size="10x" color="#5692F5" style={{ margin: '0 auto', marginTop: "120px" }} />}
      {!loading && listOfListings.length === 0 &&
        <div>
          <h1 style={{ margin: 'auto' }}>You haven' posted any cars yet</h1>
          <Link to="/addListing" style={{ textDecoration: 'none', marginTop: "100px" }}>
            <p className='add-new-listing'>Click here to upload your first car</p>
          </Link><br />
        </div>}
    
      {!loading && listOfListings.length !== 0 &&
        <div>
          <h1 style={{marginBottom:'80px'}}>Manage your listings</h1>
          <div style={{boxShadow: isBorderVisible ? '0 2px 6px rgba(0, 0, 0, 0.35)' : 'none', borderRadius:'20px', width:'230px', position:'absolute', left:'50px', top:'110px' }}>
          <img
            src={menu}
            alt="menu"
            style={{ width: '80px', position: "absolute", left: '0', top: "0", cursor: 'pointer'}}
            onClick={() => { setIsFilterModalOpen(!isFilterModalOpen); setIsBorderVisible(!isBorderVisible) }}
          />
           {isFilterModalOpen &&  <div style={{ textAlign: 'left', marginTop:'70px', marginLeft:'10px' }}>
              <Link to="/upcomingListings" style={{ textDecoration: 'none' }}>
                <p className='upcoming-past-add'>View Upcoming</p>
              </Link>
              <Link to="/pastListings" style={{ textDecoration: 'none' }}>
                <p className='upcoming-past-add'>View Past</p>
              </Link>
              <Link to="/addListing" style={{ textDecoration: 'none' }}>
                <p className='upcoming-past-add'>Add a new listing</p>
              </Link><br />
            </div>}
          </div>
          {listOfListings}
        </div>}

    </div>
  );
}

export default HostMenu;
