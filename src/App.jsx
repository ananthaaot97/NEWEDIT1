// Import React library and hooks
import React, { useState } from "react";
import "./App.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  dob: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value, allValues = formData) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required";
        return "";
      case "email":
        if (!value) return "Email ID is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Email address is invalid";
        return "";
      case "phone":
        if (!value) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
        return "";
      case "country":
        if (!value) return "Please select country";
        return "";
      case "dob":
        if (!value) return "Date of birth required";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be 8+ chars";
        return "";
      case "confirmPassword":
        if (!value) return "Confirm Password is required";
        if (value !== allValues.password) return "Passwords do not match";
        return "";
      case "terms":
        if (!value) return "Accept terms to proceed";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, formData[key], formData);
      if (msg) nextErrors[key] = msg;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updated = { ...formData, [name]: type === "checkbox" ? checked : value };
    setFormData(updated);

    if (touched[name]) {
      const msg = validateField(name, updated[name], updated);
      setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const msg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      country: true,
      dob: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });

    if (validateForm()) {
      alert("Account Created Successfully ✅");
      setFormData(initialForm);
      setErrors({});
      setTouched({});
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group half">
              <label>First Name *</label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="form-group half">
              <label>Last Name *</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Email *</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group half">
              <label>Phone *</label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.country}
              >
                <option value="">Select…</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
              {errors.country && <span className="error">{errors.country}</span>}
            </div>
            <div className="form-group half">
              <label>Date of Birth *</label>
              <input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.dob}
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Password *</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.password}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="form-group half">
              <label>Confirm Password *</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />{" "}
              I agree to Terms & Conditions
            </label>
            {errors.terms && <span className="error">{errors.terms}</span>}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default App;
