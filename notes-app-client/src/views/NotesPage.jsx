import { UrlPage } from "../components/common/UrlPage"
import PaginationComponent from "../components/common/PaginationComponent"
import TableSize from "../components/common/TableSize"
import noteService from "../service/note/note.service"
import NoteComponent from "../components/pages/note/NoteComponent"
import categoryService from '../service/category/category.service'
import Select from 'react-select'
import { useState, useEffect } from "react"
import {flash} from '../plugins/flash'

export default function NotesPage() {

  const [limit, setLimit] = useState(3),
        [page, setPage] = useState(1),
        [totalPages, setTotalPages] = useState(0),
        [totalItems, setTotalItems] = useState(0),
        [search, setSearch] = useState({}),
        [notes, setNotes] = useState([]),
        [selectedCategory,setSelectedCategory] = useState(null),
        [selectedColumn,setSelectedColumn] = useState(null),
        [label,setLabel] = useState(''),
        [categoriesList,setCategoriesList] = useState([{value:'',label:''}])

  const ColumnsList = [
                        {value: 'category', label: 'Categorie'},
                        {value: 'label', label: 'Etiquette'}
                      ]
                      
  async function pagination(page, limit, search) {
    try {
      const response = await noteService.pagination(page, limit, search)
      setNotes(response.data.notes)
      setTotalItems(response.data.total)
      setTotalPages(response.data.pages)
    } catch (error) {
      flash(error?.response?.data?.message || error?.message, 'error')
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
 
  async function getCategories() {
    setCategoriesList([])
    try {
      const data = await categoryService.getCategories()
      data.forEach((item) => 
        setCategoriesList((prev) => [...prev, { value: item.color, label: item.category }])
      )
    } catch (error) {
      flash(error?.response?.data?.message || error?.message, 'error')
    }
  }
  function columnSelected(e){
    setSelectedColumn(e) 
    if(e?.label==='Categorie'){
      getCategories() 
    }
  }

  function searching(){
    if(selectedCategory){
      setSearch({key:selectedColumn?.value,value:{value:selectedCategory?.value,label:selectedCategory?.label}})
    }
    if(label){
      setSearch({key:selectedColumn?.value,value:{value:label,label:label}})
    }
  }
  function cancel(){
    setSelectedColumn(null)
    setSelectedCategory(null)
    setLabel('')
    setSearch({})
}
  
  return (
    <div className='flex flex-col'>
      <UrlPage pages={['Gestion des notes']} />
      <div className="mt-10 border border-1 bg-white rounded-md flex items-center max-w-full p-5 w-full">
        <div className="mr-2 grow">
          <label>Colonne</label>
          <Select
            className="w-full"
            isDisabled={false}
            isLoading={false}
            isClearable={true}
            isRtl={false}
            isSearchable={true}
            name="columnName"
            options={ColumnsList}
            value={selectedColumn}
            onChange={(e)=>{
              columnSelected(e) 
              e === null && setSearch({})
            }}
            aria-expanded ={true}
            placeholder={<div>Select option</div>}
          />
        </div>
        {(selectedColumn?.label==='Categorie') &&
          <div className="mr-2 grow">
            <label>Categorie</label>
            <Select
              className="w-full basic-single"
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isRtl={false}
              isSearchable={true}
              name="category"
              options={categoriesList}
              value={selectedCategory}
              aria-expanded = {true}
              placeholder={<div>Select option</div>}
              onChange={(e)=>{
                setSelectedCategory(e)
                e === null && setSearch({})
              }} 
            />
          </div>
        }
        {(selectedColumn?.label==='Etiquette') &&  
          <div className="mr-2 grow">
            <label>Etiquette</label>
            <input value={label} type='text' className='input_text' onChange={(e)=>{setLabel(e.target.value)
              e.nativeEvent.inputType === 'deleteContentBackward' && setSearch({})
            }}/>
          </div>
        }
        <button
          type="button"
          className={ selectedColumn === null || (selectedColumn.value === 'category' && selectedCategory === null) || (selectedColumn.value === 'label' && label === '') ? "disabled-btn mr-2" : "submit-btn mr-2"}
          onClick={searching}
          disabled={selectedColumn === null || (selectedColumn.value === 'category' && selectedCategory === null) || (selectedColumn.value === 'label' && label === '')}
        >
          Recherche
        </button>
        <button
          type="button"
          className="cancel-btn"
          onClick={cancel}  
          >
          Annuler
        </button>
      </div> 
      <div className="mt-2 border overflow-hidden bg-white border-1 rounded-md flex flex-col w-full">
        {notes.length === 0 && <div className=" w-full pt-8 flex justify-center">No data to show.</div>}
        <div className="scrollbar-custom w-full grid grid-cols-1 gap-4 2xl:grid  2xl:gap-5 p-4 2xl:grid-cols-3  place-items-center">
          {
            notes.map((note) =>(
              <NoteComponent key={note._id} {...note} getNotes={ ()=>pagination(page, limit, search)}/>
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
