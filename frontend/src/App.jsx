import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ServicesPage from "./pages/ServicesPage";
import FooterComponent from "./components/FooterComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
