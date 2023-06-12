import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SearchCars.css';
import filter from './filters.png';
import Modal from 'react-modal';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function SearchCars(props) {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const { city, start, end, user } = useParams();
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startDateMs = startDate.getTime();
    const endDateMs = endDate.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const navigate = useNavigate();

    const [filterPrice, setFilterPrice] = useState('');
    const [filteredModels, setFilteredModels] = useState([]);
    const [brand, setBrand] = useState('all');
    const [model, setModel] = useState('all');
    const [searchFilterBrand, setSearchFilterBrand] = useState('all');
    const [searchFilterModel, setSearchFilterModel] = useState('all');
    const [searchFilterPrice, setSearchFilterPrice] = useState('');
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [minimumPrice, setMinimumPrice] = useState([]);
    const [maximumPrice, setMaximumPrice] = useState([]);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    Modal.setAppElement('#root'); // Set the app element for accessibility


    const diffMs = Math.abs(endDateMs - startDateMs); // Difference in milliseconds
    const diffDays = Math.round(diffMs / oneDay); // Difference in days


    const dayStart = startDate.getDate();
    const monthStart = startDate.toLocaleString('default', { month: 'long' });
    const yearStart = startDate.getFullYear();

    const dayEnd = endDate.getDate()
    const monthEnd = endDate.toLocaleString('default', { month: 'long' });
    const yearEnd = endDate.getFullYear();

    const [bookedCars, setBookedCars] = useState([]);
    const [pickUpDates, setPickUpDates] = useState([]);
    const [dropOffDates, setDropOffDates] = useState([]);

    const handleClick = (id, userID) => {
        navigate(`/selected/${id}/${start}/${end}/${userID}`);

    };


    useEffect(() => {
        fetch(`https://razwebdev.com/p2pcarsharing/api/listings?city=${city}&exception=${user}`)
            .then((response) => response.json())
            .then((json) => {
                setLoading(false);
                setCities(json.data);
                const prices = json.data.map((listing) => listing.price);
                const max = Math.max(...prices);
                const min = Math.min(...prices);
                setMaximumPrice(max);
                setMinimumPrice(min);
            })
            .catch((err) => {
                console.log(err.message);
            })
        fetch(`https://razwebdev.com/p2pcarsharing/api/booking?location=` + city)
            .then((response) => response.json())
            .then((json) => {
                setBookedCars(json.data);
            })
            .catch((err) => {
                console.log(err.message);
            })

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
    }, []);

    useEffect(() => {
        setFilteredModels(models.filter(model => model.brand === brand));
    }, [brand]);

    const handleBrand = (event) => {
        setBrand(event.target.value);
        setModel('all');
        setSearchFilterModel('all');
    }

    const handleModel = (event) => {
        setModel(event.target.value);
    }

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

    const notAvailableCars = bookedCars.filter((car) => {
        const pickupDate = new Date(car.pick_up_date);
        const dropoffDate = new Date(car.drop_off_date);
        const startDate = new Date(start);
        const endDate = new Date(end);
        // Check if cars are not already booked during the time period searched
        if ((startDate.getTime() >= pickupDate.getTime() && endDate.getTime() <= dropoffDate.getTime()) ||
            (startDate.getTime() <= pickupDate.getTime() && endDate.getTime() <= dropoffDate.getTime() && endDate.getTime() > pickupDate.getTime() ||
                startDate.getTime() >= pickupDate.getTime()) && startDate.getTime() < dropoffDate.getTime() ||
            startDate.getTime() <= pickupDate.getTime() && endDate.getTime() >= dropoffDate.getTime()) {

            return true;
        }
        return false;
    });

    const notAvailableCarIDs = notAvailableCars.map((car) => car.car);

    const filteredCars = cities.filter(listing => (
        (searchFilterBrand === 'all' || listing.brand === searchFilterBrand) && (searchFilterModel === 'all' || listing.model === searchFilterModel)
        && (searchFilterPrice === '' || parseInt(listing.price, 10) <= parseInt(searchFilterPrice, 10))
    ));

    const listOfFinalCars = filteredCars
        .filter((listing) => !notAvailableCarIDs.includes(listing.ID)) // Filter by available car IDs
        .map((listing, index) => (
            <section
                key={index}
                listing={listing}
                className="car-info"
                onClick={() => handleClick(listing.ID, listing.user_id)}
            >
                <img
                    className="search-car-image"
                    src={listing.image1}
                    alt="1Profile Picture"
                    style={{ width: '250px', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                />
                <br />
                {listing.brand} {listing.model}, {listing.year}
                <br />
                {listing.location}
                <br />
                {listing.fuel_type}
                <br />
                <div className="price">
                    {listing.price}$/day
                    <br />
                    Total: {listing.price * diffDays}$
                </div>
            </section>
        ));

    const handleFilterPriceChange = (event) => {
        setFilterPrice(event.target.value);
    }


    return (
        <div>
            {loading && <FontAwesomeIcon icon={faSpinner}
                spin size="10x" color="#5692F5" style={{ margin: '0 auto', marginTop: "120px" }} />}
            {!loading && (
                <div className="searchCarsDiv">

                    <div>
                        <Modal
                            isOpen={isFilterModalOpen}
                            contentLabel="Confirm Modal"
                        >
                            <div>
                                <h2>Set up your filters</h2>
                                Brand <select onChange={handleBrand} style={{ width: '200px' }}>
                                    {searchFilterBrand === 'all' && <option value="all">All</option>}
                                    {searchFilterBrand !== 'all' && <option value={searchFilterBrand}>{searchFilterBrand}</option>}
                                    {listOfBrands}
                                </select><br />

                                Model <select onChange={handleModel} style={{ width: '200px' }}>
                                    {searchFilterModel === 'all' && <option value="all">All</option>}
                                    {searchFilterModel !== 'all' && <option value={searchFilterModel}>{searchFilterModel}</option>}                                    {listOfModels}
                                </select><br />

                                Maximum Price / day
                                {filterPrice === '' && <input type="range" id="numerical-value" name="numerical-value" min={minimumPrice} max={maximumPrice} step="1"
                                    onChange={handleFilterPriceChange} value={maximumPrice} style={{ cursor: 'pointer' }} />}
                                {filterPrice !== '' && <input type="range" id="numerical-value" name="numerical-value" min={minimumPrice} max={maximumPrice} step="1"
                                    onChange={handleFilterPriceChange} value={filterPrice} style={{ cursor: 'pointer' }} />}
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
                                        console.log(searchFilterPrice);
                                    }}>Save</button>

                                    <button onClick={() => {
                                        setIsFilterModalOpen(false);
                                    }}>Cancel</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    {listOfFinalCars.length !== 0 && (
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '30px' }}>

                                <div onClick={() => setIsFilterModalOpen(true)} className='filter-div-search'>
                                    <img src={filter} alt="1Profile Picture"
                                        style={{ width: '50px', height: '30px', objectFit: 'contain' }}
                                    />
                                    <p>Filters</p>
                                </div>

                                <div>
                                    <h2>Here are all the cars in {city}, available from {dayStart} {monthStart} {yearStart} to {dayEnd} {monthEnd} {yearEnd}</h2>
                                </div>

                            </div>
                            <div style={{marginTop:'50px'}}>
                            {listOfFinalCars}
                            </div>
                        </div>
                    )}
                    {listOfFinalCars.length === 0 && 
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <div onClick={() => setIsFilterModalOpen(true)} className='filter-div-search'>
                                    <img src={filter} alt="1Profile Picture"
                                        style={{ width: '50px', height: '30px', objectFit: 'contain' }}
                                    />
                                    <p>Filters</p>
                                </div>
                    <div>
                        <h2 className='sorry-message'>
                        Sorry, there are no available cars in {city} from {dayStart} {monthStart} {yearStart} to {dayEnd} {monthEnd} {yearEnd} that are matching your search</h2>
                        </div>
                        
                                </div>}
                </div>
            )}
        </div>
    );
}

export default SearchCars;


