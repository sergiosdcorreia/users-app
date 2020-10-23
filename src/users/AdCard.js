import React from 'react'
import "./AdCard.css"

const AdCard = ({ company, url, text }) => {
  return (
    <div className="ad-card">
        <p className="company">
          {company}
        </p>
        <div className="url">
            <a href={url}>{url}</a>
        </div>
        <p className="text">{text}</p>
    </div>
  )
}

export default AdCard