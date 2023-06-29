import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PasswordValidation = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const calculatePasswordStrength = () => {
    let passwordStrength = password.length >= 8 ? 25 : 0; // Minimum length requirement
  
    const containsNumbers = /\d/.test(password);
    const containsSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const containsUppercase = /[A-Z]/.test(password);
    const containsLowercase = /[a-z]/.test(password);
  
    passwordStrength += containsNumbers ? 25 : 0; 
    passwordStrength += containsSpecialChars ? 25 : 0; 
    passwordStrength += containsUppercase ? 12.5 : 0; 
    passwordStrength += containsLowercase ? 12.5 : 0; 
  
    return passwordStrength;
  };
  

  const isPasswordValid = () => {
    return true;
  };

  const isConfirmPasswordValid = () => {
    return password === confirmPassword;
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 100) {
      return 'bg-success';
    } else if (progress >= 75) {
      return 'bg-warning';
    } else if (progress >= 50) {
      return 'bg-info';
    } else {
      return 'bg-danger';
    }
  };

  const passwordStrength = calculatePasswordStrength();
  const progressBarColor = getProgressBarColor(passwordStrength);
  const isPasswordMatch = isConfirmPasswordValid();
  const isFormValid = isPasswordValid() && isPasswordMatch;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" className="form-control" value={password} onChange={handlePasswordChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password:</label>
            <input type="password" className="form-control" value={confirmPassword} onChange={handleConfirmPasswordChange} />
          </div>

          {password && (
            <div>
              <div className="progress">
                <div className={`progress-bar ${progressBarColor}`} role="progressbar" style={{ width: `${passwordStrength}%` }}></div>
              </div>
              <p className="mt-2">Password Strength: {passwordStrength}%</p>
            </div>
          )}

          {password && !isPasswordMatch && <p className="text-danger">Passwords do not match!</p>}

          <button className="btn btn-primary" disabled={!isFormValid}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordValidation;
