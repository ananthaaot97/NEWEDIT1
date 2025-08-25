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
  profilePic: null,
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    const { name, value, type, checked, files } = e.target;
    const updated = {
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    };
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
      alert("Account Created Successfully For Anime updates✅");
      setFormData(initialForm);
      setErrors({});
      setTouched({});
    }
  };

  return (
    <div className="perplexity-bg dark-bg">
      <div className="form-container wider blur">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h2 className="form-title">Create Account</h2>
          <div className="subtitle">Join our for Anime community by filling the information below.</div>
          
          {/* Profile picture (optional) */}
          <div className="profile-upload-row">
            <label htmlFor="profilePic" className="profile-label">
              <span role="img" aria-label="Profile"></span> Profile Photo (optional)
            </label>
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="profile-input"
            />
            {formData.profilePic && (
              <img
                src={URL.createObjectURL(formData.profilePic)}
                alt="Preview"
                className="profile-preview"
              />
            )}
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>First Name *</label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.firstName}
                className={errors.firstName ? "invalid" : ""}
                autoComplete="given-name"
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="input-group">
              <label>Last Name *</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.lastName}
                className={errors.lastName ? "invalid" : ""}
                autoComplete="family-name"
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Email *</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.email}
                className={errors.email ? "invalid" : ""}
                autoComplete="email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-group">
              <label>Phone *</label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.phone}
                className={errors.phone ? "invalid" : ""}
                autoComplete="tel"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.country}
                className={errors.country ? "invalid" : ""}
              >
                <option value="">Select…</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
              {errors.country && <span className="error">{errors.country}</span>}
            </div>
            <div className="input-group">
              <label>Date of Birth *</label>
              <input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.dob}
                className={errors.dob ? "invalid" : ""}
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Password *</label>
              <div className="password-row">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.password}
                  className={errors.password ? "invalid" : ""}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="showpwd-btn"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "○" : "◉"}
                </button>
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="input-group">
              <label>Confirm Password *</label>
              <div className="password-row">
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.confirmPassword}
                  className={errors.confirmPassword ? "invalid" : ""}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="showpwd-btn"
                  tabIndex={-1}
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          </div>
          <div className="checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <span>I agree to Terms & Conditions</span>
            </label>
            {errors.terms && <span className="error">{errors.terms}</span>}
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        <div className="form-footer">
          <span>Already have an account?</span>{" "}
          <a href="#" className="login-link">Login</a>
        </div>
      </div>
    </div>
  );
}

export default App;
