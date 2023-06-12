import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate, useLocation } from 'react-router-dom'; // import withRouter from react-router-dom
import 'react-datepicker/dist/react-datepicker.css';
import './HomePage.css';
import Cities from './locations';
import filter from './filters.png';
import Modal from 'react-modal';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function HomePage(props) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedCity, setSelectedCity] = useState('');
    const [errorMsg, setErrorMsg] = useState('Choose where and when you want to go  ');
    const [cars, setCars] = useState([]);
    const [message, setMessage] = useState(["Not logged in"]);
    const [user, setUser] = useState(null);
    const [filteredModels, setFilteredModels] = useState([]);
    const [brand, setBrand] = useState('all');
    const [model, setModel] = useState('all');
    const [filterPrice, setFilterPrice] = useState('');
    const [searchFilterBrand, setSearchFilterBrand] = useState('all');
    const [searchFilterModel, setSearchFilterModel] = useState('all');
    const [searchFilterPrice, setSearchFilterPrice] = useState('');
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [minimumPrice, setMinimumPrice] = useState([]);
    const [maximumPrice, setMaximumPrice] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    Modal.setAppElement('#root'); // Set the app element for accessibility


    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                setMessage("Logged in");
                setUser(localStorage.getItem('username'));
            }

            fetch('https://razwebdev.com/p2pcarsharing/api/listings?exceptionRandom=' + localStorage.getItem('username'))
                .then((response) => response.json())
                .then((json) => {
                    setCars(json.data);
                    setLoading(false);
                    const prices = json.data.map((listing) => listing.price);
                    const max = Math.max(...prices);
                    const min = Math.min(...prices);
                    setMaximumPrice(max);
                    setMinimumPrice(min);
                })
                .catch((err) => {
                    console.log(err.message);

                });
            fetch("https://razwebdev.com/p2pcarsharing/api/newcar")
                .then((response) => response.json())
                .then((json) => {
                    setBrands(json.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });

            fetch("https://razwebdev.com/p2pcarsharing/api/carModels")
                .then((response) => response.json())
                .then((json) => {
                    setModels(json.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        , [])

    useEffect(() => {
        setFilteredModels(models.filter(model => model.brand === brand));
    }, [brand]);

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleFilterPriceChange = (event) => {
        setFilterPrice(event.target.value);
    }

    const handleSelectCar = (listingID) => {
        // console.log(listingID);
        const redirect = "home";
        navigate(`/selectedSecond/${listingID}/${redirect}`);
    }

    const handleBrand = (event) => {
        setBrand(event.target.value);
        setModel('all');
        setSearchFilterModel('all');
    }

    const handleModel = (event) => {
        setModel(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Get the current date
        const currentDate = new Date();

        // Check if the selected dates are valid
        if (!startDate || !endDate) {
            setErrorMsg('Please select pick up and drop off dates.');
        } else if (endDate <= startDate) {
            setErrorMsg('Drop off date must be after pick up date.');
        } else
            if (selectedCity === '') {
                setErrorMsg('Please select a city');
            }
            else {
                // Submit the form
                setErrorMsg('Success');
                navigate(`/search/${selectedCity}/${startDate}/${endDate}/${user}`);
            }
    };

    const filteredCars = cars.filter(listing => (
        (searchFilterBrand === 'all' || listing.brand === searchFilterBrand) && (searchFilterModel === 'all' || listing.model === searchFilterModel)
        && (searchFilterPrice === '' || parseInt(listing.price, 10) <= parseInt(searchFilterPrice, 10))
    ));

    const listOfCars = filteredCars.map((listing, index) => (
        <section key={index} value={listing.brand} className="home-car-info" onClick={() => handleSelectCar(listing.ID)}>

            <img src={listing.image1} alt="1Profile Picture"
                style={{ width: '250px', height: '150px', objectFit: 'cover', borderRadius:'5px' }}
            />
            <br />
            {listing.brand} {listing.model}, {listing.year}<br />
            {listing.location}<br />
            {listing.fuel_type}<br />
            <span className='price'>
                {listing.price}£/day<br /></span>
            <br /><br /><br />
        </section>
    ));

    const listOfBrands = brands.map((theBrand, ID) => (
        <option
            key={ID}
            value={theBrand.brand}
            onClick={() => setBrand(theBrand.brand)}
        >
            {theBrand.brand}
        </option>
    ));

    const listOfModels = filteredModels.map((theModel, ID) => (
        <option
            key={ID}
            value={theModel.model}
            onClick={() => setModel(theModel.theModel)}
        >
            {theModel.model}
        </option>
    ));

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    return (
        <div>

            <div className='home-menu'>
                {errorMsg}
                <div className='search-fields-home'>
                    <form onSubmit={handleSubmit}>
                        <div onClick={() => setIsFilterModalOpen(true)} className='filter-div'>
                            <img src={filter} alt="1Profile Picture"
                                style={{ width: '50px', height: '30px', objectFit: 'contain' }}
                            />
                            <p style={{marginBottom:'25px', color:"white"}}>Filters</p>

                        </div>
                        <div>   
                            <Modal
                                isOpen={isFilterModalOpen}
                                contentLabel="Confirm Modal"
                            >
                                <div>
                                    <h2>Set up your filters</h2>
                                    Brand <select onChange={handleBrand} style={{width:'200px', cursor:'pointer'}}>
                                        {searchFilterBrand === 'all' && <option value="all">All</option>}
                                        {searchFilterBrand !== 'all' && <option value={searchFilterBrand}>{searchFilterBrand}</option>}
                                        {listOfBrands}
                                    </select><br />

                                    Model <select onChange={handleModel} style={{width:'200px', cursor:'pointer '}}>
                                        {searchFilterModel === 'all' && <option value="all">All</option>}
                                        {searchFilterModel !== 'all' && <option value={searchFilterModel}>{searchFilterModel}</option>}                                    {listOfModels}
                                    </select><br />

                                    Maximum Price / day 
                                    {filterPrice === '' && <input type="range" id="numerical-value" name="numerical-value" min={minimumPrice} max={maximumPrice} step="1"
                                        onChange={handleFilterPriceChange} value={maximumPrice} />}
                                    {filterPrice !== '' && <input type="range" id="numerical-value" name="numerical-value" min={minimumPrice} max={maximumPrice} step="1"
                                        onChange={handleFilterPriceChange} value={filterPrice} />}
                                    <br />
                                    {filterPrice}/$

                                    <div className='modal-buttons' style={{ position: 'absolute', right: '0', bottom: '0', marginRight: '30px', marginBottom: '10px' }}>
                                        <button onClick={() => {
                                            setBrand('all');
                                            setModel('all');
                                            setSearchFilterBrand('all');
                                            setSearchFilterModel('all');
                                            setFilterPrice(maximumPrice);
                                            setSearchFilterPrice(maximumPrice);
                                            setIsFilterModalOpen(false);
                                        }}>Reset Filters</button>

                                        <button onClick={() => {
                                            setIsFilterModalOpen(false);
                                            setSearchFilterModel(model);
                                            setSearchFilterBrand(brand);
                                            setSearchFilterPrice(filterPrice);
                                        }}>Save</button>

                                        <button onClick={() => {
                                            setIsFilterModalOpen(false);
                                        }}>Cancel</button>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                        <Cities value={selectedCity} onChange={handleCityChange}/>
                        <DatePicker
                            name="random"
                            autoComplete="off"
                            id="start-date"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="search-input"
                            placeholderText="Pick Up Date"
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            style={{width:"150px", borderRadius:'10px', border:'1px solid black'}}
                        />
                        <DatePicker
                            name="random1"
                            autocomplete="off"
                            id="end-date"
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            className="search-input"
                            placeholderText="Drop Off Date"
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            style={{width:"150px", borderRadius:'10px', border:'1px solid black'}}
                        />
                        <button type="submit" style={{ borderRadius: '4px', border: '0', backgroundColor: 'white' }}>Search</button>
                    </form>
                    {/* <h2 className='suggestions'>Here are a few suggestions from us</h2> */}
                </div >

                <div className='homePageDiv'>
                
                    {!loading && listOfCars.length === 0 && <h2>Sorry, there are no cars matching your search</h2>}
                    {!loading && listOfCars.length !== 0 && listOfCars}

                </div>
                {loading && <FontAwesomeIcon icon={faSpinner}
          spin size="10x" color="#5692F5" style={{ margin: '0 auto', marginTop: "20px" }} />}
            </div>
        </div >
    );
}

export default (HomePage);
