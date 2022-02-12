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
            profileImage{
                asset->{
                    _id,
                    url
                }
            },
            albums[]->{
                albumTitle,
                releaseDate,
                slug,
                albumImage{
                    asset->{
                        _id,
                        url
                    }
                }
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
                        <img src={artistAlbum.albumImage.asset.url} alt="" />
                    </div>
                )
            })}
        </div>;
}
