import React, { useEffect, useState } from "react";
import { getUserById, getUserProfileById, getUserProfiles, updateApprovalStatus } from "../services/api";

const PendingApprovals = () => {
  const [profileRecords, setProfileRecords] = useState([]);

  const fetchProfileRecords = async () => {
    const response = await getUserProfiles();
    const records = response.data;
    const displayRecord = [];

    for (let i = 0; i < records.length; i++) {
      const userRecord = await getUserById(records[i].userId);
      if (records.dluploadedDocument === 0) {
      let data = {
        username: userRecord.data.userFullName,
        email: userRecord.data.emailId,
        dlnumber: records[i].dlnumber,
        dldocument: records[i].dluploadedDocument, // This should be a base64 string or a URL
        userId:userRecord.data.userId
      };
      displayRecord.push(data);
    }
}

    setProfileRecords(displayRecord);
  };

  const handleApprove = async (id) => {
    try {
      // Fetch the existing user data (assuming the API returns the full user object)
      const userResponse = await getUserProfileById(id);
      const existingUserData = userResponse.data;
      console.log("------->",existingUserData);
      
      // Update only the approvalCompleted field using the spread operator
      const updatedUserData = {
        ...existingUserData,
        approvalCompleted: 1, // Set the approvalCompleted field to true
      };
  
      // Send the updated data to the API
      const res = await updateApprovalStatus(id, updatedUserData);
      console.log("Response", res);
  
      // Optionally, you could update the local state to reflect the approval status
      setProfileRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.userId === id ? { ...record, approvalCompleted: 1 } : record
        )
      );
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };
  

  const handleDocumentClick = (documentData) => {
    // Check if the documentData is a URL or base64
    if (documentData.startsWith("data:")) {
      // For base64 data
      const newWindow = window.open();
      newWindow.document.write(<iframe src="${documentData}" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>);
    } else {
      // For blob data
      const blob = new Blob([documentData], { type: "application/pdf" }); // Adjust MIME type if necessary
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      URL.revokeObjectURL(url); // Cleanup the URL object after it's used
    }
  };

  useEffect(() => {
    fetchProfileRecords();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Pending Approvals</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Driver's License Number</th>
            <th>Uploaded Document</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profileRecords.map((records, index) => (
            <tr key={index}>
              <td>{records.username}</td>
              <td>{records.email}</td>
              <td>{records.dlnumber}</td>
              <td>
                {records.dldocument ? (
                  <img
                    src={records.dldocument}
                    alt="Driver's License Document"
                    style={{ width: "100px", height: "100px", cursor: "pointer" }}
                    onClick={() => handleDocumentClick(records.dldocument)}
                  />
                ) : (
                  <p>No Document Uploaded</p>
                )}
              </td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleApprove(records.userId)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingApprovals;