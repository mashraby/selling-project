import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginModal from "./components/login/login";
import { useEffect } from "react";
import Order from "./Pages/Order";
import MyOrders from "./Pages/MyOrders";
import Admin from "./Pages/Admin/main/Admin";
import Nav from "./components/header/header";

const token = window.localStorage.getItem("token");

function App() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login");
  };
  useEffect(() => {
    if (!token) {
      handleNavigate();
    }
  }, []);

  return (
    <div className="App">
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Order />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/login" element={<LoginModal />} />
      </Routes>
    </div>
  );
}

export default App;