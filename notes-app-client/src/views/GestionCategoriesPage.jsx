import { useState,useEffect } from 'react'
import Select from 'react-select'
import SortComponent from '../components/common/SortComponent'
import LoadingSpinner from '../components/common/LoadingSpinner'
import PageSize from '../components/common/TableSize'
import PaginationBar from '../components/common/PaginationComponent'
import { UrlPage } from '../components/common/UrlPage'
import { faCopy, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import category from '../json/category.json'
import categoryService from '../service/category/category.service'
import AddCategory from '../components/pages/category/AddCategory'

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
          id: 'tag',
          columnName: 'Etiquette',
          showSearchBar: true,
          showSort: true,
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
  const loading = false
  let size = 10
  let currentPage = 0
  let totalPages = 1
  let totalItems = 1

  async function getcategories(){
      const data = await categoryService.getCategories()
      setDataTable(data) 
  }

  useEffect(()=>{
    getcategories()
  },[dataTable])

  function cancel(){
      setSelectedColumn(null)
      setSelectedCategory(null)
      setLabel('')
  }
  function sorting(sort){
      console.log(sort)
  }
  function onPageChange(newPage) {
      currentPage = newPage
  }
  function selectSize(newSize) {
      console.log(newSize)
      size = newSize
  }
  
  return(
    <div className='flex flex-col'>
      <UrlPage pages={['Gestion des categories']}/>
      <AddCategory/>
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
                      <button type="button" className="  mr-2 rounded-sm">   
                        <FontAwesomeIcon icon={faPenToSquare} className="w-6 mr-2 text-[#4B5563]" />
                      </button>
                      <button type="button" className="  mr-2 rounded-sm">
                        <FontAwesomeIcon icon={faCopy} className=" w-6 mr-2 text-[#4B5563]" />
                      </button>
                      <button type="button" className="  rounded-sm">
                        <FontAwesomeIcon icon={faTrash} className=" w-6 mr-2 text-[#EF5944]" />
                      </button>
                    </td>
                  </tr>)
            }   
          </tbody>
        </table>
        <div className="flex justify-between p-2 border-t">
          <PageSize size={size} sizeSelected={selectSize} />
          <PaginationBar
            maxVisibleButtons={5}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageChanged={onPageChange}
          />
        </div>
      </div>     
    </div>
  )
}