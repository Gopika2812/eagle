import React from 'react';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import Sustainability from '../components/Sustainability';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      {/* FeaturedProducts and AllProducts sections removed from home page per user request */}
      <AboutUs />
      <Services />
      <Sustainability />
      <Projects />
      <Contact />
    </main>
  );
};

export default Home;
