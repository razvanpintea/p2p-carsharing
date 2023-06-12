import React, { useState, useEffect } from 'react';
import Cities from './locations';
import uploadImage from './uploadImage.jpg';
import './AddListing.css';
import { useNavigate } from 'react-router-dom'; // import withRouter from react-router-dom
import imageCompression from 'browser-image-compression';
import Modal from 'react-modal';


function AddListing() {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [location, setLocation] = useState('');
    const [fuel, setFuel] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [newListingError, setNewListingError] = useState('');
    const [userID, setUserID] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);
    const [image1, setImage1] = useState(uploadImage);
    const [image2, setImage2] = useState(uploadImage);
    const [image3, setImage3] = useState(uploadImage);
    const [image4, setImage4] = useState(uploadImage);
    const [image5, setImage5] = useState(uploadImage);
    const [submitImage1, setSubmitImage1] = useState('');
    const [submitImage2, setSubmitImage2] = useState('');
    const [submitImage3, setSubmitImage3] = useState('');
    const [submitImage4, setSubmitImage4] = useState('');
    const [submitImage5, setSubmitImage5] = useState('');
    const navigate = useNavigate();



    const handleBrand = (event) => {
        setBrand(event.target.value);
    }

    const handleModel = (event) => {
        setModel(event.target.value);
    }

    const handleYear = (event) => {
        setYear(event.target.value);
    }

    const handleLocation = (event) => {
        setLocation(event.target.value);
    }

    const handleFuel = (event) => {
        setFuel(event.target.value);
    }

    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };


    useEffect(() => {
        fetch('https://razwebdev.com/p2pcarsharing/api/users?email=' + localStorage.getItem('username'))
            .then((response) => response.json())
            .then((json) => {
                setUserID(json.data[0].id);
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

    }, []);

    useEffect(() => {
        setFilteredModels(models.filter(model => model.brand === brand));
    }, [brand]);


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



    const handldeSubmit = () => {

        if (brand === '' || model === '' || year === '' || selectedCity === '' || fuel === '' || description === '' || price === '')
            setNewListingError("please complete all the fields");
        
        else if(image1===uploadImage || image2===uploadImage ||image3===uploadImage ||image4===uploadImage ||image5===uploadImage)
        setNewListingError("please upload all pictures");

        else {
            const formData = new FormData();
            formData.append('brand', brand);
            formData.append('model', model);
            formData.append('year', year);
            formData.append('location', selectedCity);
            formData.append('fuel_type', fuel);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('owner', localStorage.getItem('username'));
            formData.append('ownerID', userID);
            formData.append('image1', submitImage1);
            formData.append('image2', submitImage2);
            formData.append('image3', submitImage3);
            formData.append('image4', submitImage4);
            formData.append('image5', submitImage5);



            // console.log(brand, model, year, selectedCity, fuel, description, price, userID, submitImage1);
            // console.log(submitImage1);


            fetch("https://razwebdev.com/p2pcarsharing/api/insertListing",
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
                        navigate(`/hostMenu`);
                    })
                .catch(
                    (e) => {
                        console.log(e.message)
                    })
        }
    }

    // const onChangeImage1 = (event) => {
    //     setImage1(URL.createObjectURL(event.target.files[0]));
    //     setSubmitImage2(event.target.files[0]);
    // }

    const onChangeImage1 = async (event) => {
        let imageFile = event.target.files[0];

        // Set the max file size to 2MB
        const maxSizeMB = 2;

        // Compress the image until its file size is below the target
        while (imageFile.size > maxSizeMB * 1024 * 1024) {
            try {
                // Compress the image with a smaller size and quality
                const compressedFile = await imageCompression(imageFile, {
                    maxSizeMB,
                    maxWidthOrHeight: 1080,
                    useWebWorker: true,
                    maxIteration: 10,
                    quality: 0.7,
                });

                // Replace the original file with the compressed one
                imageFile = compressedFile;
            } catch (error) {
                console.log('Image compression error:', error);
                break;
            }
        }

        // Update the state with the compressed image
        setImage1(URL.createObjectURL(imageFile));
        setSubmitImage1(imageFile);
    };

    const onChangeImage2 = async (event) => {
        let imageFile = event.target.files[0];

        // Set the max file size to 2MB
        const maxSizeMB = 2;

        // Compress the image until its file size is below the target
        while (imageFile.size > maxSizeMB * 1024 * 1024) {
            try {
                // Compress the image with a smaller size and quality
                const compressedFile = await imageCompression(imageFile, {
                    maxSizeMB,
                    maxWidthOrHeight: 1080,
                    useWebWorker: true,
                    maxIteration: 10,
                    quality: 0.7,
                });

                // Replace the original file with the compressed one
                imageFile = compressedFile;
            } catch (error) {
                console.log('Image compression error:', error);
                break;
            }
        }

        // Update the state with the compressed image
        setImage2(URL.createObjectURL(imageFile));
        setSubmitImage2(imageFile);
    };

    const onChangeImage3 = async (event) => {
        let imageFile = event.target.files[0];

        // Set the max file size to 2MB
        const maxSizeMB = 2;

        // Compress the image until its file size is below the target
        while (imageFile.size > maxSizeMB * 1024 * 1024) {
            try {
                // Compress the image with a smaller size and quality
                const compressedFile = await imageCompression(imageFile, {
                    maxSizeMB,
                    maxWidthOrHeight: 1080,
                    useWebWorker: true,
                    maxIteration: 10,
                    quality: 0.7,
                });

                // Replace the original file with the compressed one
                imageFile = compressedFile;
            } catch (error) {
                console.log('Image compression error:', error);
                break;
            }
        }

        // Update the state with the compressed image
        setImage3(URL.createObjectURL(imageFile));
        setSubmitImage3(imageFile);
    };

    const onChangeImage4 = async (event) => {
        let imageFile = event.target.files[0];

        // Set the max file size to 2MB
        const maxSizeMB = 2;

        // Compress the image until its file size is below the target
        while (imageFile.size > maxSizeMB * 1024 * 1024) {
            try {
                // Compress the image with a smaller size and quality
                const compressedFile = await imageCompression(imageFile, {
                    maxSizeMB,
                    maxWidthOrHeight: 1080,
                    useWebWorker: true,
                    maxIteration: 10,
                    quality: 0.7,
                });

                // Replace the original file with the compressed one
                imageFile = compressedFile;
            } catch (error) {
                console.log('Image compression error:', error);
                break;
            }
        }

        // Update the state with the compressed image
        setImage4(URL.createObjectURL(imageFile));
        setSubmitImage4(imageFile);
    };

    const onChangeImage5 = async (event) => {
        let imageFile = event.target.files[0];

        // Set the max file size to 2MB
        const maxSizeMB = 2;

        // Compress the image until its file size is below the target
        while (imageFile.size > maxSizeMB * 1024 * 1024) {
            try {
                // Compress the image with a smaller size and quality
                const compressedFile = await imageCompression(imageFile, {
                    maxSizeMB,
                    maxWidthOrHeight: 1080,
                    useWebWorker: true,
                    maxIteration: 10,
                    quality: 0.7,
                });

                // Replace the original file with the compressed one
                imageFile = compressedFile;
            } catch (error) {
                console.log('Image compression error:', error);
                break;
            }
        }

        // Update the state with the compressed image
        setImage5(URL.createObjectURL(imageFile));
        setSubmitImage5(imageFile);
    };

 

    return (
        <div className='add-listing-main-div'>
            <h1>Add a new listing</h1>
            <p style={{color:'red'}}>{newListingError}</p>
            <div className="image-container-host">
                <img className='image1-host' src={image1} alt="1Profile Picture"
                    onClick={() => { document.querySelector('.image1-host-selector').click(); }}
                />

                <img className='image2-host' src={image2} alt="1Profile Picture"
                    onClick={() => { document.querySelector('.image2-host-selector').click(); }} />
                <img className='image3-host' src={image3} alt="1Profile Picture"
                    onClick={() => { document.querySelector('.image3-host-selector').click(); }} />
                <img className='image4-host' src={image4} alt="1Profile Picture"
                    onClick={() => { document.querySelector('.image4-host-selector').click(); }} />
                <img className='image5-host' src={image5} alt="1Profile Picture"
                    onClick={() => { document.querySelector('.image5-host-selector').click(); }} />
                <input type="file" style={{ display: 'none' }} maxsize={2 * 1024 * 1024} onChange={onChangeImage1} accept="image/jpeg, image/png"
                    className='image1-host-selector' />
                <input type="file" style={{ display: 'none' }} maxsize={2 * 1024 * 1024} onChange={onChangeImage2} accept="image/jpeg, image/png"
                    className='image2-host-selector' />
                <input type="file" style={{ display: 'none' }} maxsize={2 * 1024 * 1024} onChange={onChangeImage3} accept="image/jpeg, image/png"
                    className='image3-host-selector' />
                <input type="file" style={{ display: 'none' }} maxsize={2 * 1024 * 1024} onChange={onChangeImage4} accept="image/jpeg, image/png"
                    className='image4-host-selector' />
                <input type="file" style={{ display: 'none' }} maxsize={2 * 1024 * 1024} onChange={onChangeImage5} accept="image/jpeg, image/png"
                    className='image5-host-selector' />

            </div>
            <div style={{ textAlign: 'left', display: 'flex' }}>

                <select onChange={handleBrand} style={{ width: "250px", borderRadius: '10px', border: '1px solid black', cursor: 'pointer' }}>
                    <option value="" hidden>Brand</option>
                    {listOfBrands}
                </select>
                {<select onChange={handleModel} style={{ width: "250px", borderRadius: '10px', border: '1px solid black', cursor: 'pointer' }}
                    disabled={!brand}>
                    <option value="" hidden>Model</option>
                    {listOfModels}
                </select>}

                <select value={year} onChange={handleYear} style={{ width: "170px", borderRadius: '10px', border: '1px solid black', cursor: 'pointer' }}>
                    <option value="" hidden>Year</option>
                    <option value='2010'>2010</option>
                    <option value='2011'>2011</option>
                    <option value='2012'>2012</option>
                    <option value='2013'>2013</option>
                    <option value='2014'>2014</option>
                    <option value='2015'>2015</option>
                    <option value='2016'>2016</option>
                    <option value='2017'>2017</option>
                    <option value='2018'>2018</option>
                    <option value='2019'>2019</option>
                    <option value='2020'>2020</option>
                    <option value='2021'>2021</option>
                    <option value='2022'>2022</option>
                    <option value='2023'>2023</option>
                </select>
            </div>
            <div style={{ textAlign: 'left', display: 'flex' }}>

                <Cities className='add-listings-cities' value={selectedCity}
                    onChange={handleCityChange} />

                <select value={fuel} onChange={handleFuel} style={{ width: "250px", borderRadius: '10px', border: '1px solid black', cursor: 'pointer', height: '42px' }}>
                    <option value="" hidden>Fuel Type</option>
                    <option value='Diesel'>Diesel</option>
                    <option value='Petrol'>Petrol</option>
                    <option value='Electric'>Electric</option>
                    <option value='Hybrid'>Hybrid   </option>
                </select>
                <br />

                <input
                    className="input-price"
                    type="number"
                    placeholder=" £ per day"
                    value={price}
                    onChange={handlePrice}
                    required
                    style={{
                        width: "150px",
                        borderRadius: "10px",
                        border: "1px solid black",
                        height: "20px",
                        fontSize: "19px",
                        cursor: "pointer",
                        padding:'10px'
                    }}
                    maxLength={3}
                    onKeyDown={(event) => {
                        if (
                            (event.target.value.length >= 3 && event.key !== "Backspace" && event.key !== "Delete") || // limit to 3 digits
                            event.key === "e" || event.key === "E" || // disallow 'E' character
                            (event.target.value.length === 0 && event.key === "0") // disallow starting with 0
                        ) {
                            event.preventDefault();
                        }
                    }}
                />



            </div>
            <textarea rows={5} style={{ marginRight: '10px', width: '95%', fontSize: '15px', padding: '10px', resize: "none", fontFamily: "'Open Sans', sans-serif", textAlign: 'left', borderRadius: '10px', border: '1px solid black' }}
                value={description} onChange={handleDescription} placeholder='Description' />
            <p className='upload-car-p' style={{position:'absolute', top:'200px', left:'200px' ,fontSize:'25px'}} onClick={handldeSubmit}> Upload Car</p>
        </div>
    );
}

export default AddListing;
