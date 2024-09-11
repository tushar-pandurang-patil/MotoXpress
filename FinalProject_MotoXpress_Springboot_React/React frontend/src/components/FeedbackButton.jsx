import React, { useState, useEffect } from "react";

const FeedbackButton = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [userFullName, setUserFullName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    // Fetch user details from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserFullName(user.userFullName || "");
      setEmail(user.emailId || "");
      setIsCustomer(user.role === "CUSTOMER");
    }
  }, []);

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSubmit = () => {
    if (feedback.trim() === "") {
      alert("Feedback cannot be empty");
      return;
    }

    // Handle the feedback submission (e.g., save to local storage or send to a server)
    console.log({
      userFullName,
      email,
      feedback,
    });

    // Reset form after submission
    setFeedback("");
    setFormVisible(false);
    alert("Thank you for your feedback!");
  };

  // Only render the feedback button if the user is a customer
  if (!isCustomer) {
    return null;
  }

  return (
    <div style={styles.container}>
      {isFormVisible && (
        <div style={styles.formContainer}>
          <h3 style={styles.formTitle}>Give Your Feedback</h3>
          <input
            type="text"
            value={userFullName}
            readOnly
            style={styles.inputField}
          />
          <input
            type="email"
            value={email}
            readOnly
            style={styles.inputField}
          />
          <textarea
            placeholder="Enter your feedback"
            rows="4"
            style={styles.textArea}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button style={styles.submitButton} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
      <button style={styles.feedbackButton} onClick={toggleForm}>
        {isFormVisible ? "Close" : "Feedback"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
  feedbackButton: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  },
  formContainer: {
    position: "absolute",
    bottom: "60px",
    right: "0",
    backgroundColor: "white",
    padding: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    width: "250px",
  },
  formTitle: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  inputField: {
    width: "100%",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    backgroundColor: "#f0f0f0",
  },
  textArea: {
    width: "100%",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    resize: "none",
  },
  submitButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default FeedbackButton;
