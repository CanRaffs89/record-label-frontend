import React, { useState, useEffect } from 'react';
import sanityClient from '../sanity.js';
import { Link } from 'react-router-dom';

export default function FeaturedAlbums() {
    const [featuredAlbums, setFeaturedAlbums] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == 'album'] | order(releaseDate desc)[0..5]{
                albumTitle,
                releaseDate,
                slug,
                albumImage{
                    asset->{
                        _id,
                        url
                    }
                }
            }`)
            .then((data) => setFeaturedAlbums(data))
            .catch(console.error)
    },[]);

    return (
        <div className="featured-albums-grid">
            {featuredAlbums && featuredAlbums.map((album, index) => {
                return (
                    <Link className='featured-albums-card' key={album.slug.current} to={'/releases/' + album.slug.current}>
                        <div className="featured-albums-cover-wrapper">
                            <img className='featured-albums-cover' src={album.albumImage.asset.url} alt="" />
                        </div>
                        <h2 className='featured-albums-title'>{album.albumTitle}</h2>
                    </Link>
                )
            })}
        </div>
    )
}
