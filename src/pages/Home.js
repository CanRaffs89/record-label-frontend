import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedAlbums from '../components/FeaturedAlbums.js';
import News from '../components/News.js';
import banner from '../img/esther-jiao-ADv0GiMBlmI-unsplash.jpg';

export default function Home() {
    return <div className="page-container">
        <img className='banner-image' src={banner} alt="" />
        <div className="home-page-grid">
            <div className="news-section">
                <Link to='/' className='home-page-header'>News</Link>
                <News/>
            </div>
            <div className="featured-albums-section">
                <Link to='/releases' className="home-page-header">Latest Releases</Link>
                <FeaturedAlbums/>
            </div>
        </div>
    </div>;
}
