import '../../assets/style/pagination.css'

function PaginationComponent(props){

    const pages = page()

    function selectPage(page) {
        props.pageChanged(page)
    }
    function startPageFunction(){
        if (props.currentPage === 0 || props.currentPage === 1) {
            return 1
        }
        if (props.currentPage === props.totalPages) {
            return props.totalPages - props.maxVisibleButtons
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
        props.pageChanged(0)
    }
    function lastPage() {
        props.pageChanged(props.totalPages - 1)
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
                isDisabled: i === props.currentPage + 1
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
                        className="btn-pagination py-1 px-3"
                        aria-label="First"
                        disabled={props.currentPage === 0}
                        onClick={firstPage}
                    >
                        <span className="text-xl">&laquo;</span>
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="btn-pagination py-1 px-3"
                        aria-label="Previous"
                        disabled={props.currentPage === 0}
                        onClick={previousPage}
                    >
                        <span className="text-xl">&lsaquo;</span>
                    </button>
                </li>
                {pages.map(page=>
                    <li key={page.name}>
                        <button
                            type="button"
                            className={"btn-pagination py-1 px-3 rounded-full mx-1 text-gray-500 " + ( isActive(page.name - 1) ? "active" : null)}
                            disabled={page.isDisabled}
                            onClick={selectPage(page.name - 1)}
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
                        className="btn-pagination py-1 px-3"
                        aria-label="Next"
                        disabled={props.currentPage + 1 === props.totalPages}
                        onClick={nextPage}
                    >
                        <span className="text-xl">&rsaquo;</span>
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="btn-pagination text-zinc-500 py-1 px-3"
                        aria-label="last"
                        disabled={props.currentPage + 1 === props.totalPages}
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