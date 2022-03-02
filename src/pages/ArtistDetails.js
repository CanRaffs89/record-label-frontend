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

    if(!artistDetails) return <></>;

    return <div className="page-container">
                <div className="artist-details-grid">
                    <div className="artist-details-info">
                        <div className="artist-details-image-wrapper">
                            <img className='artist-details-image' src={artistDetails.profileImage.asset.url} alt="" />
                        </div>
                        <h1 className='artist-details-name-mobile'>{artistDetails.name}</h1>
                        <p>{artistDetails.bio}</p>
                    </div>
                    <div className="artist-details-albums">
                        <h1 className='artist-details-name-desktop'>{artistDetails.name}</h1>
                        <div className="artist-details-albums-grid">
                            {artistDetails.albums && artistDetails.albums.map((artistAlbum, index) => {
                                return (
                                    <Link className='artist-details-album-card' key={artistAlbum.slug.current} to={'/releases/' + artistAlbum.slug.current}>
                                        <div className="artist-details-album-cover-wrapper">
                                            <img className='artist-details-album-cover' src={artistAlbum.albumImage.asset.url} alt="" />
                                        </div>
                                        <h1 className='artist-details-album-title'>{artistAlbum.albumTitle}</h1>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>;
}
