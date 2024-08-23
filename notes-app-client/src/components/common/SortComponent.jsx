import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSort } from '@fortawesome/free-solid-svg-icons'

function SortComponent(props){

    const sorts = {
        key: props.item.id,
        direction: 'ASC'
      }
    function sortDirection(){
        if (sorts.direction === 'ASC') {
          return 'DESC'
        }
      
        if (sorts.direction === 'DESC') {
          return 'ASC'
        }
      
        return 'DESC'
      }

    function sortItem() {
        if (props.item.showSort){
            console.log(sorts.direction)
            sorts.direction = sortDirection()
            props.sorting(sorts)
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