import { Login, Register } from "./Components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./Components/Utils/PrivateRoutes";
import { SideBar } from "./Components/Common/SideBar";
import { Navbar } from "./Components/Common/Navbar";
import LoggedInComponents from "./Components/Utils/LoggedInComponents";
import {
  AddProduct,
  Dashboard,
  Inventory,
  OrdersPage,
  ViewAndEditProduct,
  UpdateOrders,
} from "./Screens";

function App() {
  <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
    <div className="p-4">{/* Your content */}</div>
  </div>;
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
      <div>
        {/* <div className="absolute w-[230px] h-[151px] left-[600px] top-[300px] bg-orange-400 bg-opacity-50 rounded-[160px_43px_200px_54px] transform rotate-[-39.59deg] z-0"></div>
        <div className="absolute w-[105px] h-[51.89px] left-[500px] top-[380px] bg-orange-400 bg-opacity-20 rounded-[57px_166px_50px_130px] transform rotate-[15.02deg] z-0"></div>
        <div className="absolute w-[20px] h-[20px] left-[600px] top-[440px] rounded-full bg-[rgba(249,115,22,0.5)] z-0"></div> */}
        {/* <div className="absolute w-[350px] h-[220px] left-[100px] top-[380px] bg-orange-400 bg-opacity-25 rounded-[57px_166px_50px_130px] transform rotate-[15.02deg]"></div> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
