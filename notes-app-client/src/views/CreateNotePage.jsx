import categoryService from '../service/category/category.service'
import ReactColor from '../components/common/ReactColor'
import ReactEmoji from '../components/common/ReactEmoji'
import { UrlPage } from "../components/common/UrlPage"
import noteService from '../service/note/note.service'
import { setErrors } from '../helpers/error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faFileImport, faFont, faItalic, faLink, faListOl, faListUl, faUnderline } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { useState, useEffect, useRef } from 'react'

export default function CreateNotePage() {

  const [selectedCategory, setSelectedCategory] = useState(null),
        [categoriesList, setCategoriesList] = useState([{ value: '', label: '' }]),
        [selectLabel, setSelectLabel] = useState(null),
        [labels, setLabels] = useState([]),
        [filtredLabel, setFiltredLabel] = useState([]),
        [title, setTitle] = useState(''),
        [content, setContent] = useState(''),
        [color, setColor] = useState('#000000'),
        [errors,setErr] = useState({})

  const editorRef = useRef(null)

  async function getCategories() {
    setCategoriesList([])
    try {
      const data = await categoryService.getCategories()
      data.forEach((item) => {
        setCategoriesList((prev) => [...prev, { value: item.color, label: item.category }])
        setLabels((prev) => [...prev, { value: item.category, label: [...item.label] }])
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  async function submit() {
    try{
      const response = await noteService.addNote({category:selectedCategory,label:selectLabel,title:title,content:content})
      cancel()
    }catch(error){
      setErr(setErrors(error))
    }
  }

  function cancel() {
    setSelectLabel(null)
    setSelectedCategory(null)
    setContent('')
    setTitle('')
    setErr({})
    if(editorRef.current){
      editorRef.current.innerHTML = ''
    }
  }

  function myEmoji(emoji){
    insertEmoji(emoji)
  }
  function insertEmoji(emoji) {
    const editor = editorRef.current
    const selection = window.getSelection()
    
    if (editor.contains(selection.anchorNode)) {
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        
        const span = document.createElement('span')
        span.textContent = emoji
  
        range.deleteContents()
        range.insertNode(span)
        
        range.setStartAfter(span)
        range.collapse(true)
        
        selection.removeAllRanges()
        selection.addRange(range)
        
        setContent(editor.innerHTML)
      }
    } 
  }
  
  

  function formatText(command) {
    document.execCommand(command, false, null)
  }

  function myColor(selectedColor){
    setColor(selectedColor)
    applyColorToSelection(selectedColor)
  }
  function applyColorToSelection(color) {
    const editor = editorRef.current
    const selection = document.getSelection()
    if (editor.contains(selection.anchorNode)) {
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const selectedText = range.toString()
    
        if (selectedText.length === 0) return
    
        const span = document.createElement('span')
        span.style.color = color
        span.textContent = selectedText
    
        range.deleteContents()
        range.insertNode(span)
   
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
    
  }
  
  function insertLink() {
    const editor = editorRef.current
    const url = prompt("Entrez l'URL du lien :")
    if (url) {
      const selection = document.getSelection()
      if (editor.contains(selection.anchorNode)) {
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
    
          const anchor = document.createElement('a')
          anchor.href = url
          anchor.target = "_blank"
          anchor.rel = "noopener noreferrer"
          anchor.textContent = url
    
          range.deleteContents()
          range.insertNode(anchor)
    
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }
    }
  }
  
  return (
    <div className='flex flex-col'>
      <UrlPage pages={['Creation des notes']} />
      <div className="mt-5 width-full border border-1 bg-white rounded-md flex items-center max-w-full p-5 w-full">
        <form className="w-full">
          <div className="flex flex-row">
            <label className="w-full">
              Categorie
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
                aria-expanded={true}
                placeholder={<div>Select option</div>}
                onChange={(e) => {
                  setFiltredLabel([])
                  setSelectedCategory(e)
                  const result = labels.filter(item => item.value === e?.label);
                  result[0]?.label?.map(item => {
                    setFiltredLabel(prevFiltredLabel => [...prevFiltredLabel, { value: item, label: item }]);
                  });
                }}
              />
              {errors.category && <div id="farmError" className="text-red-700">
              { errors.category }
            </div>}
            </label>
            <label className="ml-3 w-full">
              Etiquette
              <Select
                className="w-full basic-single"
                isLoading={false}
                isClearable={true}
                isRtl={false}
                isMulti
                isSearchable={true}
                name="tag"
                options={filtredLabel}
                value={selectLabel}
                isDisabled={filtredLabel.length === 0}
                onChange={(e) => {
                  setSelectLabel(e);
                }}
                aria-expanded={true}
                placeholder={<div>Select option (s)</div>}
              />
              {errors.label && <div id="farmError" className="text-red-700">
              { errors.label }
            </div>}
            </label>
          </div>
          <div className="mt-4">
            <label htmlFor="title">Titre</label>
            <input value={title} type='text' className='input_text' onChange={e => setTitle(e.target.value)} />
            {errors.title && <div id="farmError" className="text-red-700">
              { errors.title }
            </div>}
          </div>
          <div className="mt-4">
            <label htmlFor="content">Contenu</label>
            <div
              ref={editorRef}
              className="textarea"
              contentEditable
              onInput={() => setContent(editorRef.current.innerHTML)}
              style={{ minHeight: '200px'}}
            />
            {errors.content && <div id="farmError" className="text-red-700">
              { errors.content }
            </div>}
          </div>
          <div className="flex">
            <button type="button" className='mr-2 btn-icon' onClick={() => formatText('bold')}>
              <FontAwesomeIcon icon={faBold} />
            </button>
            <button type="button" className='mr-2 btn-icon' onClick={() => formatText('italic')}>
              <FontAwesomeIcon icon={faItalic} />
            </button>
            <button type="button" className='mr-2 btn-icon' onClick={() => formatText('underline')}>
              <FontAwesomeIcon icon={faUnderline} />
            </button>
            <button type="button" className='mr-2 btn-icon' onClick={() => formatText('insertUnorderedList')}>
              <FontAwesomeIcon icon={faListUl} />
            </button>
            <button type="button" className='mr-2 btn-icon' onClick={() => formatText('insertOrderedList')}>
              <FontAwesomeIcon icon={faListOl} />
            </button>
            <ReactColor colorSelected={myColor} />
            <button type="button" className='mr-2 btn-icon'>
              <FontAwesomeIcon icon={faFileImport} />
            </button>
            <button type="button" className='mr-2 btn-icon' onClick={insertLink}>
              <FontAwesomeIcon icon={faLink} />
            </button>
            <ReactEmoji emojiSelected={myEmoji} />
          </div>
          <div className='flex mt-4 float-end'>
            <button className="cancel-btn mr-3" type='button' onClick={cancel}>Annuler</button>
            <button className="submit-btn" type='button' onClick={submit}>Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
