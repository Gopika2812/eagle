import React from 'react';
import Hero from '../components/Hero';
import ProductSlider from '../components/ProductSlider';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import Sustainability from '../components/Sustainability';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      <ProductSlider />
      <AboutUs />
      <Services />
      <Sustainability />
      <Projects />
      <Contact />
    </main>
  );
};

export default Home;
