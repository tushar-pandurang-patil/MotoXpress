import axiosInstance from '../services/axiosInstance';

const API_URL = 'https://localhost:7270/api'; //backend API URL

const getTokenFromURL = () => {
  const url = new URL(window.location.href);
  return url.searchParams.get('token');
};

export const register=async(userData)=>{
  const response=await axiosInstance.post(`${API_URL}/Users/Register`,userData)
  return response
}

// export const login=async(userData)=>{
//   const response=await axiosInstance.post(`${API_URL}/Users/Login`,userData)
//   return response
// }

// export const revokeToken = async (token) => {
//     try {
//         console.log("Attempting to revoke token:", token);
//         const response = await axiosInstance.post(`${API_URL}/Users/RevokeToken`, { token });
//         console.log("Token revoked successfully:", response.data);
//         return response;
//     } catch (error) {
//         console.error("Error revoking token:", error);
//         throw error;
//     }
// };

export const getBikes=async()=>{
  const token = localStorage.getItem("token");
  console.log("token",token);

  const response=await axiosInstance.get(`${API_URL}/Bikes`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
      })
  return response
}

export const getBikeById = async (id) => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  try {
      const response = await axiosInstance.get(`${API_URL}/Bikes/${id}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      console.log("Response::::",response);
      
      return response;
  } catch (error) {
      if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Error Response:", error.response);
      } else if (error.request) {
          // Request was made but no response was received
          console.error("Error Request:", error.request);
      } else {
          // Something else caused the error
          console.error("Error Message:", error.message);
      }
      throw error; // Re-throw the error after logging it
  }
};

export const createBike=async(data)=>{
  const token = localStorage.getItem("token");
  console.log("token",token,data);

  const response = await axiosInstance.post(`${API_URL}/Bikes`, data, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).catch(error => {
      console.error("Error:", error.response || error.message);
  });
  
  return response;
}

export const updateBike=async(id,data)=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.put(`${API_URL}/Bikes/${id}`,data,{ 
      headers: {
       'Authorization': `Bearer ${token}`
      }
  }).catch(error => {
      console.error("Error:", error.response || error.message);
  });
  return response
}

export const deleteBike=async(id)=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.delete(`${API_URL}/Bikes/${id}`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  return response
}

// export const getCities=async()=>{
//   const token = localStorage.getItem("token");
//   console.log("token",token);
//   const response=await axiosInstance.get(`${API_URL}/Cities`,)
//   return response
// }

export const getCities = async () => {
  try {
      const response = await fetch(`${API_URL}/Cities`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching cities:', error);
      return []; // Return an empty array on error
  }
};

export const getCityById=async(id)=>{
  const response=await axiosInstance.get(`${API_URL}/Cities/${id}`,)
  return response
}

export const createCity=async(data)=>{
  const token = localStorage.getItem("token");
  console.log("token",token,data);
  
  const response=await axiosInstance.post(`${API_URL}/Cities`,data,{
      headers:{
          'Authorization': `Bearer ${token}`
      }
  })
  return response
}

export const updateCity=async(data)=>{
  const token = localStorage.getItem("token");
  console.log("token",token,data);
  
  const response=await axiosInstance.put(`${API_URL}/Cities`,data,{
      headers:{
          'Authorization': `Bearer ${token}`
      }
  })
  return response
}

export const deleteCity=async(id)=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  
  const response=await axiosInstance.delete(`${API_URL}/Cities/${id}`,{
      headers:{
          'Authorization': `Bearer ${token}`
      }
  })
  return response
}

export const getRentalRecords=async()=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.get(`${API_URL}/Rentalrecords`,{
      headers:{
          'Authorization': `Bearer ${token}`

      }
  })
  return response
}

export const getRentalRecordById=async(id)=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.get(`${API_URL}/Rentalrecords/${id}`,{
      headers:{
          'Authorization': `Bearer ${token}`

      }
  })
  return response
}

export const createRentalRecord=async(data)=>{
  const token = localStorage.getItem("token");
  console.log("token",token,data);

  const response = await axiosInstance.post(`${API_URL}/Rentalrecords`, data, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).catch(error => {
      console.error("Error:", error.response || error.message);
  });
  
  return response;
}

export const updateRentalRecord=async(id,data)=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.put(`${API_URL}/Rentalrecords/${id}`,data,{ 
      headers: {
       'Authorization': `Bearer ${token}`
      }
  }).catch(error => {
      console.error("Error:", error.response || error.message);
  });
  return response
}

export const deleteRentalRecord=async(id)=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  
  const response=await axiosInstance.delete(`${API_URL}/Rentalrecords/${id}`,{
      headers:{
          'Authorization': `Bearer ${token}`
      }
  })
  return response
}


export const getUsers=async()=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.get(`${API_URL}/Users`,{
      headers:{
          'Authorization': `Bearer ${token}`

      }
  })
  return response
}

export const getUserById=async(id)=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.get(`${API_URL}/Users/${id}`,{
      headers:{
          'Authorization': `Bearer ${token}`

      }
  })
  return response
}

export const createUser=async(data)=>{
  const token = localStorage.getItem("token");
  console.log("token",token,data);

  const response = await axiosInstance.post(`${API_URL}/Users`, data, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).catch(error => {
      console.error("Error:", error.response || error.message);
  });
  
  return response;
}

export const updateUser=async(id,data)=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.put(`${API_URL}/Users/${id}`,data,{ 
      headers: {
       'Authorization': `Bearer ${token}`
      }
  }).catch(error => {
      console.error("Error:", error.response || error.message);
  });
  return response
}

export const deleteUser=async(id)=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.delete(`${API_URL}/Users/${id}`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  return response
}


export const getUserProfiles=async()=>{
    const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.get(`${API_URL}/Userprofiles`,{
      headers:{
          'Authorization': `Bearer ${token}`

      }
  })
  return response
}

export const getUserProfileById=async(id)=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.get(`${API_URL}/Userprofiles/${id}`,{
      headers:{
          'Authorization': `Bearer ${token}`

      }
  })
  return response
}

export const createUserProfile=async(data)=>{
  const token = localStorage.getItem("token");
  console.log("token",token,data);

  const response = await axiosInstance.post(`${API_URL}/Userprofiles`, data, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }).catch(error => {
      console.error("Error:", error.response || error.message);
  });
  
  return response;
}

export const updateUserProfile=async(id,data)=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.put(`${API_URL}/Userprofiles/${id}`,data,{ 
      headers: {
       'Authorization': `Bearer ${token}`
      }
  }).catch(error => {
      console.error("Error:", error.response || error.message);
  });
  return response
}

export const deleteUserProfile=async(id)=>{
  const token = localStorage.getItem("token");
  console.log("token",token);
  const response=await axiosInstance.delete(`${API_URL}/Userprofiles/${id}`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  return response
}

// Profile APIs

export const addProfileDetails = async (data) => {
    const token = localStorage.getItem("token");
    console.log("add profile", token);
    try {
        const response = await axiosInstance.post(`${API_URL}/Userprofiles`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error adding profile details:", error);
        throw error;
    }
};


export const getUserDetails = async () => {
    try {
        const token = localStorage.getItem("token");
        console.log("token", token);

        const response = await axiosInstance.get(`${API_URL}/Users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("response", response.data);
        return response;
    } catch (error) {
        console.error("Error fetching user details:", error.response?.status, error.response?.data);
        if (error.response?.status === 401) {
            console.log("Unauthorized: The token might be invalid or expired.");
        }
        throw error;
    }
};

export const updateProfileDetails = async (id, data) => {
    const token = localStorage.getItem("token");
    console.log("update profile", token);
    try {
        const response = await axiosInstance.put(`${API_URL}/Userprofiles/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error updating profile details:", error);
        throw error;
    }
};

export const viewProfile = async (id) => {
    const token = localStorage.getItem("token");
    console.log("view token", token);
    try {
        const response = await axiosInstance.get(`${API_URL}/Userprofiles/${id}`);
        
        if (response.data.userprofile === null) {
            console.warn("User profile not found");
            return null; // or handle it as you need
        }
        
        return response;
    } catch (error) {
        console.error("Error viewing profile:", error);
        throw error;
    }
};

export const updateApprovalStatus=async(id,data)=>{
    const response=await axiosInstance.put(`${API_URL}/Userprofiles/${id}`,data)
    return response;
}


