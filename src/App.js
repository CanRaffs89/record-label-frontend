import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import Artists from './pages/Artists';
import Releases from './pages/Releases';
import ArtistDetails from './pages/ArtistDetails';
import AlbumDetails from './pages/AlbumDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


export default function App() {
  return (
    <Router>
      <div className="container">
        <Navbar></Navbar>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/news" element={<News />}/>
        <Route exact path="/artists" element={<Artists />}/>
        <Route exact path="/releases" element={<Releases />}/>
        <Route exact path="/artists/:slug" element={<ArtistDetails />}/>
        <Route exact path="/releases/:slug" element={<AlbumDetails />}/>
      </Routes>
      <div className="container">
        <Footer />
      </div>
    </Router>
  )
}

