import React from 'react';
import FeaturedAlbums from '../components/FeaturedAlbums.js';
import News from '../components/News.js';
import banner from '../img/esther-jiao-ADv0GiMBlmI-unsplash.jpg';

export default function Home() {
    return <div className="page-container">
        <img className='banner-image' src={banner} alt="" />
        <div className="home-page-grid">
            <div className="news-section">
                <h1 className='home-page-header'>News</h1>
                <News/>
            </div>
            <div className="featured-albums-section">
                <h1 className="home-page-header">Latest Releases</h1>
                <FeaturedAlbums/>
            </div>
        </div>
    </div>;
}
