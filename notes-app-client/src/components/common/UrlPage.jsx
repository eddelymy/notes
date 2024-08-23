export function UrlPage({pages}){

  return(
    <>
      <nav className="text-gray-500 text-sm">
        <ul className="flex">
          {pages.map(page=>
            <li key={page}>
              <span className={pages[pages.length - 1]=== page? 'text-gray-700' :''}>
                 {`>> ${page}` }
              </span>
              {(pages[pages.length - 1]!==page ) &&
                <span className="mx-1 font-sans text-lg font-normal text-blue-gray-500">
                  /
              </span>
              }
              
            </li>)}
          
        </ul>
      </nav>
</>
  )
}