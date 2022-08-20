import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create/Create";
import Cars from "../src/pages/Cars/Cars";
import UpdateCar from "../src/pages/UpdateCar/UpdateCar";
import CarDetails from "../src/pages/CarDetails/CarDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="/" element={<Cars />} />
        <Route path="/update/:id" element={<UpdateCar />} />
        <Route path="/details/:id" element={<CarDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
