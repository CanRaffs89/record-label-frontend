import React, { useState, useEffect } from 'react';
import sanityClient from '../sanity.js';
import { useParams } from 'react-router-dom';

export default function ArtistDetails() {
    const [artistDetails, setArtistDetails] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            name,
            _id,
            slug
        }`)
        .then((data) => setArtistDetails(data[0]))
        .catch(console.error)
    }, [slug]);

    if(!artistDetails) return <div>Loading...</div>;

    return (
        <div className="page-container">
            <h1>{artistDetails.name}</h1>
        </div>
    )
}
