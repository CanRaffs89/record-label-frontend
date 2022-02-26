import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import sanityClient from '../sanity.js';
import { Link } from 'react-router-dom';

export default function News() {
  const [articles, setArticles] = useState(null);

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
      .then((data) => setArticles(data))
      .catch(console.error)
  },[]);

  console.log(articles)

  return (
    <>
        {articles && articles.map((article, index) => {
            return (
              <div key={index} className='news-article'>
                <img className='news-banner-image' src={article.articleImage.asset.url} alt="" />
                <Link key={index} to={'/' + article.category + '/' + article.articleRef.slug.current}><h2>{article.title}</h2></Link>
                <h4>{dayjs(article.publishDate).format('D MMMM YYYY')}</h4>
                <p>{article.text}</p>
              </div>
            )
        })}
    </>
  )
}
