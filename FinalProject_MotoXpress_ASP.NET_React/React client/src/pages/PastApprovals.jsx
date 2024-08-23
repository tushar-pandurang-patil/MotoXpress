import React, { useEffect, useState } from "react";
import { getUserById, getUserProfiles } from "../services/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const PastApprovals = () => {
    const [displaydata, setDisplaydata] = useState([]);
    const record = [];

    const fetchUserProfiles = async () => {
        try {
            
            const response = await getUserProfiles();
            console.log("Log 1", response);
    
            let record = []; // Initialize the record array
    
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].approvalCompleted === 1) {
                    const userdata = await getUserById(response.data[i].userId);
                    console.log("Log 2", userdata);
    
                    let data = {
                        "userName": userdata.data.userFullName,
                        "userEmail": userdata.data.emailId,
                        "dlnumber": response.data[i].dlnumber,
                        "approvalStatus": response.data[i].approvalCompleted
                    };
    
                    console.log("Data to be displayed", data);
                    record.push(data); // Push the data if approvalCompleted is 1
                }
            }
            setDisplaydata(record); // Update the display data with the filtered records
        } catch (error) {
            console.error("Error fetching user profiles", error);
        }
    };
    

    useEffect(() => {
        fetchUserProfiles();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Past Approvals</h2>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Driver's License Number</th>
                        <th scope="col">Approval Status</th>
                    </tr>
                </thead>
                <tbody>
                    {displaydata.map((item, index) => (
                        <tr key={index}>
                            <td>{item.userName}</td>
                            <td>{item.userEmail}</td>
                            <td>{item.dlnumber}</td>
                            <td>{item.approvalStatus ? 'Approved' : 'Pending'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PastApprovals;
