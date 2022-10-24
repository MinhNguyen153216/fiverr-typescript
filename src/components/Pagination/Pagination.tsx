import React from 'react'

type Props = {
    userPerPage:number,
    totalUsers:number,
    paginate:any
}

export default function Pagination({userPerPage,totalUsers,paginate}: Props) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / userPerPage); i++) {
      pageNumbers.push(i);
    }


  return (
    <nav>
    <ul className='pagination'>
      {pageNumbers.map(number => (
        <li key={number} className='page-item'>
          <a onClick={() => paginate(number)} href='!#' className='page-link'>
            {number}
          </a>
        </li>
      ))}
    </ul>
  </nav>
  )
}