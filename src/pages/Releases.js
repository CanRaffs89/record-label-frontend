import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sanityClient from '../sanity.js';

export default function Releases() {
    const [albumData, setAlbumData] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == 'album'] | order(albumTitle){
                albumTitle,
                slug,
                albumImage{
                    asset->{
                        _id,
                        url
                    }
                }
            }`)
            .then((data) => setAlbumData(data))
            .catch(console.error)
    },[]);

  return <div className="page-container">
      <div className='items-grid'>
          {albumData && albumData.map((album, index) => {
              return (
                  <Link className='item-card' key={album.slug.current} to={'/releases/' + album.slug.current}>
                      <div className="item-image-wrapper" key={index}>
                          <img className='item-image' src={album.albumImage.asset.url} alt="" />
                      </div>
                      <h1 className="item-name">{album.albumTitle}</h1>
                  </Link>
              )
          })}
      </div>
  </div>;
}
