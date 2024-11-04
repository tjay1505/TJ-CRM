import React, { useEffect, useState } from "react";
import { db } from "./FirebaseConfig";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { FaEdit } from "react-icons/fa"; // Assuming you are using react-icons for the edit icon

export default function TabelWithData({giveEdit}) {

  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

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


  return (
    <div className="col-12 d-flex flex-column align-items-center justify-content-evenly">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>PH NUMBER</th>
                  <th>MAIL</th>
                  <th>GRADUATE</th>
                  <th>LOCATION</th>
                  <th>NEXT CALL</th>
                  <th>STATUS</th>
                  {giveEdit ? <th>ACTION</th> : ''} 
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.email}</td>
                    <td>{customer.graduate}</td>
                    <td>{customer.location}</td>
                    <td>{customer.nextCallDate}</td>
                    <td>{customer.status}</td>
                   { giveEdit ? <td>
                      <FaEdit 
                        onClick={() => openEditModal(customer)} 
                        style={{ cursor: 'pointer', color: 'blue' }} 
                      />
                    </td> : ''}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  )
}
