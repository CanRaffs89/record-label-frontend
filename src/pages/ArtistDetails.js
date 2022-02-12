import React, { useState, useEffect } from 'react';
import sanityClient from '../sanity.js';
import imageUrlBuilder from '@sanity/image-url';
import { Link, useParams } from 'react-router-dom';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source)
}

export default function ArtistDetails() {
    const [artistDetails, setArtistDetails] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        sanityClient.fetch(`*[slug.current == "${slug}"]{
            name,
            _id,
            slug,
            bio,
            profileImage{
                asset->{
                    _id,
                    url
                }
            },
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
            <img src={artistDetails.profileImage.asset.url} alt="" />
            <p>{artistDetails.bio}</p>
            {artistDetails.albums && artistDetails.albums.map((artistAlbum, index) => {
                return (
                    <div key={index}>
                        <Link key={artistAlbum.slug.current} to={'/releases/' + artistAlbum.slug.current}>{artistAlbum.albumTitle}</Link>
                        <h6>{artistAlbum.releaseDate}</h6>
                    </div>
                )
            })}
        </div>;
}
