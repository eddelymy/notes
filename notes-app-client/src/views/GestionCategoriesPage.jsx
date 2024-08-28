import { useState,useEffect } from 'react'
import Select from 'react-select'
import SortComponent from '../components/common/SortComponent'
import LoadingSpinner from '../components/common/LoadingSpinner'
import PageSize from '../components/common/TableSize'
import PaginationBar from '../components/common/PaginationComponent'
import { UrlPage } from '../components/common/UrlPage'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import category from '../json/category.json'
import categoryService from '../service/category/category.service'
import AddCategory from '../components/pages/category/AddCategory'
import DeleteCategory from '../components/pages/category/DeleteCategory'
import EditCategory from '../components/pages/category/EditCategory'

export default function GestionCategoriesPage(){

  const ColumnsList = [
      {value: 1, label: 'Categorie'},
      {value: 2, label: 'Etiquette'}
  ]
  const categoriesList = category
  const tableHead = [
      {
          id: 'category',
          columnName: 'Categorie',
          showSearchBar: true,
          showSort: true,
          filter: {
          key: 'id',
          operator: 'EQUAL',
          field_type: 'STRING',
          value: ''
          }
      },
      {
          id: 'label',
          columnName: 'Etiquette',
          showSearchBar: true,
          showSort: false,
          filter: {
          key: 'label',
          operator: 'LIKE',
          field_type: 'STRING',
          value: ''
          }
      }
  ]
  const [dataTable,setDataTable] = useState([])
  const [selectedColumn,setSelectedColumn] = useState(null)
  const [selectedCategory,setSelectedCategory] = useState(null)
  const [label,setLabel] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(2)
  const [totalPages,setTotalPages] = useState(0)
  const [totalItems,setTotalItems] = useState(0)
  const [sortBy, setSortBy] = useState('category')
  const [order, setOrder] = useState('asc')
  const [search, setSearch] = useState('')
  const loading = false
  let size = 10

  // async function getcategories(){
  //     const data = await categoryService.getCategories()
  //     setDataTable(data) 
  // }
  async function pagination(page, limit, sortBy, order, search){
    try {
        const response = await categoryService.pagination(page, limit, sortBy, order, search)
        setDataTable(response.data.categories)
        setTotalPages(response.data.pages)
        setTotalItems(response.data.total)
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error)
    }
}

  useEffect(()=>{
    pagination(page, limit, sortBy, order, search)
  },[page, limit, sortBy, order, search])

  function cancel(){
      setSelectedColumn(null)
      setSelectedCategory(null)
      setLabel('')
  }
  function sorting(sort){
    setSortBy(sort.key)
    setOrder(sort.direction)
  }
  function onPageChange(newPage) {
    setPage(newPage)
  }
  function selectSize(newSize) {
      setLimit(newSize)
  }
  
  return(
    <div className='flex flex-col'>
      <UrlPage pages={['Gestion des categories']}/>
      <AddCategory catgoryAdded={()=>{pagination(page, limit, sortBy, order, search)}}/>
      <div className="mt-2 border border-1 bg-white rounded-md flex items-center max-w-full p-5 w-full">
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
                setSelectedColumn(e)  
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
              }} 
            />
          </div>
        }
        {(selectedColumn?.label==='Etiquette') &&  
          <div className="mr-2 grow">
            <label>Etiquette</label>
            <input value={label} type='text' className='input_text' onChange={(e)=>setLabel(e.target.value)}/>
          </div>
        }
        <button
          type="button"
          className="submit-btn mr-2"
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
        <table className="w-full">
          <thead className='bg-[#020617] text-white rounded-t-md'>
            <tr>
              {tableHead.map(item=>
                <th className="p-3" key={item.id}>
                  <div className="flex justify-between">
                    <SortComponent item ={item} sorting={sorting}/>
                  </div>
                </th>
               )}
             <th className="p-3 flex items-center">Actions</th>
            </tr> 
          </thead>
          <tbody>
            {(!loading  && dataTable.length === 0) &&
              <tr className="border-t text-secondary">
                <td colSpan="5" className="p-3 text-slate-400 text-center">
                  <span>No data to show.</span>
                </td>
              </tr>
            }
            {loading &&
              <tr className="border-t text-secondary">
                <td colSpan="5" className="text-center">
                  <LoadingSpinner />
                </td>
              </tr>
            }
            {!loading &&
              dataTable.map(({_id,category,label})=>
                  <tr className="border-t" key={_id}> 
                    <td  className="p-3 text-slate-800">   
                      {category}
                    </td>
                    <td className="p-3 text-slate-800">
                    {label.map(elmnt=>
                        <div key={elmnt}>
                            {elmnt} 
                        </div>)}
                    </td>
                    
                    <td className="p-3">
                      <EditCategory item={{categoryId:_id,category:category,label:label}} categoryUpdated={()=>{pagination(page, limit, sortBy, order, search)}} />
                      <DeleteCategory categoryId={_id} category={category} categoryDeleted={()=>{pagination(page, limit, sortBy, order, search)}}/>
                    </td>
                  </tr>)
            }   
          </tbody>
        </table>
        <div className="flex justify-between p-2 border-t">
          <PageSize size={limit} sizeSelected={selectSize} />
          <PaginationBar
            maxVisibleButtons={4}
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageChanged={onPageChange}
          />
        </div>
      </div>     
    </div>
  )
}