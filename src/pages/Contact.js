import React from 'react'

export default function Contact() {
  const mapImage = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555(-0.07155,51.52403)/-0.0717,51.5241,14.41,0/500x500?access_token=" + process.env.REACT_APP_MAPBOX_KEY;

  return <div className="page-container flex-page-container">
      <div className="contact-map-container">
        <img src={mapImage} alt="Map showing location of the shop at the junction of Brick Lane and Bacon Street in London" />
      </div>
      <div className="contact-text-container">
        <p>We are a small independent record label and shop located in the heart of London at the junction of Brick Lane and Bacon Street. Pop in and see us for new releases, merchandise, in-store events and more!</p>
        <p class="contact-text-heading">Opening Times</p>
        <p>Monday - <span class="contact-text-time">9:00 - 5:00</span></p>
        <p>Tuesday - <span class="contact-text-time">9:00 - 5:00</span></p>
        <p>Wednesday - <span class="contact-text-time">9:00 - 3:00</span></p>
        <p>Thursday - <span class="contact-text-time">9:00 - 8:00</span></p>
        <p>Friday - <span class="contact-text-time">9:00 - 5:00</span></p>
        <p>Saturday - <span class="contact-text-time">10:00 - 4:00</span></p>
        <p>Sunday - <span class="contact-text-time">Closed</span></p>
      </div>
  </div>
}
