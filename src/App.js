import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Maincontainer from './components/Maincontainer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { Routes, Route } from "react-router-dom";
import About from './pages/About';
import Services from './pages/Services';
import Project from './pages/Project';
import Contact from './pages/Contact';
import Package from './pages/Package';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Maincontainer />} />
        <Route path="/About" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/services" element={<Services />} />
        <Route path="/Project" element={<Project />} />
        <Route path="/project" element={<Project />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Package" element={<Package />} />
        <Route path="/package" element={<Package />} />
      </Routes>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
