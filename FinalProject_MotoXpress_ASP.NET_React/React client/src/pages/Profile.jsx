import React, { useEffect, useState } from "react";
import { addProfileDetails, getCities, getCityById, getUserDetails, updateProfileDetails, viewProfile } from "../services/api";

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [uploadedDocument, setUploadedDocument] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState({});
  const [cityName, setCityName] = useState('');
  const [username, setUsername] = useState('');
  const [getcities, setGetcities] = useState([]);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    address: "",
    dlnumber: "",
    profilePhoto: "",
    dluploadedDocument: "",
    userId: "",
    userFullName: "",
    cityId: ""
  });
  const [detailsExist, setDetailsExist] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "phoneNumber") {
      if (!/^\d{0,10}$/.test(value)) {
        errorMsg = "Phone number should contain only digits and be up to 10 characters.";
      }
    } else if (name === "address") {
      if (!value.trim()) {
        errorMsg = "Address is required.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg
    }));
  };

  const fetchUser = async () => {
    const currentUser = await getUserDetails();
    const email = localStorage.getItem('emailId');
    const current_user = currentUser.data.filter((user) => user.emailId === email);
    console.log("current_user",current_user);
    
    setUserId(current_user[0].userId);
    setFormData((prevData) => ({
      ...prevData,
      userId: current_user[0].userId,
      userFullName: current_user[0].userFullName,
    }));
  };

  const fetchCity = async () => {
    const cities = await getCities();
    setGetcities(cities);
  };

  const fetchProfileDetails = async () => {
    try {
      const currentUser = await getUserDetails();
      const email = localStorage.getItem('emailId');
      const current_user = currentUser.data.filter((user) => user.emailId === email);
      
      const res = await viewProfile(current_user[0].userId);
      setUserId(current_user[0].userId);
      setUsername(current_user[0].userFullName);
      
      if (res !== null) {
        const cityResponse = await getCityById(res.data.cityId);

        setFormData({
          phoneNumber: res.data.phoneNumber,
          address: res.data.address,
          dlnumber: res.data.dlnumber,
          profilePhoto: res.data.profilePhoto,
          dluploadedDocument: res.data.dluploadedDocument,
          userFullName: current_user[0].userFullName,
          userId: current_user[0].userId,
          cityId: res.data.cityId,
        });

        setCityName(cityResponse.data.cityName);
        setDetailsExist(true);  // Data exists, so set detailsExist to true
      }
    } catch (error) {
      console.error("Error fetching profile details:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
    fetchCity();
    fetchUser()
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
    validateField(name, value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          profilePhoto: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(file.type)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dluploadedDocument: "Only image files (jpeg, png, gif) are allowed for the driver's license document."
            }));
            return;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            dluploadedDocument: ""
        }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadedDocument(reader.result);
            setFormData((prevData) => ({
                ...prevData,
                dluploadedDocument: reader.result
            }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    const selectedCity = getcities.find(city => city.cityId === parseInt(selectedCityId));
    setCityName(selectedCity.cityName);
    setFormData((prevData) => ({
      ...prevData,
      cityId: selectedCityId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchUser();
    console.log("FormData",formData);
    
    const profileData = {
        ...formData,
    };

    try {
        let res;
        if (detailsExist) {
            res = await updateProfileDetails(userId, profileData);
        } else {
            res = await addProfileDetails(profileData);
        }

        fetchProfileDetails();
        setEditMode(false);
    } catch (error) {
        console.error("Error submitting profile details:", error);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        {!editMode && detailsExist && (
          <div className="card">
            <div className="card-body text-center">
              {formData.profilePhoto ? (
                <img src={formData.profilePhoto} alt="Profile" className="card-img-top rounded-circle" style={{ width: "150px", height: "150px" }} />
              ) : (
                <p>No Profile Photo</p>
              )}
              <h5 className="card-title mt-3">Name: {formData.userFullName}</h5>
              <p className="card-text">Phone Number: {formData.phoneNumber}</p>
              <p className="card-text">Address: {formData.address}</p>
              <p className="card-text">City: {cityName}</p>
              <p className="card-text">Driver's License Number: {formData.dlnumber}</p>
              {formData.dluploadedDocument ? (
                <a href={formData.dluploadedDocument} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Document</a>
              ) : (
                <p>No Document Uploaded</p>
              )}
              <br/>
              <button className="btn btn-secondary mt-3" onClick={() => setEditMode(true)}>Edit</button>
            </div>
          </div>
        )}

        {(editMode || !detailsExist) && (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="text"
                className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="dlnumber" className="form-label">Driver's License Number</label>
              <input
                type="text"
                className="form-control"
                id="dlnumber"
                name="dlnumber"
                value={formData.dlnumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cityId" className="form-label">City</label>
              <select
                className="form-control"
                id="cityId"
                name="cityId"
                value={formData.cityId}
                onChange={handleCityChange}
                required
              >
                <option value="">Select City</option>
                {getcities.map((city) => (
                  <option key={city.cityId} value={city.cityId}>
                    {city.cityName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="profilePhoto" className="form-label">Profile Photo</label>
              <input
                type="file"
                className="form-control"
                id="profilePhoto"
                name="profilePhoto"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
              {profilePicture && <img src={profilePicture} alt="Profile Preview" className="mt-3" style={{ width: "100px", height: "100px" }} />}
            </div>
            <div className="mb-3">
              <label htmlFor="dluploadedDocument" className="form-label">Driver's License Document</label>
              <input
                type="file"
                accept="image/*"
                className={`form-control ${errors.dluploadedDocument ? 'is-invalid' : ''}`}
                id="dluploadedDocument"
                name="dluploadedDocument"
                onChange={handleDocumentChange}
              />
              {errors.dluploadedDocument && <div className="invalid-feedback">{errors.dluploadedDocument}</div>}
              {uploadedDocument && <a href={uploadedDocument} target="_blank" rel="noopener noreferrer">View Uploaded Document</a>}
            </div>
            <button type="submit" className="btn btn-primary">
              {detailsExist ? "Update" : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;