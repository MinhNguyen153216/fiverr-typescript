import React from 'react'

type Props = {
    userPerPage:number,
    totalUsers:number,
    paginate:any,
    className:string
}

export default function Pagination({userPerPage,totalUsers,paginate}: Props) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / userPerPage); i++) {
      pageNumbers.push(i);
    }


  return (
    <nav>
    <ul className='pagination '>
      {pageNumbers.map(number => (
        <li key={number} className='page-item'>
          <span onClick={() => paginate(number)}  className='page-link'>
            {number}
          </span>
        </li>
      ))}
    </ul>
  </nav>
  )
}