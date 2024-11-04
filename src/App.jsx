import "./App.css";
import DashBoard from "./Compo/DashBoard";
import Leads from "./Compo/Leads";
import CustomerList from "./CustomerList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewLead from "./Compo/NewLead";
import HeadLayout from "./Compo/HeadLayout";
import TabelWithData from "./TabelWithData";
import { createContext } from "react";

const context = createContext()

function App() {
  return (
    <div className=" container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeadLayout />}>
            <Route path="/" index  element={<DashBoard />} />
            <Route path="/Leads" element={<Leads />} />
            <Route path="/new-leads" element={<NewLead />} />
            <Route path="/List" element={<CustomerList/>}/>
            <Route path="/task" element={<TabelWithData/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
