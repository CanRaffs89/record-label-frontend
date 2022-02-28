import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import sanityClient from '../sanity.js';
import { Link, useParams } from 'react-router-dom';

export default function AlbumDetails() {
  const [albumDetails, setAlbumDetails] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient.fetch(`*[slug.current == "${slug}"]{
      albumTitle,
      releaseDate,
      slug,
      _id,
      albumImage{
        asset->{
          _id,
          url
        }
      },
      albumArtist->{name, slug}
    }`)
    .then((data) => setAlbumDetails(data[0]))
    .catch(console.error)
  }, [slug]);

  if(!albumDetails) return <></>;

  return <div className='page-container'>
            <div className="album-details-grid">
              <div className="album-details-image-wrapper">
                <img className='album-details-image' src={albumDetails.albumImage.asset.url} alt="" />
              </div>
              <div className="album-details-info">
                <Link to={'/artists'}>ARTISTS</Link> / <Link key={albumDetails.albumArtist.slug.current} to={'/artists/' + albumDetails.albumArtist.slug.current}>{albumDetails.albumArtist.name}</Link>
                <h1 className='album-details-album-title'>{albumDetails.albumTitle}</h1>
                <h4 className='album-details-album-date'>Released on {dayjs(albumDetails.releaseDate).format('D MMMM YYYY')}</h4>
              </div>
            </div>
          </div>;
}
