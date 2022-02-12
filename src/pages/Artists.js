import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sanityClient from '../sanity.js';

export default function Artists() {
    const [artistData, setArtistData] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == 'artist'] | order(name){
                name,
                slug,
                profileImage{
                    asset->{
                        _id,
                        url
                    }
                }
            }`)
            .then((data) => setArtistData(data))
            .catch(console.error)
    },[]);
    
    return <div className='page-container'>
        <div className="artists-grid">
            {artistData && artistData.map((artist, index) => {
                return (
                    <Link className='artist-card' key={artist.slug.current} to={'/artists/' + artist.slug.current}>
                        <div className="artist-image-wrapper" key={index}>
                            <img className='artist-image' src={artist.profileImage.asset.url} alt="" />
                        </div>
                        <h1 className='artist-name'>{artist.name}</h1>
                    </Link>
                )
            })}
        </div>
    </div>;
}
