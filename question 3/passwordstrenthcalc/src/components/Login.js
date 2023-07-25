import './Login.css'
import React, { useState } from 'react';

function minStepsToMakePasswordStrong(password)  {
  let steps = 0;
  let missingConditions = 3; 
  if (password.length < 6) {
    steps += 6 - password.length;
    if(password.length <= 5) return 6-password.length;
  }
  if (/[a-z]/.test(password)) {
    missingConditions--;
  }

  if (/[A-Z]/.test(password)) {
    missingConditions--;
  }

  if (/\d/.test(password)) {
    missingConditions--;
  }

  if(missingConditions == 1 && password.length == 5) return steps;
  steps += missingConditions;

  
  for (let i = 2; i < password.length; i++) {
    if (password[i] === password[i - 1] && password[i] === password[i - 2]) {
      steps++;
      break;
    }
  }

  return steps;
}
const LoginForm = () => {
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [remainingSteps, setRemainingSteps] = useState(0);
  
    const handlePasswordChange = (event) => {
      const newPassword = event.target.value;
      const steps = minStepsToMakePasswordStrong(newPassword);
      setPassword(newPassword);
      setRemainingSteps(steps);
  
      if (steps === 0) {
        setPasswordStrength('Strong');
      } else {
        setPasswordStrength('Weak');
      }
    };
  
    return (
      <form className="form">
        <p>Login</p>
        <div className="group">
          <input
            required={true}
            className="main-input"
            type="text"
            placeholder="Email"
          />
          <span className="highlight-span"></span>
          <label className="label-email">Email</label>
        </div>
        <div className="container-1">
          <div className="group">
            <input
              required={true}
              className="main-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            <span className="highlight-span"></span>
            <label className="label-email">Password</label>
          </div>
        </div>
        <button className="submit">Submit</button>
  
        <p style={{ color: passwordStrength === 'Strong' ? 'green' : 'red' }}>
          Password Strength: {passwordStrength}
        </p>
        <p>Minimum Steps Remaining: {remainingSteps}</p>
      </form>
    );
  };
  
  export default LoginForm;