import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedAlbums from '../components/FeaturedAlbums.js';
import NewsArticles from '../components/NewsArticles.js';
import banner from '../img/esther-jiao-ADv0GiMBlmI-unsplash.jpg';

export default function Home() {
    return <div className="page-container">
        <img className='banner-image' src={banner} alt="" />
        <div className="home-page-grid">
            <div className="news-section">
                <Link to='/news' className='h1-page-header'>News</Link>
                <NewsArticles/>
                <Link to='/news' id='news-link' className='h1-page-header' >Load More News</Link>
            </div>
            <div className="featured-albums-section">
                <Link to='/releases' className="h1-page-header">Latest Releases</Link>
                <FeaturedAlbums/>
            </div>
        </div>
    </div>;
}
