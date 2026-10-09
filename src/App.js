import './App.css';
import Featureproject from './components/Featureproject';
import Navbar from './components/Navbar';
import Ourexpertise from './components/Ourexpertise';
import Ourimpact from './components/Ourimpact';
import Why from './components/Why';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import Swiper from './components/Swiperslide';
import FAQs from './components/FAQs';
function App() {
  return (
    <div>
      <Navbar />
      <Swiper />
      <Featureproject />
      <Ourexpertise />
      <Ourimpact />
      <Why />
      <Testimonials />
      <FAQs />
      <Footer />
    </div>
  );
}

export default App;
