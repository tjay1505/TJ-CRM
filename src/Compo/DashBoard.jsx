import React ,{useEffect,useState} from "react";
import { crmData } from "./Data"; 
import TabelWithData from "../TabelWithData";
import { db } from "../FirebaseConfig";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";



export default function DashBoard() {

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
          console.log();
          
        });
    
        return () => unsubscribe(); // Clean up listener on unmount
      }, []);

  
  // Calculate the counts
  const totalDataCount = customers.length;
  const interestedCount = customers.filter((data) => data.status === "Interested").length;
  const pendingCount = customers.filter((data) => data.status === "Pending").length;

  return (
    <>

    <div className="container d-flex flex-wrap p-3 gap-3">
      {/* Box showing count of Interested */}
      <div className="col-3 jk-dash-box bg-success text-white rounded-4 p-3">
        <h5>Interested</h5>
        <h1>{interestedCount}</h1>  
      </div>

      {/* Box showing count of Pending */}
      <div className="col-3 jk-dash-box bg-warning text-dark rounded-4 p-3">
        <h5>Pending</h5>
        <h1>{pendingCount}</h1>
      </div>

      {/* Box showing total count of data */}
      <div className="col-3 jk-dash-box bg-info text-white rounded-4 p-3">
        <h5>Total leads</h5>
        <h1>{totalDataCount}</h1>
      </div>

      {/* List of all CRM data */}
      <div className="col-12 d-flex flex-wrap gap-3 mt-3">
        
      </div>

      <div className="col-12">
      
      </div>
    </div>
    <TabelWithData giveEdit={false} />
    </>
  );
}
