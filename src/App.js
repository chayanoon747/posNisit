import "./App.css";
import Sidebar from "./Sidebar/Sidebar";
import Register from "./page/Register/Register";
import Profile from "./page/profile/profile"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopUp from "./page/TopUp/TopUp";
import RedeemRewards from "./page/RedeemRewards/RedeemRewards";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/*"
          element=
            {
              <div style={{ display: "flex" }}>
              <Sidebar />
              <Routes>
                {/* Admin Pages */}
                <Route path="/Profile" element={<Profile />} /> 
                <Route path="/TopUp" element={<TopUp />} />
                <Route path="/RedeemRewards" element={<RedeemRewards />} />
              </Routes>
            </div>
            } 
        />
      </Routes>
    </Router>
  )
}

export default App;
