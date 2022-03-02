import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import sanityClient from '../sanity.js';

export default function Events() {
    const [eventsItems, setEventsItems] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(`*[_type == 'event'] | order(eventDate asc){
                eventArtist->{name, slug},
                eventDate,
                eventLocation
            }`)
            .then((data) => setEventsItems(data))
            .catch(console.error)
    },[]);

    console.log(eventsItems)

    return (
        <>
            {eventsItems && eventsItems.map((item, index) => {
                return (
                    <div key={index} className="event-item">
                        <h4>{dayjs(item.eventDate).format('D MMMM YYYY')}</h4>
                        <Link key={index} to={'/artists/' + item.eventArtist.slug.current}><h2>{item.eventArtist.name}</h2></Link>
                        <h4>{item.eventLocation}</h4>
                    </div>
                )
            })}
        </>
    )
}
