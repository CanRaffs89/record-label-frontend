import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import sanityClient from '../sanity.js';
import Events from '../components/Events.js';

export default function News() {
  const [newsItems, setNewsItems] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == 'article'] | order(publishDate desc){
        title,
        publishDate,
        text,
        category,
        articleImage{
          asset->{
            _id,
            url
          }
        },
        articleRef->{slug}
      }`)
      .then((data) => setNewsItems(data))
      .catch(console.error)
  },[]);

  return (
    <div className='flex-page-container page-container'>
        <div className="news-container">
            {newsItems && newsItems.map((item, index) => {
              return (
                <div key={index} className="news-article">
                  <img className="news-banner-image" src={item.articleImage.asset.url} alt=''/>
                  <Link key={index} to={'/' + item.category + '/' + item.articleRef.slug.current}><h2>{item.title}</h2></Link>
                  <h4>{dayjs(item.publishDate).format('D MMMM YYYY')}</h4>
                  <p>{item.text}</p>
                </div>
              )
            })}
        </div>
        <div className="events-container">
          <h1 className='h1-page-header'>Events</h1>
          <Events />
        </div>
    </div>
  )
}
