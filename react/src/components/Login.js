import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { useParams, useNavigate, Link } from 'react-router-dom'; // import withRouter from react-router-dom
import verification from './verified.png';
import './Login.css'; // import your own CSS styles
import close from './close.png';
import Image from 'react-bootstrap/Image';
import uploadImage from './uploadImage.jpg';
import profile from './profile2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';




function Login(props) {

    Modal.setAppElement('#root'); // Set the app element for accessibility
    const [isConfirmBookingModalOpen, setIsConfirmBookingModalOpen] = useState(false);

    const [userID, setUserID] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [firstName, SetFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [licence, setLicence] = useState(uploadImage);
    const [verificationPhoto, setVerificationPhoto] = useState(uploadImage);
    const [submitLicence, setSubmitLicence] = useState('');
    const [submitVerificationPhoto, setSubmitVerificationPhoto] = useState('');
    const [profilePic, setProfilePic] = useState(profile);
    const [submitProfilePic, setSubmitProfilePic] = useState(profile);
    const [showForm, setShowForm] = useState(false);
    const [authentic, setAuthentic] = useState(null);
    const [identical, setIdentical] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(true);

    const [uploadhit, setUploadhit] = useState(false);
    const [showUpdateMessage, setShowUpdateMessage] = useState(false);
    const [picturePath, setPicturePath] = useState('');
    const [verified, setVerified] = useState('');
    const [savedLicence, setSavedLicence] = useState('');


    const navigate = useNavigate();
    const { status, car, start, end, owner } = useParams();


    const setShowFormtrue = () => {
        setShowForm(true);
    }

    const setShowFormFalse = () => {
        setShowForm(false);
        setUploadhit(false);
        setLoading(true);
        setSubmitLicence('');
        setSubmitVerificationPhoto('');
        setVerificationPhoto(uploadImage);
        setLicence(uploadImage);
    }

    const reuploadDocuments = () => {
        setVerified('no');
    }
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        props.handleAuthenticated(false);

    }

    const handleClick = () => {
        const encodedString = Buffer.from(
            username + ":" + password
        ).toString('base64');

        fetch("https://razwebdev.com/p2pcarsharing/api/auth",
            {
                method: 'POST',
                headers: new Headers({ "Authorization": "Basic " + encodedString })
            })
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                (json) => {
                    if (json.message === "success") {
                        setIsConfirmBookingModalOpen(true);
                        localStorage.setItem('token', json.data.token);
                        localStorage.setItem('username', username);
                        props.handleAuthenticated(true);
                        setLoginStatus("");
                        fetch('https://razwebdev.com/p2pcarsharing/api/users?email=' + username)
                            .then((response) => response.json())
                            .then((json) => {
                                setLastName(json.data[0].last_name);
                                SetFirstName(json.data[0].first_name);
                                setPhone(json.data[0].phone);
                                setPicturePath(json.data[0].profile + '?timestamp=' + Date.now());
                                setSavedLicence(json.data[0].licence);
                                setVerified(json.data[0].verified);
                                setIsConfirmBookingModalOpen(false);

                                if (window.location.href.includes("loginFromHome")&& username !==owner) {
                                    navigate(`/selectedSecond/${car}/home`);
                                    console.log('from home');
                                }
                                
        
                                else if (window.location.href.includes(status) && json.data[0].id !==owner) {
                                    navigate(`/selected/${car}/${start}/${end}/${owner}`);
                                   
                                }
                                else
                                navigate("/");
                            })
                            .catch((err) => {
                                console.log(err.message);
                            });

                       


                    }
                    else
                        setLoginStatus("Sorry, " + json.message);

                }
            )
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )
    }




    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                props.handleAuthenticated(true)
                setUsername(localStorage.getItem('username'));
            }
        }
        , [])



    useEffect(() => {
        fetch('https://razwebdev.com/p2pcarsharing/api/users?email=' + localStorage.getItem('username'))
            .then((response) => response.json())
            .then((json) => {
                setLastName(json.data[0].last_name);
                SetFirstName(json.data[0].first_name);
                setPhone(json.data[0].phone);
                setPicturePath(json.data[0].profile + '?timestamp=' + Date.now());
                setSavedLicence(json.data[0].licence);
                setVerified(json.data[0].verified);
                setPageLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);




    const onChangeLicence = (event) => {
        setLicence(URL.createObjectURL(event.target.files[0]));
        setSubmitLicence(event.target.files[0]);
        setUploadhit(false);
    }

    const onChangeVerificationPhoto = (event) => {
        setSubmitVerificationPhoto(event.target.files[0]);
        setVerificationPhoto(URL.createObjectURL(event.target.files[0]));
        setUploadhit(false);
    }



    const onSubmitProfilePic = (event) => {
        setShowUpdateMessage(false);

        const formData = new FormData();
        formData.append('image', submitProfilePic);
        formData.append('user', localStorage.getItem('username'));


        fetch('https://razwebdev.com/p2pcarsharing/api/uploadProfilePicture', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data); // this will log the response from the PHP script
            })
            .catch(error => {
                console.error(error);
            });


    }





    const onChangeProfilePic = (event) => {
        setPicturePath(URL.createObjectURL(event.target.files[0]));
        setSubmitProfilePic(event.target.files[0]);
        setShowUpdateMessage(true);
    }

    const handleSubmitLicence = () => {

        setUploadhit(true);
        setSavedLicence(licence);
        setLoading(true);

        const formData = new FormData();
        formData.append('image', submitLicence);
        formData.append('image2', submitVerificationPhoto);
        formData.append('user', localStorage.getItem('username'));

        fetch('https://razwebdev.com/p2pcarsharing/api/scan', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                const jsonData = JSON.parse(data);
                setLoading(false);
                setAuthentic(jsonData.authentic);
                setIdentical(jsonData.identical);
                console.log(jsonData.authentic);
                console.log(jsonData.identical);

                if (jsonData.authentic && jsonData.identical) {
                    setVerified('yes');
                   

                    fetch('https://razwebdev.com/p2pcarsharing/api/uploadLicence?verified=yes', {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => response.text())
                        .then(data => {
                            console.log(data); // this will log the response from the PHP script
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                else {
                    fetch('https://razwebdev.com/p2pcarsharing/api/uploadLicence?verified=no', {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => response.text())
                        .then(data => {
                            console.log(data); // this will log the response from the PHP script
                        })
                        .catch(error => {
                            console.error(error);
                        });

                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === "Enter") {
            handleClick();
          }
        };
    
        window.addEventListener("keydown", handleKeyDown);
    
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [handleClick]);



    return (
        <div>
             <Modal
                isOpen={isConfirmBookingModalOpen}
                contentLabel="Confirm Modal"
            >
                <div>
                    <h2 style={{marginTop:'100px'}}>Logged in succesfully</h2>
                </div>
            </Modal>
             {pageLoading && props.authenticated && <FontAwesomeIcon icon={faSpinner}
                spin size="10x" color="#5692F5" style={{ margin: '0 auto', marginTop: "120px" }} />}
            {props.authenticated && !pageLoading &&
                <div className="sidebar">
                    <h1 className="title">Your Account</h1>
                    <div className="container-new">
                        <div className="personal-details-new">
                            <h2 className="account-heading">Account Details</h2>
                            <div className='photo-container'>


                                {picturePath.includes('nothing') &&
                                    <img src={profile} alt="2Profile Picture"
                                        style={{ height: '150px', width: '150px', borderRadius: '50%' }}
                                        className='profile-picture'
                                        onClick={() => { document.querySelector('.profile-file-selector').click(); }}
                                    />}
                                {!picturePath.includes('nothing') &&
                                    <img src={picturePath} alt="2Profile Picture"
                                        style={{ height: '170px', width: '170px', borderRadius: '50%', objectFit: 'cover' }}
                                        className='profile-picture'
                                        onClick={() => { document.querySelector('.profile-file-selector').click(); }}
                                    />}
                               

                                <input type="file" style={{ display: 'none' }} onChange={onChangeProfilePic}
                                    accept="image/jpeg, image/png" className='profile-file-selector' />
                                {showUpdateMessage && <p className='p-update-profile' onClick={onSubmitProfilePic}>Update Profile Picture</p>}
                                {!showUpdateMessage && <p>Your Profile Picture</p>}
                            </div>
                            <div>
                                <h2 className="personal-information-heading">Personal Information</h2>
                                <ul>
                                    {verified === 'no' &&
                                        <section className='verified-div'><li>Not verified</li>
                                            <FontAwesomeIcon icon={faTimesCircle} color="black" style={{ fontSize: '24px', marginTop: '9px', marginLeft: '10px' }} />

                                        </section>}
                                    {verified === 'yes' &&
                                        <section className='verified-div'>
                                            <li>Account verified</li>
                                            <FontAwesomeIcon icon={faCheckCircle} color=" #5692F5" style={{ fontSize: '24px', marginTop: '8px', marginLeft: '10px' }} />
                                        </section>}

                                    <li>{firstName} {LastName}</li>
                                    <li>{username}</li>
                                    <li>{phone}</li>

                                </ul>
                            </div>
                        </div>
                        <div className='driving-and-account'>
                            <div className="driving-new">
                                <h2 className="account-heading">Driving</h2>
                                <ul className="clickable-list">
                                    <li><a href="/bookings" className='my-bookings'>My Bookings</a></li>
                                    <li><a href="/hostMenu" className='my-listings'>My Listings</a></li>
                                    <li><a href="/reviewsByYou" className='my-reviews'>Reviews Left by You</a></li>
                                    <li><a href="/reviewsForYou" className='other-reviews'>Reviews Left for You</a></li>
                                </ul>
                            </div>

                            <div className="account-new">
                                <h2 className="account-heading">Account</h2>
                                <ul className="clickable-list">
                                    {/* <li>Forgot Password</li> */}
                                    <li type="button" onClick={setShowFormtrue}>Verify identity</li>
                                    <li onClick={handleSignOut}>Log out</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {showForm && verified === 'no' && <div className='upload-licence-form'>
                        <img src={close} alt="Logo" style={{ width: '50px', position: 'absolute', right: 10, top: 10, cursor: 'pointer' }}
                            onClick={setShowFormFalse} />
                        <div className='form-elements'>
                            <h2 style={{ marginLeft: '120px' }}> Verify your identity</h2>
                            <div className='verification-photos'>
                                <div>
                                    <img className='verification-photo' src={verificationPhoto} alt="1Profile Picture"
                                        onClick={() => { document.querySelector('.verification-photo-selector').click(); }} />
                                    <p>Photo of yourself</p>
                                </div>

                                <div className='licence-photo-div'>

                                    <img className='licence-photo' src={licence} alt="1Profile Picture"
                                        onClick={() => { document.querySelector('.licence-photo-selector').click(); }} />
                                    <p>Photo of licence</p>
                                </div>
                            </div>


                            <input type="file" className='verification-photo-selector' style={{ display: 'none' }}
                                onChange={onChangeVerificationPhoto} accept="image/jpeg, image/png" />

                            <input type="file" className='licence-photo-selector' style={{ display: 'none' }}
                                onChange={onChangeLicence} accept="image/jpeg, image/png" />
                            <br />
                            {submitVerificationPhoto !== '' && submitLicence !== '' && !uploadhit &&
                                <div>
                                    <button type="button" className='upload-licence-button'
                                        onClick={handleSubmitLicence}>Upload</button>
                                    <br /><br />
                                </div>}

                            {loading && uploadhit && <FontAwesomeIcon icon={faSpinner}
                                spin size="2x" color="#5692F5" style={{ marginLeft: '50px' }} />}


                            {/* {loading && uploadhit && <p style={{ marginLeft: '20px' }}>Loading....</p>} */}
                            {!loading && (
                                <div>
                                    {!authentic &&
                                        <p style={{ fontWeight: 'bold', marginLeft: '60px' }}>Your Driving Licence is not Authentic</p>}
                                    {!identical &&
                                        <p style={{ fontWeight: 'bold', marginLeft: '60px' }}>Your licence photo does not look the same as your photo</p>}
                                </div>
                            )}

                        </div>
                    </div>
                    }

                    {showForm && verified === 'yes' && <div className='upload-licence-form'>
                        <img src={close} alt="Logo"
                            style={{ width: '50px', position: 'absolute', right: 10, top: 10, cursor: 'pointer' }}
                            onClick={setShowFormFalse} />
                        <h2 style={{ position: 'absolute', top: 10, left: 260 }}>Your Account is Verified</h2>
                        <p style={{ position: 'absolute', top: 60, left:180 }}>Your Driving Licence</p>
                        <img src={savedLicence} alt="database licence" style={{ width: '400px', objectFit: 'contain' }} />
                        <button type="button" className='upload-licence-button' style={{ position: 'absolute', bottom: 50, left: 230 }}
                            onClick={reuploadDocuments}>Reupload Documents</button>
                    </div>
                    }


                </div>}


            {!props.authenticated && <div>
                <h1 className='login-h1'>Log into your account</h1>
                <div className='login-div'>
                    <p className='email-pass'>Email</p>
                    <input className='user'
                        type="text"
                        value={username}
                        onChange={handleUsername}

                    />
                    <p className='email-pass'>Password</p>
                    <input className='pass'
                        type="password"
                        value={password}
                        onChange={handlePassword}


                    />
                    <br></br>
                    <input className='login-button'
                        type="button"
                        value="Log in"
                        onClick={handleClick}
                        /><br></br>
                    {/* <p className='forgot'>Forgotten your password?</p> */}
                </div>
                <p className='sign-up'>Don't have an account? <Link to="/register" className="sign-up-link">Sign up</Link></p>
                <p style={{color:'red'}}>{loginStatus}</p>
            </div>
            }
        </div>
    )

}
export default Login;


