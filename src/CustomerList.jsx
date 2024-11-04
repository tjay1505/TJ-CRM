// src/components/CustomerList.js
import React, { useEffect, useState } from "react";
import { db } from "./FirebaseConfig";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { FaEdit } from "react-icons/fa"; // Assuming you are using react-icons for the edit icon
import TabelWithData from "./TabelWithData";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [status, setStatus] = useState("None");
  const [nextCall, setNextCall] = useState(false);
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null); // State for editing a customer
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedGraduate, setEditedGraduate] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedNextCallDate, setEditedNextCallDate] = useState("");
  const [editedStatus, setEditedStatus] = useState("New");
  const [loading, setLoading] = useState(false); // Loading state
  const [updateMessage, setUpdateMessage] = useState(""); // Message state

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "customers"), (snapshot) => {
      const customerData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customerData);
      setFilteredCustomers(customerData); // Initialize filteredCustomers
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Function to apply filters
  const applyFilters = () => {
    let filtered = [...customers];

    // Filter by status
    if (status !== "None") {
      filtered = filtered.filter((customer) => customer.status === status);
    }

    // Filter by next call date if checkbox is checked
    if (nextCall) {
      const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
      filtered = filtered.filter((customer) => {
        return customer.nextCallDate && customer.nextCallDate >= currentDate;
      });
    }

    // Filter by phone number if provided
    if (searchPhoneNumber) {
      filtered = filtered.filter((customer) =>
        customer.phoneNumber.includes(searchPhoneNumber)
      );
    }

    setFilteredCustomers(filtered);
  };

  // Function to refresh filters and reset the component state
  const refreshFilters = () => {
    setStatus("None");
    setNextCall(false);
    setSearchPhoneNumber("");
    setFilteredCustomers(customers); // Reset to original customers list
  };

  // Function to open edit modal
  const openEditModal = (customer) => {
    setEditCustomer(customer);
    setEditedName(customer.name);
    setEditedEmail(customer.email);
    setEditedPhoneNumber(customer.phoneNumber);
    setEditedGraduate(customer.graduate);
    setEditedLocation(customer.location);
    setEditedNextCallDate(customer.nextCallDate);
    setEditedStatus(customer.status);
    setUpdateMessage(""); // Reset message when opening modal
  };

  // Function to handle edit submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setUpdateMessage(""); // Reset message

    if (
      editedName === "" ||
      editedEmail === "" ||
      editedPhoneNumber === "" ||
      editedGraduate === "" ||
      editedNextCallDate === ""
    ) {
      setUpdateMessage("Please fill in all fields.");
      setLoading(false); // Stop loading
      return;
    }

    try {
      const customerRef = doc(db, "customers", editCustomer.id);
      await updateDoc(customerRef, {
        name: editedName,
        email: editedEmail,
        phoneNumber: editedPhoneNumber,
        graduate: editedGraduate,
        nextCallDate: editedNextCallDate,
        status: editedStatus,
        location: editedLocation,
      });
      setUpdateMessage("Customer updated successfully!"); // Success message
    } catch (error) {
      console.error("Error updating customer: ", error);
      setUpdateMessage("Error updating customer. Please try again."); // Error message
    } finally {
      setLoading(false); // Stop loading
      setEditCustomer(null); // Close the modal after update
    }
  };

  return (
    <div>
      <h4>Customer List</h4>
      <div className="col-12 d-flex flex-wrap my-2 align-items-center justify-content-start">
        <p className="fs-5 me-4 col-12">Filter by:</p>
        <div className="form-group d-flex align-items-center justify-content-evenly p-2">
          <label className="me-3">Status</label>
          <select
            className="form-control me-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="None">None</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Interested">Interested</option>
            <option value="Pending">Pending</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Not Interested">Not Interested</option>
          </select>
        </div>
        <div className="form-group d-flex align-items-center justify-content-evenly p-2">
          <label>Get Next Call</label>
          <input
            type="checkbox"
            className="p-5 mx-2"
            checked={nextCall}
            onChange={(e) => setNextCall(e.target.checked)}
          />
        </div>
        <button className="btn btn-success" onClick={applyFilters}>
          Apply
        </button>
        <div className="form-group d-flex align-items-center justify-content-evenly p-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone number"
            value={searchPhoneNumber}
            onChange={(e) => setSearchPhoneNumber(e.target.value)}
          />
          <button className="btn btn-primary mx-2" onClick={applyFilters}>
            Search
          </button>
          <button className="btn btn-secondary mx-2" onClick={refreshFilters}>
            Refresh
          </button>
        </div>
      </div>
      {filteredCustomers.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No data
        </div>
      ) : <TabelWithData giveEdit={true} /> }

      {/* Edit Modal */}
      {editCustomer && (
        <div className="modal" style={{ display: "block", position: "fixed", zIndex: 1000 }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Customer</h5>
        
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editedPhoneNumber}
                      onChange={(e) => setEditedPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Graduate</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editedGraduate}
                      onChange={(e) => setEditedGraduate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editedLocation}
                      onChange={(e) => setEditedLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Next Call Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={editedNextCallDate}
                      onChange={(e) => setEditedNextCallDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      className="form-control"
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Interested">Interested</option>
                      <option value="Pending">Pending</option>
                      <option value="Enrolled">Enrolled</option>
                      <option value="Not Interested">Not Interested</option>
                    </select>
                  </div>
                  {loading && <div className="text-warning">Updating...</div>} {/* Loading message */}
                  {updateMessage && <div className="text-success">{updateMessage}</div>} {/* Update message */}
                </div>
                <div className="modal-footer">
                <button type="button" className="close btn btn-danger " onClick={() => setEditCustomer(null)}>
                  cancel
                </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    Update
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditCustomer(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default CustomerList;
