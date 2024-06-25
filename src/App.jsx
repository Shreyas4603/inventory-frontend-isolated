import { Login, Register } from "./Components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./Components/Utils/PrivateRoutes";
import { SideBar } from "./Components/Common/SideBar";
import { Navbar } from "./Components/Common/Navbar";
import LoggedInComponents from "./Components/Utils/LoggedInComponents";
import { AddProduct, Dashboard, Inventory, OrdersPage, ViewAndEditProduct,UpdateOrders } from "./Screens";

function App() {
  return (
    <BrowserRouter>
      <LoggedInComponents>
        <Navbar />
      </LoggedInComponents>

      <div className="flex bg-blu e-700">
        <LoggedInComponents>
          <SideBar />
        </LoggedInComponents>

        <div className="   flex-1  lg:h-[89.3vh] 2xl:h-[93vh] overflow-hidden h-screen font-jakarta">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/inventory/:id" element={<ViewAndEditProduct />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/orders/:id" element={<UpdateOrders />} />
              
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
