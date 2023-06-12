import React, { useState, useEffect } from 'react';

function Cities(props) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://razwebdev.com/p2pcarsharing/api/locations")
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setCities(json.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleCityChange = (event) => {
    props.onChange(event);
  };

  const listOfCities = cities.map((city, index) => (
    <option key={index} value={city.name}>
      {city.name}
    </option>
  ));

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div>
          <select value={props.selectedCity} onChange={handleCityChange} style={{cursor:"pointer", marginBottom:'20px',width:"250px", borderRadius:'10px', border:'1px solid black'}}>
            <option value="" hidden>Location</option>
            {listOfCities}
          </select>
        </div>
      )}
    </div>
  );
}

export default Cities;
