import React from 'react';
import NewsArticles from '../components/NewsArticles';

export default function News() {
  return (
    <div className='page-container'>
        <div className="news-container">
            <NewsArticles itemWidth={'50%'}/>
        </div>
    </div>
  )
}
