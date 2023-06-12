import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import withRouter from react-router-dom
// import profile from './profile3.jpg';
import './Register.css'; // import your own CSS styles
import Modal from 'react-modal';


function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [registerError, setRegisterError] = useState('');

    const navigate = useNavigate();
    Modal.setAppElement('#root'); // Set the app element for accessibility
    const [isConfirmBookingModalOpen, setIsConfirmBookingModalOpen] = useState(false);

    const [users, setUsers] = useState([]);
    useEffect(() => {

        fetch('https://razwebdev.com/p2pcarsharing/api/users')
            .then((response) => response.json())
            .then((json) => {
                setUsers(json.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    const validateEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return phoneRegex.test(phone);
    };


    const handldeSubmit = () => {

        const filteredUsers = users.filter((user) => user.email === email);

        if (firstName === '' || lastName === '' || email === '' || phone === '' || password === '' || repeatPassword === '')
            setRegisterError("please complete all the fields");

        else
            if (password !== repeatPassword)
                setRegisterError("passwords do not match");
            else if (filteredUsers.length !== 0)
                setRegisterError("an account with this email is already registered");
            else if (!isValidEmail)
                setRegisterError('email address not valid');
            else if (!isValidPhone)
                setRegisterError('phone number is not valid')
            else {
                setIsConfirmBookingModalOpen(true);
                setTimeout(() => {
                    const formData = new FormData();
                    formData.append('first_name', firstName);
                    formData.append('last_name', lastName);
                    formData.append('email', email);
                    formData.append('phone', phone);
                    formData.append('password', password);


                    fetch("https://razwebdev.com/p2pcarsharing/api/register",
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
                                navigate(`/login`);
                            })
                        .catch(
                            (e) => {
                                console.log(e.message)
                            })
                }, 1000);

            }


    }

    const [isValidEmail, setIsValidEmail] = useState(false);

    const [isValidPhone, setIsValidPhone] = useState(false);


    const handleFirstName = (event) => {
        const input = event.target.value.replace(/[^a-zA-Z]/g, "");
        event.target.value = input;
        setFirstName(input);
    }

    const handleLastName = (event) => {
        const input = event.target.value.replace(/[^a-zA-Z]/g, "");
        event.target.value = input;
        setLastName(input);    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
        setIsValidEmail(validateEmail(event.target.value));

    }

    const handlePhone = (event) => {
        setPhone(event.target.value);
        setIsValidPhone(validatePhone(event.target.value));
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleRepeatPassword = (event) => {
        setRepeatPassword(event.target.value);
    }

    return (

        <div className='register-form' autoComplete='0'>
            <h1 className='register-h1'>Sign up</h1>
            <p style={{ color: 'red' }}>{registerError}</p>
            <input className='input-register' 
                pattern="[^0-9]*"
                type="text"
                placeholder="First Name"
                name="first_name"
                onChange={handleFirstName}
                required
                autoComplete="off"
            />
            <input className='input-register'
                type="text"
                pattern="[a-zA-Z]*"
                placeholder="Last Name"
                name="last_name"
                onChange={handleLastName}
                required
                autoComplete="off"
            />
            <input className='input-register'
                type="text"
                placeholder="Email Address"
                onChange={handleEmail}
                name="email"
                required
                style={{ outline: 'none', border: isValidEmail ? '2px solid green' : '2px solid red' }}
                autoComplete="off"
            />
            <input className='input-register-phone'
                type="number"
                placeholder="Phone Number"
                onChange={handlePhone}
                required
                name="phone"
                style={{ outline: 'none', border: isValidPhone ? '2px solid green' : '2px solid red' }}
                autoComplete="off"
            />
            <input className='input-register-password'
                type="password"
                placeholder="Password"
                onChange={handlePassword}
                required
                name="password1"
                autoComplete="off"
            />
            <input className='input-register-password'
                type="password"
                name="password2"
                placeholder="Repeat Password"
                onChange={handleRepeatPassword}
                required
                autoComplete="off"
            />
            <input className='register-login-button'
                type="button"
                value="Sign Up"
                onClick={handldeSubmit}
                style={{ cursor: 'pointer' }}
                autoComplete="off"
            />
            <Modal
                isOpen={isConfirmBookingModalOpen}
                contentLabel="Confirm Modal"
            >
                <div>
                    <h2 style={{margin:'0 auto', marginTop:"80px"}}>Your account has been registered succesfully</h2>
                </div>
            </Modal>
        </div>

    )

}
export default Register;