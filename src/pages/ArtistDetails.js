import React, { useState, useEffect } from 'react';
import sanityClient from '../sanity.js';
import { Link, useParams } from 'react-router-dom';

export default function ArtistDetails() {
    const [artistDetails, setArtistDetails] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            name,
            _id,
            slug,
            bio,
            albums[]->{
                albumTitle,
                releaseDate,
                slug
            }
        }`)
        .then((data) => setArtistDetails(data[0]))
        .catch(console.error)
    }, [slug]);

    if(!artistDetails) return <div>Loading...</div>;

    return <div className="page-container">
            <h1>{artistDetails.name}</h1>
            {artistDetails.albums && artistDetails.albums.map((artistAlbum, index) => {
                return (
                    <div key={index}>
                        <Link key={artistAlbum.slug.current} to={'/' + artistAlbum.slug.current}>{artistAlbum.albumTitle}</Link>
                        <h6>{artistAlbum.releaseDate}</h6>
                    </div>
                )
            })}
        </div>;
}
