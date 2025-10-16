import React from 'react'

const Sea = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
<div>
    <img src="search.svg" alt="search" />

    <input 
    type='text'
    placeholder='Movies you wanna watch '
    value={searchTerm}
    onChange={(e)=>setSearchTerm(e.target.value)}
    />
</div>
     
    </div>
  )
}

export default Sea
