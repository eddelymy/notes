import '../../assets/style/pagination.css'

function PaginationComponent(props){

    const pages = page()

    function selectPage(page) {
        props.pageChanged(page)
    }
    function startPageFunction(){
        if(props.currentPage === 1){
            return 1
        }
        if(props.maxVisibleButtons > props.totalPages){
            return 1
        }
        if(props.currentPage > props.maxVisibleButtons ){
            return  props.totalPages - props.maxVisibleButtons +1
        }
        if (props.currentPage === props.totalPages && props.totalPages > props.maxVisibleButtons ) {
            return props.totalPages - props.maxVisibleButtons + 1
        }
        return props.currentPage - 1 
    }
    function isActive(page) {
        return page === props.currentPage
    }
    function nextPage() {
        props.pageChanged(props.currentPage + 1)
    }
    function previousPage() {
        props.pageChanged(props.currentPage - 1)
    }
    function firstPage() {
        props.pageChanged(1)
    }
    function lastPage() {
        props.pageChanged(props.totalPages)
    }
    function page(){
        const range = []
        const startPage = startPageFunction()
        if (props.totalPages === 0) {
            range.push({
            name: 1,
            isDisabled: true
        })
        return range
        }
        for (
            let i = startPage;
            i <= Math.min(startPage + props.maxVisibleButtons - 1, props.totalPages);
            i++
        ) {
            range.push({
                name: i,
                isDisabled: i === props.currentPage
            })
        }
        return range
    }

    return(
        <>
        <nav className="pagination-nav text-sm">
            <ul className="pagination flex flex-row items-center">
                <li>
                    <button
                        type="button"
                        className="btn-pagination rounded-full py-1 px-3"
                        aria-label="First"
                        disabled={props.currentPage === 1}
                        onClick={firstPage}
                    >
                        <span className="text-xl">&laquo;</span>
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="btn-pagination rounded-full py-1 px-3"
                        aria-label="Previous"
                        disabled={props.currentPage === 1}
                        onClick={previousPage}
                    >
                        <span className="text-xl">&lsaquo;</span>
                    </button>
                </li>
                {pages.map(page=>
                    <li key={page.name}>
                        <button
                            type="button"
                            className={"btn-pagination py-1 px-3 rounded-full mx-1 text-gray-500 " + ( isActive(page.name ) ? "active" : null)}
                            disabled={page.isDisabled}
                            onClick={()=>selectPage(page.name)}
                        >
                            <span >
                                {page.name }
                            </span>
                        </button>
                    </li>
                )}
                <li>
                    <button
                        type="button"
                        className="btn-pagination rounded-full py-1 px-3"
                        aria-label="Next"
                        disabled={props.currentPage  === props.totalPages}
                        onClick={nextPage}
                    >
                        <span className="text-xl">&rsaquo;</span>
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="btn-pagination rounded-full text-zinc-500 py-1 px-3"
                        aria-label="last"
                        disabled={props.currentPage === props.totalPages}
                        onClick={lastPage}
                    >
                        <span className="text-xl">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default PaginationComponent