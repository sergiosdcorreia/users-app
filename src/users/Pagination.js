import React from 'react'

import './Pagination.css'

const Pagination = ({ page, totalPages, currentPage, prevPage, nextPage }) => {
  return (
    <div className="pagination">
      {page > 1 ? (
        <button className="btn" onClick={prevPage}>
          <span>&#8249;</span>
        </button>
      ) : (
        <div className="btn-container"></div>
      )}
      <div className="current-page">
        <span>
          Page {currentPage}/{totalPages}
        </span>
      </div>

      {page < totalPages ? (
        <button className="btn" onClick={nextPage}>
          <span>&#8250;</span>
        </button>
      ) : (
        <div className="btn-container"></div>
      )}
    </div>
  )
}

export default Pagination
