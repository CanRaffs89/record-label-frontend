import React, { useState, useEffect } from 'react'
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
      }
    }`)
    .then((data) => setAlbumDetails(data[0]))
    .catch(console.error)
  }, [slug]);

  console.log(albumDetails);

  if(!albumDetails) return <h1 className='page-container'>Loading...</h1>

  return <div className='page-container'>
    <h1>{albumDetails.albumTitle}</h1>
    <h4>{albumDetails.releaseDate}</h4>
    <img src={albumDetails.albumImage.asset.url} alt="" />
  </div>;
}
