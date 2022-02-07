import React, { useState, useEffect } from 'react';
import sanityClient from '../sanity.js';

export const Artists = () => {
    const [artistData, setArtistData] = useState(null);
    console.log(artistData)

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == 'artist'] | order(name){
                name,
                bio,
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
        <h1>Artists</h1>
        {artistData && artistData.map((artist, index) => {
            return (
                <div key={index}>
                    <h1>{artist.name}</h1>
                    <p>{artist.bio}</p>
                    <img src={artist.profileImage.asset.url} alt="" />
                </div>
            )
        })}
    </div>;
};
