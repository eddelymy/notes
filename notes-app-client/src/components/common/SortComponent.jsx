import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSort } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function SortComponent(props){

    const [sorts, setSorts] = useState({
      key: props.item.id,
      direction: 'asc'
    }) 
    function sortDirection(){
      return sorts.direction === 'asc' ? 'desc' : 'asc'
    }

    function sortItem() {
      const newDirection = sortDirection()
      if (props.item.showSort){
        setSorts((prev) => ({
          ...prev,
          direction:newDirection}))
          props.sorting({ ...sorts, direction: newDirection })
      }
      
    }

    return(
        <>
        <button type="button" onClick={sortItem} className="flex items-center">
            {props.item.showSort ?
            <FontAwesomeIcon icon={faSort} className='mr-2' />:
                null}
            <span>
                { props.item.columnName}
            </span>
        </button>
        </>
    )
}

export default SortComponent