import React, { useState, useEffect} from 'react';
import sanityClient from '../sanity.js';
import { Link } from 'react-router-dom';
import FeaturedAlbums from '../components/FeaturedAlbums.js';
import News from '../components/News.js';

export default function Home() {
    const [featuredAlbum, setFeaturedAlbum] = useState(null);
    const randInt = Math.floor(Math.random() * 19);

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == 'album'] | order(_createdAt desc) [${randInt}]{
                albumTitle,
                releaseDate,
                albumImage{
                    asset->{
                        _id,
                        url
                    }
                }
            }`)
            .then((data) => setFeaturedAlbum(data))
            .catch(console.error)
    },[]);

    if(!featuredAlbum) return <h1 className='page-container'>Loading...</h1>;

    return <div className="page-container">
        <img className='banner-image' src={featuredAlbum.albumImage.asset.url} alt="" />
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
