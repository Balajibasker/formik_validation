import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Validation = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [mobileCode, setMobileCode] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform client-side form validations

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
  username,
  email,
  password,
  gender,
  country,
  mobileNumber,
  mobileCode,
});
      setMessage(response.data.message);
      toast.success(response.data.message); 
    } catch (error) {
      console.error(error);
      toast.error('An error occurred.'); 
    }
  };

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption);
    setMobileCode(selectedOption.code);
  };

  const countryCodes = [
    { value: '+1', label: '+1' },
    { value: '+44', label: '+44' },
    { value: '+91', label: '+91' },
    // Add more country codes as needed
  ];

  const countryOptions = [
    { value: 'us', label: 'United States', code: '+1' },
    { value: 'ca', label: 'India', code: '+91' },
    { value: 'uk', label: 'United Kingdom', code: '+44' },
    
  ];

  return (
    <>
    <form onSubmit={handleLogin}>
      <div className="card mt-5" style={{ marginLeft: 10, marginRight: 10 }}>
        <div className="container-fluid">
          <div className="row gy-5" style={{ marginTop: 10 }}>
            <h4 style={{ marginTop: 10 }}>Validations</h4>
            <div className="col-4">
              <label>Username</label>
              <input
                className="form-control w-50"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className="col-4">
              <label>Email</label>
              <input
                className="form-control w-50"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="col-4">
              <label>Password</label>
              <input
                className="form-control w-50"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="col-4">
              <label>Gender</label>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: 10 }}>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>
            <div className="col-4">
              <label>Country</label>
              <Select
                options={countryOptions}
                value={countryOptions.find(option => option.code === mobileCode)}
                onChange={(selectedOption) => setMobileCode(selectedOption.code)}
                required
              />
            </div>
            <div className="col-4">
              <label>Mobile Number</label>
              <div style={{ display: 'flex', flexDirection: 'row', width: 300 }}>
                <Select
                  options={countryCodes}
                  value={countryCodes.find(option => option.value === mobileCode)}
                  onChange={(selectedOption) => setMobileCode(selectedOption.value)}
                  required
                />
                <input
                  className="form-control w-50"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Mobile Number"
                  required
                />
              </div>
            </div>
            <div className="col-11">
              <button className="btn btn-primary float-end" type="submit">
                Submit form
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <ToastContainer /> {/* Toaster container component */}
    </>
  );
};

export default Validation;


