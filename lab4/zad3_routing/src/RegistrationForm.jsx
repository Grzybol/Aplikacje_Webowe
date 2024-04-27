import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    login: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error on input change
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", formData);
    }
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.email.includes('@')) {
      errors.email = 'Email musi zawierać @.';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Hasła nie są identyczne.';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Login:</label>
        <input type="text" name="login" value={formData.login} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label>Hasło:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <div>
        <label>Powtórz hasło:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
      </div>
      <button type="submit">Zarejestruj się</button>
    </form>
  );
};

export default RegistrationForm;
