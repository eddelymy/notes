
function FlashComponent(){

    return (
        <>
            <div className="flex flex-row p-2">
                <div id="flash-error" className="hidden-flash">
                    <div className="me-1">
                        <i className="fa-solid fa-circle-xmark"></i>
                    </div>
                    <div className="flash-content w-fit"></div>
                </div>
                <div id="flash-success" className="hidden-flash">
                    <div className="mr-2">
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <div className="flash-content"></div>
                </div>
            </div>
        </>
    )
}

export default FlashComponent