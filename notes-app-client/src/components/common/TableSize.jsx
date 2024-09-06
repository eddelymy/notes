import { useState } from "react"

function TableSize(props){

    const sizesList = [3,6, 10, 50, 100, 150]
    const [selectedSize,setSelectedSize] = useState(props.size)

    return(
        <div>
            <select
                id="size"
                value={selectedSize}
                className="rounded border-gray-200 focus:outline-none"
                onChange={(e)=>{
                    setSelectedSize(e.target.value)
                    props.sizeSelected(e.target.value)}
                }
            >
                {sizesList.map(size=>
                    <option className="p-3" key={size} value={size}>
                        {size} 
                    </option>
                )}
            </select>
        </div>
    )
}

export default TableSize