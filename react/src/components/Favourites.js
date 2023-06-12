import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Favourites.css'; // import your own CSS styles
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Favorites() {
  const [user, setUser] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleClickFavourite = (favouriteCarId, favouriteID) => {
    // console.log(favouriteCarId);
    const redirect = "favourites";
    navigate(`/selectedSecond/${favouriteCarId}/${redirect}/${favouriteID}`);
  }

  useEffect(() => {
    if (localStorage.getItem('username')) {
      setUser(localStorage.getItem('username'));
    }
    fetch('https://razwebdev.com/p2pcarsharing/api/favourites')
      .then((response) => response.json())
      .then((json) => {
        setFavourites(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });

  }, []);

  const filteredFavorites = favourites.filter(item => item.renter === user);

  const displayFavourites = filteredFavorites.map((favourite, index) => (
    <div
      key={index}
      value={favourite.ID}
      className="favourite-info"
      onClick={() => handleClickFavourite(favourite.car_id, favourite.ID)}>
      <img className='favourite-car-img' src={favourite.image1} alt="1Profile Picture"
      />
      <div className='car-details-favourite'>
        <p><strong>{favourite.brand} {favourite.model}, {favourite.year}</strong></p>
        <p>{favourite.location}</p>
      </div>
    </div>
  ));

  return (
    <div>
      {loading && <FontAwesomeIcon icon={faSpinner}
          spin size="10x" color="#5692F5" style={{ margin: '0 auto', marginTop: "120px" }} />}
      {!loading && displayFavourites.length !== 0 && <h1>Your Favourite Cars</h1>}
      {!loading && displayFavourites.length === 0 && <h1 style={{margin:'0 auto', marginTop:'220px'}}>You currently have no favourite cars</h1>}
      {!loading && displayFavourites.length !== 0 && displayFavourites}
    </div>

  );
}

export default Favorites;
