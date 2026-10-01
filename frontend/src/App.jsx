import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CampaignList from "./pages/CampaignList";
import CampaignDetails from "./pages/CampaignDetails";
import AdminCampaign from "./pages/AdminCampaign";
import ProtectedAdmin from "./components/ProtectedAdmin";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<CampaignList />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminCampaign />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/campaign/:id"
          element={<CampaignDetails />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;