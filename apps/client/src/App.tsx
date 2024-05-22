import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";
import AppLayout from "./ui/AppLayout";
import Payables from "./features/payable/Payables";
import Assignors from "./features/assignor/Assignors";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="login" />} />

          <Route path="login" element={<LoginSignup />}></Route>
          <Route path="/" element={<AppLayout />}>
            <Route path="recebiveis" element={<Payables />} />
            <Route path="cedentes" element={<Assignors />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
