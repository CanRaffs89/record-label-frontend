import React, { useState, useEffect} from 'react';
import sanityClient from '../sanity.js';
import { Link } from 'react-router-dom';
import FeaturedAlbums from '../components/FeaturedAlbums.js';

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
        <h1 className='home-page-header'>Latest Releases</h1>
        <div className="home-page-grid">
            <div className="single-album-section">
                <div className="featured-album-wrapper">
                    <img src={featuredAlbum.albumImage.asset.url} alt="" />
                </div>
            </div>
            <div className="multiple-albums-section">
                <FeaturedAlbums/>
            </div>
        </div>
    </div>;
}
