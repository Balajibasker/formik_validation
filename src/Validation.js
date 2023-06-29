import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Validation = () => {
  const [message, setMessage] = useState('');
  const countryCodes = [
    { value: '+1', label: '+1' },
    { value: '+44', label: '+44' },
    { value: '+91', label: '+91' },
    
  ];

  const countryOptions = [
    { value: 'us', label: 'United States', code: '+1' },
    { value: 'ca', label: 'India', code: '+91' },
    { value: 'uk', label: 'United Kingdom', code: '+44' },
  ];

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(50, 'Username cannot exceed 50 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    gender: Yup.string().required('Gender is required'),
    country: Yup.string().required('Country is required'),
    mobileNumber: Yup.string()
      .matches(/^\d+$/, 'Mobile Number must only contain digits')
      .min(10, 'Mobile Number must be at least 10 digits')
      .max(15, 'Mobile Number cannot exceed 15 digits')
      .required('Mobile Number is required'),
    mobileCode: Yup.string().required('Mobile Code is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      gender: '',
      country: '',
      mobileNumber: '',
      mobileCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/login', values);
        setMessage(response.data.message);
        toast.success(response.data.message);
      } catch (error) {
        console.error(error);
        toast.error('An error occurred.');
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="card mt-5" style={{ marginLeft: 10, marginRight: 10 }}>
          <div className="container-fluid">
            <div className="row gy-5" style={{ marginTop: 10 }}>
              <h4 style={{ marginTop: 10 }}>Validations</h4>
              <div className="col-4">
                <label>Username</label>
                <input
                  className="form-control w-50"
                  type="text"
                  {...formik.getFieldProps('username')}
                  placeholder="Username"
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-danger">{formik.errors.username}</div>
                )}
              </div>
              <div className="col-4">
                <label>Email</label>
                <input
                  className="form-control w-50"
                  type="email"
                  {...formik.getFieldProps('email')}
                  placeholder="Email"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>
              <div className="col-4">
                <label>Password</label>
                <input
                  className="form-control w-50"
                  type="password"
                  {...formik.getFieldProps('password')}
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger">{formik.errors.password}</div>
                )}
              </div>
              <div className="col-4">
                <label>Confirm Password</label>
                <input
                  className="form-control w-50"
                  type="password"
                  {...formik.getFieldProps('confirmPassword')}
                  placeholder="Confirm Password"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className="text-danger">{formik.errors.confirmPassword}</div>
                )}
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
                      checked={formik.values.gender === 'male'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={formik.values.gender === 'female'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-danger">{formik.errors.gender}</div>
                )}
              </div>
              <div className="col-4">
                <label>Country</label>
                <Select
                  options={countryOptions}
                  value={countryOptions.find(option => option.value === formik.values.country)}
                  onChange={selectedOption => formik.setFieldValue('country', selectedOption.value)}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="text-danger">{formik.errors.country}</div>
                )}
              </div>
              <div className="col-4">
                <label>Mobile Number</label>
                <div style={{ display: 'flex', flexDirection: 'row', width: 300 }}>
                  <Select
                    options={countryCodes}
                    value={countryCodes.find(option => option.value === formik.values.mobileCode)}
                    onChange={selectedOption => formik.setFieldValue('mobileCode', selectedOption.value)}
                  />
                  <input
                    className="form-control w-50"
                    type="tel"
                    {...formik.getFieldProps('mobileNumber')}
                    placeholder="Mobile Number"
                  />
                </div>
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <div className="text-danger">{formik.errors.mobileNumber}</div>
                )}
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

