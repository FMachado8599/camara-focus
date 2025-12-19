import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import CreateQRTest from "./test/CreateQRTest.jsx";
import StorePage from "./pages/store/StorePage.jsx";
import EditQR from "./pages/editQR/EditQR.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<CreateQRTest />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/qr/:id/edit" element={<EditQR />} />
      </Routes>
    </BrowserRouter>
  );
}