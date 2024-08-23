import React, { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import './Register.css'; // Import custom CSS for additional styling

const Register = () => {
  const [formData, setFormData] = useState({
    userFullName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.userFullName) {
      errors.userFullName = "Name is required";
    } else if (formData.userFullName.length > 30) {
      errors.userFullName = "Name length can't be more than 30 characters";
    }

    if (!formData.emailId) {
      errors.emailId = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      errors.emailId = "Invalid Email Address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must be 8-16 characters long and include at least one uppercase letter, one special character, and one digit.";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    } else if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axiosInstance.post(
          "https://localhost:7270/api/Users/Register",
          {
            userFullName: formData.userFullName,
            emailId: formData.emailId,
            password: formData.password,
            role: "customer",
          }
        );
        setSuccessMessage("Registration successful!");
        setFormData({
          userFullName: "",
          emailId: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors({ apiError: error.response.data });
        } else {
          setErrors({ apiError: "An error occurred during registration." });
        }
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Register</h4>
            </div>
            <div className="card-body">
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="userFullName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.userFullName ? "is-invalid" : ""}`}
                    id="userFullName"
                    name="userFullName"
                    value={formData.userFullName}
                    onChange={handleChange}
                  />
                  {errors.userFullName && <div className="invalid-feedback">{errors.userFullName}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.emailId ? "is-invalid" : ""}`}
                    id="emailId"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                  />
                  {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>

                {errors.apiError && <div className="alert alert-danger">{errors.apiError}</div>}

                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
