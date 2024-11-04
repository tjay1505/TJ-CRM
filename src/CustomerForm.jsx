// src/components/CustomerForm.js
import React, { useState } from "react";
import { db } from "./FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const CustomerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [graduate, setGraduate] = useState("");
  const [nextCallDate, setNextCallDate] = useState("");
  const [status, setStatus] = useState("New");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      phoneNumber === "" ||
      graduate === "" ||
      nextCallDate === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true); // Set loading to true while data is being sent

    try {
      await addDoc(collection(db, "customers"), {
        name,
        email,
        phoneNumber,
        graduate,
        nextCallDate,
        status,
        location, // Include location field in the data
      });
      // Reset form fields
      setName("");
      setEmail("");
      setPhoneNumber("");
      setGraduate("");
      setNextCallDate("");
      setStatus("New");
      setLocation("");
      setLoading(false); // Hide loading modal after successful submission
      alert("Customer added successfully");
    } catch (error) {
      console.error("Error adding customer: ", error);
      alert("Error adding customer. Please try again.");
      setLoading(false); // Hide loading modal if there’s an error
    }
  };

  return (
    <div className="col-12 d-flex align-items-center justify-content-center mt-3">
      {/* Loading Modal */}
      {loading && (
        <div className="loading-modal">
          <div className="loading-content">
            <p>Adding Customer...</p>
          </div>
        </div>
      )}
      
      <form
        onSubmit={handleSubmit}
        className="mb-4 d-flex justify-content-evenly flex-column col-8"
      >
        <div className="form-group">
          <label className="my-2">Name</label>
          <input
            type="text"
            className="form-control mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label className="my-2">Email</label>
          <input
            type="email"
            className="form-control mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label className="my-2">Phone Number</label>
          <input
            type="tel"
            className="form-control mb-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        <div className="form-group">
          <label className="my-2">Graduate</label>
          <input
            type="text"
            className="form-control mb-2"
            value={graduate}
            onChange={(e) => setGraduate(e.target.value)}
            placeholder="Enter graduation details"
          />
        </div>
        <div className="form-group">
          <label className="my-2">Next Call Date</label>
          <input
            type="date"
            className="form-control mb-2"
            value={nextCallDate}
            onChange={(e) => setNextCallDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="my-2">Location</label>
          <input
            type="text"
            className="form-control mb-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter current location"
          />
        </div>
        <div className="form-group">
          <label className="my-2">Status</label>
          <select
            className="form-control mb-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Interested">Interested</option>
            <option value="Pending">Pending</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Not Interested">Not Interested</option>
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
            {loading ? "Adding..." : "Add Customer"}
          </button>
        </div>
      </form>

      {/* Styles for loading modal */}
      <style jsx>{`
        .loading-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
        .loading-content {
          background-color: white;
          padding: 20px 40px;
          border-radius: 8px;
          text-align: center;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
};

export default CustomerForm;
