import { UrlPage } from "../components/common/UrlPage"
import PaginationComponent from "../components/common/PaginationComponent"
import TableSize from "../components/common/TableSize"
import noteService from "../service/note/note.service"
import NoteComponent from "../components/pages/note/NoteComponent"
import { useState, useEffect } from "react"

export default function NotesPage() {
  const [limit, setLimit] = useState(6),
        [page, setPage] = useState(1),
        [totalPages, setTotalPages] = useState(0),
        [totalItems, setTotalItems] = useState(0),
        [sortBy, setSortBy] = useState('category'),
        [order, setOrder] = useState('asc'),
        [search, setSearch] = useState({}),
        [notes, setNotes] = useState([]),
        [isExpanded,setIsExpanded] = useState(false)

  async function pagination(page, limit, search) {
    try {
      const response = await noteService.pagination(page, limit, search)
      setNotes(response.data.notes)
      setTotalItems(response.data.total)
      setTotalPages(response.data.pages)
    } catch (error) {
      console.error("Erreur lors de la récupération des notes :", error)
    }
  }

  useEffect(() => {
    pagination(page, limit, search)
  }, [page, limit, search])

  function onPageChange(newPage) {
    setPage(newPage)
  }

  function selectSize(newSize) {
    setLimit(newSize)
  }
  
  return (
    <div className='flex flex-col'>
      <UrlPage pages={['Gestion des notes']} />
      <div className="mt-5 border overflow-hidden bg-white border-1 rounded-md flex flex-col w-full">
        <div className="scrollbar-custom w-full grid grid-cols-1 gap-4 2xl:grid  2xl:gap-5 p-6 2xl:grid-cols-3  place-items-center">
          {
            notes.map((note) =>(
              <NoteComponent key={note._id} {...note}/>
            ))
          }
        </div>
        <div className="flex justify-between p-2 ">
          <TableSize size={limit} sizeSelected={selectSize} />
          <PaginationComponent
            maxVisibleButtons={4}
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageChanged={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
