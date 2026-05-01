import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import ProjectsPage from './pages/ProjectsPage'
import KnowYourVolt from './pages/KnowYourVolt'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'
import ScrollSparks from './components/ScrollSparks'

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <AnimatePresence>
          {loading && <Preloader onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        
        {!loading && (
          <>
            <ScrollSparks />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:categorySlug" element={<ProductPage />} />
              <Route path="/all-products" element={<ProductPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/know-your-volt" element={<KnowYourVolt />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </Router>
  )
}

export default App
